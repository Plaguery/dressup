class Item {
  constructor(src, iconsSrc) {
    this.src = src;
    this.icon = iconsSrc;
    this.equipped = false;
    this.x = 0;
    this.y = 0;
    this.focus = false;
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

  setEquip(set) {
    this.equipped = set;
  }

  getSrc() {
    return this.src;
  }

  getIcon() {
    return this.icon;
  }
}

//sets up movement buttons
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

//initialize all the item types
const hatArray = [
  new Item("assets/hat1.png", "assets/icons/hat1.png"),
  new Item("assets/hat2.png", "assets/icons/hat2.png"),
  new Item("assets/hat3.png", "assets/icons/hat3.png"),
  new Item("assets/hat4.png", "assets/icons/hat4.png"),
  new Item("assets/hat5.png", "assets/icons/hat5.png"),
  new Item("assets/hat6.png", "assets/icons/hat6.png"),
  new Item("assets/hat7.png", "assets/icons/hat7.png"),
  new Item("assets/hat8.png", "assets/icons/hat8.png"),
  new Item("assets/hat9.png", "assets/icons/hat9.png"),
];
const hat = document.querySelector("#hats");
hat.addEventListener("click", () => show("hats", hatArray));

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

const accessoryArray = [
  new Item("assets/accessory1.png", "assets/icons/accessory1.png"),
  new Item("assets/accessory2.png", "assets/icons/accessory2.png"),
  new Item("assets/accessory3.png", "assets/icons/accessory3.png"),
  new Item("assets/accessory4.png", "assets/icons/accessory4.png"),
  new Item("assets/accessory5.png", "assets/icons/accessory5.png"),
  new Item("assets/accessory6.png", "assets/icons/accessory6.png"),
  new Item("assets/accessory7.png", "assets/icons/accessory7.png"),
  new Item("assets/accessory8.png", "assets/icons/accessory8.png"),
];
const accessory = document.querySelector("#accessories");
accessory.addEventListener("click", () => show("accessories", accessoryArray));

const shirtArray = [
  new Item("assets/top1.png", "assets/icons/top1.png"),
  new Item("assets/top2.png", "assets/icons/top2.png"),
  new Item("assets/top3.png", "assets/icons/top3.png"),
  new Item("assets/top4.png", "assets/icons/top4.png"),
];
const shirt = document.querySelector("#shirts");
shirt.addEventListener("click", () => show("shirts", shirtArray));

const pantArray = [
  new Item("assets/bottom1.png", "assets/icons/bottom1.png"),
  new Item("assets/bottom2.png", "assets/icons/bottom2.png"),
  new Item("assets/bottom3.png", "assets/icons/bottom3.png"),
];
const pant = document.querySelector("#pants");
pant.addEventListener("click", () => show("pants", pantArray));

//arrs is in order of rendering
const arrs = [shirtArray, pantArray, faceArray, hatArray, accessoryArray];
const sectionArray = [hat, face, accessory, shirt, pant];

const display = document.querySelector("#selectSection");

//main redraw function (for switching item types)
function show(type, arr) {
  //sets up & redraws type buttons
  const activeButton = fetchButton(type);
  const classes = activeButton.classList;

  for (const s of sectionArray) {
    const classes = s.classList;
    classes.remove("active");
  }

  classes.add("active");

  //redraws item buttons in current section

  if (type == "faces" || type == "shirts" || type == "pants") {
    redrawItemButtonsExclusive(arr);
  } else {
    redrawItemButtons(arr);
  }
}

//returns button for selected type
function fetchButton(type) {
  switch (type) {
    case "hats":
      return hat;
    case "accessories":
      return accessory;
    case "faces":
      return face;
    case "pants":
      return pant;
    case "shirts":
      return shirt;
  }
}

//loops thru array and redraws each item in current section
function redrawItemButtons(buttons) {
  display.innerHTML = "";
  for (let i = 0; i < buttons.length; i++) {
    const item = buttons[i];
    const button = document.createElement("img");

    const buttonClasses = button.classList;
    button.setAttribute("src", item.getIcon());

    buttonClasses.add("button");

    //styles based on whether currently equipped or not
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
        buttons.forEach((b) => b.setEquip(false));
        item.setEquip(true);
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
}

//changes item location
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
