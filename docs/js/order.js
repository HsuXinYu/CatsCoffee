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
let donut = new MenuItem("donut", "Donut", 60, "images/Donut.jpg");

let menu_data = [french_vanilla, caramel_macchiato, donut];

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
  document.querySelector(".ordered").innerHTML = total;
  // console.log(total);
  return total;
}

document.querySelectorAll(".quantity_field").forEach(function (e) {
  e.onchange = clacTotal;
});
