class Item {
  constructor(src, iconsSrc) {
    this.src = src;
    this.icon = iconsSrc;
    this.equipped = false;
  }

  isEquipped() {
    return this.equipped;
  }

  changeEquip() {
    this.equipped = !this.equipped;
    return this.equipped;
  }

  unequip() {
    this.equipped = false;
  }

  equip() {
    this.equipped = true;
  }

  getSrc() {
    return this.src;
  }

  getIcon() {
    return this.icon;
  }
}

//TODO!
//fully implement class based styling
//make face only equipped 1 at time DONE. now make it redraw the buttons too ugh DONE ok
//create icons (for items & select)
//drag and drop?
//fix order of items
//custom scrollbar
//make the css nicer
//responsive

//initialize all the item types
const hatArray = [
  new Item("assets/hat1.png"),
  new Item("assets/hat2.png"),
  new Item("assets/hat3.png"),
  new Item("assets/hat4.png"),
];
const hat = document.querySelector("#hats");
hat.addEventListener("click", () => show("hats", hatArray));

const hairArray = [new Item("assets/griffin.png")];
const hair = document.querySelector("#hairs");
hair.addEventListener("click", () => show("hairs", hairArray));

const faceArray = [
  new Item("assets/face1.png"),
  new Item("assets/face2.png"),
  new Item("assets/face3.png"),
  new Item("assets/face4.png"),
  new Item("assets/face5.png"),
  new Item("assets/face6.png"),
  new Item("assets/face7.png"),
  new Item("assets/face8.png"),
  new Item("assets/face9.png"),
];
const face = document.querySelector("#faces");
face.addEventListener("click", () => show("faces", faceArray));

//set up section
const sectionArray = [hat, hair, face];
const display = document.querySelector("#selectSection");
function show(type, arr) {
  //sets up type buttons
  const activeButton = fetchButton(type);
  const classes = activeButton.classList;

  for (const s of sectionArray) {
    const classes = s.classList;
    classes.remove("active");
  }

  classes.add("active");
  // activeButton.style.outline = "5px red solid ";
  //activeButton.style.backgroundColor = "rgb(171, 209, 234)";

  //redraws item buttons
  const itemButtons = arr;

  //make this only for face/types that apply l8r
  if (type == "faces") {
    redrawItemButtonsExclusive(itemButtons);
  } else {
    redrawItemButtons(itemButtons);
  }
}

//loops thru array and redraws each item
function redrawItemButtons(buttons) {
  display.innerHTML = "";
  for (let i = 0; i < buttons.length; i++) {
    const item = buttons[i];
    const button = document.createElement("img");

    //so change this to icon later
    button.setAttribute("src", item.getSrc());
    button.setAttribute("width", "100px");
    button.style.outlineOffset = "-5px";
    button.style.outline = item.isEquipped() ? "5px solid red" : "";

    display.appendChild(button);

    button.addEventListener("click", () => {
      if (item.changeEquip()) {
        //outlines button
        button.style.outline = "5px solid red";
        button.style.backgroundColor = "rgb(171, 209, 234)";
      } else {
        button.style.outline = "";
        button.style.backgroundColor = "white";
      }
      redrawAvatar();
    });
  }
}

//loops thru array and redraws each item
function redrawItemButtonsExclusive(buttons) {
  display.innerHTML = "";
  for (let i = 0; i < buttons.length; i++) {
    const item = buttons[i];
    const button = document.createElement("img");

    //so change this to icon later

    //creates the buttons
    button.setAttribute("src", item.getSrc());
    button.setAttribute("width", "100px");
    button.style.outlineOffset = "-5px";

    //styles based on equipped/not
    //button.style.outline = item.isEquipped() ? "5px solid red" : "";
    //button.style.backgroundColor = item.isEquipped()
    //? "rgb(171, 209, 234)"
    // : "white";

    display.appendChild(button);

    button.addEventListener("click", () => {
      if (item.changeEquip()) {
        //unequips all (except current button)
        buttons.forEach((b) => b.unequip());
        item.equip();

        redrawItemButtonsExclusive(buttons);

        //outlines button
        button.style.outline = "5px solid red";
        button.style.backgroundColor = "rgb(171, 209, 234)";
      } else {
        button.style.outline = "";
        button.style.backgroundColor = "white";
      }
      redrawAvatar();
    });
  }
}

//redraws w equipped accessories
function redrawAvatar() {
  //clears (only leaves base image)
  const avatarDisplay = document.querySelector("#avatardisplay");
  avatarDisplay.innerHTML = '<img src="assets/body.png" />';

  //loops thru all items
  const arrs = [faceArray, hatArray, hairArray];
  for (const arr of arrs) {
    for (const item of arr) {
      //adds item to avatar display if equipped
      if (item.isEquipped()) {
        const equippedItem = document.createElement("img");
        equippedItem.setAttribute("src", item.getSrc());
        avatarDisplay.appendChild(equippedItem);
      }
    }
  }
}

//returns button for selected type
function fetchButton(type) {
  switch (type) {
    case "hats":
      return hat;
    case "hairs":
      return hair;
    case "faces":
      return face;
  }
}
