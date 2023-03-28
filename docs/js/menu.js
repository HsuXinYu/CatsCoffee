class MenuItem {
  constructor(id, name, price, menu_img) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.menu_img = menu_img;
  }
}

let french_vanilla = new MenuItem(
  "french_vanilla",
  "French Vanilla",
  150,
  "images/FrenchVanilla.jpg"
);
let caramel_macchiato = new MenuItem(
  "caramel_macchiato",
  "Caramel Macchiato",
  150,
  "images/CaramelMacchiato.jpg"
);
let pumpkin_spice = new MenuItem(
  "pumpkin_spice",
  "Pumpkin Spice",
  120,
  "images/PumpkinSpice.jpg"
);
let hazelnut = new MenuItem("hazelnut", "Hazelnut", 120, "images/Hazelnut.jpg");
let mocha = new MenuItem("mocha", "Mocha", 120, "images/Mocha.jpg");
let donut = new MenuItem("donut", "Donut", 60, "images/Donut.jpg");
let cherry_pie = new MenuItem(
  "cherry_pie",
  "Cherry Pie",
  60,
  "images/CherryPie.jpg"
);
let cheese_cake = new MenuItem(
  "cheese_cake",
  "Cheese Cake",
  70,
  "images/CheeseCake.jpg"
);

let menu_data = [
  french_vanilla,
  caramel_macchiato,
  pumpkin_spice,
  hazelnut,
  mocha,
  donut,
  cherry_pie,
  cheese_cake,
];

//照片內嵌在HTML
// document.querySelectorAll(".hiddenimg").forEach(function (hiddenimg) {
//   hiddenimg.addEventListener("mouseover", function (e) {
//     console.log(e);
//   });
// });

let flavor = document.querySelectorAll(".flavor");
// let hiddenimg = document.querySelectorAll(".hiddenimg");
for (let i = 0; i < flavor.length; i++) {
  flavor[i].addEventListener("mouseover", function (e) {
    // console.log(e.target.parentElement.parentElement.dataset.menuid);
    for (let j = 0; j < menu_data.length; j++) {
      if (
        e.target.parentElement.parentElement.dataset.menuid == menu_data[j].id
      ) {
        let hiddenimg = e.target.parentElement.parentElement.children[1];
        // console.log(menu_data[j].menu_img);
        // console.log(hiddenimg[j].children);
        hiddenimg.children[0].src = menu_data[j].menu_img;
      }
      if (
        e.target.parentElement.parentElement.dataset.menuid == menu_data[j].id
      ) {
        let hiddenimg = e.target.parentElement.parentElement.children[1];
        // console.log(menu_data[j].menu_img);
        // console.log(hiddenimg[j].children);
        hiddenimg.children[0].src = menu_data[j].menu_img;
      }
    }
  });
}

let dessert = document.querySelectorAll(".dessert");
for (let i = 0; i < dessert.length; i++) {
  dessert[i].addEventListener("mouseover", function (e) {
    for (let j = 0; j < menu_data.length; j++) {
      if (
        e.target.parentElement.parentElement.dataset.menuid == menu_data[j].id
      ) {
        let hiddenimg = e.target.parentElement.parentElement.children[1];

        hiddenimg.children[0].src = menu_data[j].menu_img;
      }
      if (
        e.target.parentElement.parentElement.dataset.menuid == menu_data[j].id
      ) {
        let hiddenimg = e.target.parentElement.parentElement.children[1];

        hiddenimg.children[0].src = menu_data[j].menu_img;
      }
    }
  });
}

document.querySelectorAll(".minus").forEach(function (e) {
  e.onclick = decrementValue;
});

function decrementValue(e) {
  let parent = e.target.parentElement;
  let c = parent.children[1];
  let currentVal = parseInt(c.value);

  if (currentVal == 0) {
  } else {
    c.value = currentVal - 1;
  }
  clacTotal();
}

document.querySelectorAll(".plus").forEach(function (e) {
  e.onclick = incrementValue;
});

function incrementValue(e) {
  let parent = e.target.parentElement;
  let c = parent.children[1];
  let currentVal = parseInt(c.value);

  if (currentVal == 10) {
  } else {
    c.value = currentVal + 1;
  }
  clacTotal();
}

function clacTotal() {
  let quantities = document.querySelectorAll(".quantity_field");
  let total = 0;
  for (i = 0; i < quantities.length; i++) {
    // console.log(quantities[i].id, quantities[i].value);
    for (j = 0; j < menu_data.length; j++) {
      if (quantities[i].id == menu_data[j].id) {
        total = total + parseInt(quantities[i].value) * menu_data[j].price;
        // console.log(quantities[i].id, total);
      }
    }
  }
  document.querySelector("#total").innerHTML = total;
  // console.log(total);
  return total;
}

document.querySelectorAll(".quantity_field").forEach(function (e) {
  e.onchange = clacTotal;
});
