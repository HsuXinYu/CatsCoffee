class MenuItem {
  constructor(name, price, menu_img) {
    this.name = name;
    this.price = price;
    this.menu_img = menu_img;
  }
}

let french_vanilla = new MenuItem(
  "French Vanilla",
  150,
  "images/FrenchVanilla.jpg"
);
let caramel_acchiato = new MenuItem(
  "Caramel Macchiato",
  150,
  "images/CaramelMacchiato.jpg"
);
let donut = new MenuItem("Donut", 60, "images/Donut.jpg");

let menu_data = [french_vanilla, caramel_acchiato, donut];

function decrementValue(e) {
  let quantity_field = e.target.data;
  let parent = e.target.parentElement;
  let c = parent.children[1];
  let currentVal = parseInt(c.value);

  if (currentVal == 0) {
  } else {
    c.value = currentVal - 1;
  }
}

function incrementValue(e) {
  let quantity_field = e.target.data;
  let parent = e.target.parentElement;
  let c = parent.children[1];
  let currentVal = parseInt(c.value);

  if (currentVal == 10) {
  } else {
    c.value = currentVal + 1;
  }
}

document.querySelectorAll(".minus").forEach(function (e) {
  e.onclick = decrementValue;
});
document.querySelectorAll(".plus").forEach(function (e) {
  e.onclick = incrementValue;
});
