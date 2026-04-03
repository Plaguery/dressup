class Item {
  constructor(src, iconsSrc) {
    this.src = src;
    this.icon = iconsSrc;
    this.equipped = false;
    this.x = 0;
    this.y = 0;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  moveX(x) {
    this.x += x;
  }

  moveY(y) {
    this.y += y;
  }

  resetPos() {
    this.x = 0;
    this.y = 0;
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
//create icons (for items & select)
//position controls!
//fix order of items
//custom scrollbar
//make the css nicer -> rework color scheme, active, better outlines
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
  new Item("assets/face1.png", "assets/icons/face1.png"),
  new Item("assets/face2.png", "assets/icons/face2.png"),
  new Item("assets/face3.png", "assets/icons/face3.png"),
  new Item("assets/face4.png", "assets/icons/face4.png"),
  new Item("assets/face5.png", "assets/icons/face5.png"),
  new Item("assets/face6.png", "assets/icons/face6.png"),
  new Item("assets/face7.png", "assets/icons/face7.png"),
  new Item("assets/face8.png", "assets/icons/face8.png"),
  new Item("assets/face9.png", "assets/icons/face9.png"),
];
const face = document.querySelector("#faces");
face.addEventListener("click", () => show("faces", faceArray));

//movement buttons
var activeItem = new Item();
const upButton = document.querySelector("#up");
upButton.addEventListener("click", () => move("up"));

const downButton = document.querySelector("#down");
downButton.addEventListener("click", () => move("down"));

const leftButton = document.querySelector("#left");
leftButton.addEventListener("click", () => move("left"));

const rightButton = document.querySelector("#right");
rightButton.addEventListener("click", () => move("right"));

const resetButton = document.querySelector("#reset");
resetButton.addEventListener("click", () => move("reset"));

//set up
const arrs = [faceArray, hatArray, hairArray];

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

  //redraws item buttons
  const itemButtons = arr;

  //make this only for face/types that apply l8r
  if (type == "faces") {
    redrawItemButtonsExclusive(itemButtons);
  } else {
    redrawItemButtons(itemButtons);
  }
}

function move(dir) {
  const active = activeItem;
  const amount = 5;
  switch (dir) {
    case "up":
      active.moveY(-amount);
      console.log("up" + active.getSrc());
      break;
    case "down":
      active.moveY(amount);
      break;
    case "left":
      active.moveX(-amount);
      break;
    case "right":
      active.moveX(amount);
      break;
    case "reset":
      active.resetPos();
  }
  redrawAvatar();
}

//loops thru array and redraws each item
function redrawItemButtons(buttons) {
  display.innerHTML = "";
  for (let i = 0; i < buttons.length; i++) {
    const item = buttons[i];
    const button = document.createElement("img");

    //so change this to icon later
    const buttonClasses = button.classList;
    button.setAttribute("src", item.getSrc());

    buttonClasses.add("button");

    item.isEquipped()
      ? buttonClasses.add("active")
      : buttonClasses.remove("active");

    display.appendChild(button);

    button.addEventListener("click", () => {
      if (item.changeEquip()) {
        //outlines button
        buttonClasses.add("active");
        activeItem = item;
      } else {
        buttonClasses.remove("active");
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
    const buttonClasses = button.classList;
    //so change this to icon later

    //creates the buttons

    button.setAttribute("src", item.getIcon());
    buttonClasses.add("button");
    item.isEquipped()
      ? buttonClasses.add("active")
      : buttonClasses.remove("active");

    display.appendChild(button);

    button.addEventListener("click", () => {
      if (item.changeEquip()) {
        //unequips all (except current button)
        buttons.forEach((b) => b.unequip());
        item.equip();
        //outlines button
        buttonClasses.add("active");
        activeItem = item;
        redrawItemButtonsExclusive(buttons);
      } else {
        buttonClasses.remove("active");
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

  for (const arr of arrs) {
    for (const item of arr) {
      //adds item to avatar display if equipped
      if (item.isEquipped()) {
        const equippedItem = document.createElement("img");
        equippedItem.setAttribute("src", item.getSrc());
        equippedItem.style.top = item.getY() + "px";
        equippedItem.style.left = "calc(50% + " + item.getX() + "px";
        avatarDisplay.appendChild(equippedItem);
      }
    }
  }
  // const lines = document.createElement("img");
  //lines.setAttribute("src", "assets/bodyline.png");
  //avatarDisplay.appendChild(lines);
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
