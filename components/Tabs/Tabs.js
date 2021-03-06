class Tabs{
    constructor(tab)    {
        this.tab = tab
        this.tabs = this.tab.querySelectorAll(".tabs-link")
        this.tabsLinks = Array.from(this.tabs).map((tab)    => new TabLink(tab))
    }
}

class TabLink {
  constructor(element) {
    this.element = element;

    // Get the custom data attribute on the Link
    this.data = this.element.dataset.tab;

    // Using the custom data attribute get the associated Item element
    this.itemElement = document.querySelector(`.tabs-item[data-tab="${this.data}"]`);

    // Using the Item element, create a new instance of the TabItem class
    this.tabItem = new TabItem(this.itemElement);

    // Add a click event listener on this instance, calling the select method on click
    this.element.addEventListener("click",  ()  =>  this.select());
  };

  select() {
    // Get all of the elements with the tabs-link class
    const link = document.querySelector(".tabs-link-selected");
    // Using a loop or the forEach method remove the 'tabs-link-selected' class from all of the links
    // Add a class named "tabs-link-selected" to this link
    this.element.classList.toggle("tabs-link-selected");
    // Call the select method on the item associated with this link
    this.tabItem.select();
    if(link !== null)   {
        this.deselect(link)
    }
  }

  deselect(link)    {
      link.classList.remove("tabs-link-selected")
  }
}

class TabItem {
  constructor(element) {
    this.element = element;
  }

  fadeIn(item, timeDelay)  {
      TweenLite.to(item, .4, {opacity: 1, display: "block", delay: timeDelay});
  }
  deselect(item)    {
      TweenLite.to(item, .5, {opacity: 0, display: "none"});
  }

  select() {
    // Select all items elements from the DOM
    const items = document.querySelectorAll(".tabs-item")
    const item = Array.from(items).filter((item)    =>  {
        return item.style.display === "block";
    })
    // Remove the class "tabs-item-selected" from each element
    // Add a class named "tabs-item-selected" to this element
    if(item.length !== 0)   {
        if(item[0] === this.element)    {
            this.deselect(item[0]);
            console.log("2: ", item[0])
        }   else {
            this.deselect(item[0])
            this.fadeIn(this.element, .5)
            console.log("3: ", item[0])
        }

    }   else {
        this.fadeIn(this.element, 0)
    }
  }
}


// START HERE: create a reference to the ".tabs" classes
let tab = document.querySelector(".tabs");

// Following the code in the Dropdown file, iterate through the array you created above creating a new instance of the TabLink class for each item.
let tabs = new Tabs(tab);

// DO THIS LAST: Once you have created an array of TabLink instances. call select() on the first item in the array
tabs.tabsLinks[0].select()
