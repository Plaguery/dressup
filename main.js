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
  }

  getSrc() {
    return this.src;
  }

  getIcon() {
    return this.icon;
  }
}

//initialize all the item types
const hatArray = [new Item("assets/cap.png"), new Item("assets/griffin.png")];
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

const sectionArray = [hat, hair, face];

//switch -> active "section"?
//pass in array + specific "section" active
//shows the types
//blah blah blah

function show(type, arr) {
  //possibly refactor? pass in array directly
  const buttons = arr;
  const activeButton = fetchItems(type);
  for (const s of sectionArray) {
    s.style.outline = "";
  }
  activeButton.style.outline = "5px red solid ";

  const display = document.querySelector("#selectSection");
  display.innerHTML = "";

  //loops thru array and redraws each item
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
      item.changeEquip();
      redrawAvatar();

      if (item.isEquipped()) {
        //outlines button
        button.style.outline = "5px solid red";
      } else {
        button.style.outline = "";
      }
    });
  }
}

//redraws w equipped accessories
function redrawAvatar() {
  //clears (only leaves base image)
  const avatarDisplay = document.querySelector("#avatardisplay");
  avatarDisplay.innerHTML = '<img src="assets/body.png" />';

  //loops thru all items
  const arrs = [hatArray, hairArray, faceArray];
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

//returns list of items in selected type
function fetchItems(type) {
  switch (type) {
    case "hats":
      return hat;
    case "hairs":
      return hair;
    case "faces":
      return face;
  }
}
