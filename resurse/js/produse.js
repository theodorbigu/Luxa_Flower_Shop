//const composite = require("sharp/lib/composite");

window.onload = function () {
  //Popup adaugare cos
  var cumpara_buton = document.getElementsByClassName("buton_cumpara");
  for (let i = 0; i < cumpara_buton.length; i++) {
    cumpara_buton[i].addEventListener("click", () => {
      var popup = document.getElementById("myPopup");
      popup.classList.add("show");
      const removePopup = () => {
        popup.classList.remove("show");
      };
      const myTimeout = setTimeout(removePopup, 1800);
    });
  }

  ///SEARCH BUTTON

  var search_btn = document.getElementsByClassName("search-button");
  //console.log(search_btn);
  var search_container = document.getElementsByClassName("search-container");
  search_btn[0].addEventListener("click", () => {
    if (search_container[0].classList.contains("open")) {
      search_container[0].classList.remove("open");
    } else {
      search_container[0].classList.add("open");
    }
  });

  let lastScrollY = window.scrollY;
  const navbar = document.querySelector("nav");
  //console.log(lastScrollY);
  //console.log(navbar);
  window.addEventListener("scroll", () => {
    if (lastScrollY < window.scrollY) {
      navbar.classList.add("nav-hidden");
    } else {
      navbar.classList.remove("nav-hidden");
    }

    lastScrollY = window.scrollY;
  });

  var btn = document.getElementById("filtrare");
  btn.onclick = function () {
    var articole = document.getElementsByClassName("produs");
    //console.log(articole);
    for (let art of articole) {
      art.style.display = "none";

      //CONDITIE 1 (nume)
      var nume = art.getElementsByClassName("val-nume")[0]; //<span class="val-nume">aa</span>

      console.log(nume.innerHTML);

      var conditie_nume = nume.innerHTML
        .toLowerCase()
        .includes(document.getElementById("inp-nume").value);
      console.log(conditie_nume);
      //Conditie 2 (pret-min-max)
      var pret = art.getElementsByClassName("val-pret")[0];
      var conditie_pret_min =
        parseInt(pret.innerHTML) >
        parseInt(document.getElementById("inp-pret-min").value);

      var conditie_pret_max =
        parseInt(pret.innerHTML) <
        parseInt(document.getElementById("inp-pret-max").value);

      //CONDITIE 3(nr_fire):
      // var nr_fire_rad_btns = document.getElementsByName("gr_rad");
      // for (let rad of nr_fire_rad_btns) {
      //   if (rad.checked) {
      //     var val_nr_fire = rad.value; //poate fi 1, 2 sau 3
      //     break;
      //   }
      // }

      // var nr_fire = parseInt(
      //   art.getElementsByClassName("val-nr_fire")[0].innerHTML
      // );

      // var conditie_nr_fire = false;

      // switch (val_nr_fire) {
      //   case "1":
      //     conditie_nr_fire = nr_fire <= 9;
      //     break;
      //   case "2":
      //     conditie_nr_fire = nr_fire <= 21;
      //     break;
      //   case "3":
      //     conditie_nr_fire = nr_fire > 21;
      //     break;
      //   default:
      //     conditie_nr_fire = true;
      // }

      //CONDITIE 4 (q) Vreau sa fac culoare un vector cu culori pentru a face checkbox (dar nu stiu cum sa modific pe postgresql)

      ///Conditie 5 (Livrare-boolean)
      var conditie_livrare = true;
      // var val_livrare = art.getElementsByClassName("val-livrare")[0];

      // if (!val_livrare) {
      //   conditie_livrare = false;
      // }

      //Conditie 6 (tip flori)
      //(q) De intrebat profa:

      // var conditie_tip_flori = false;

      // var tip_floare = art.getElementById("tip_flori");

      // switch (tip_floare) {
      //   case "1":
      //     conditie_tip_flori = nr_fire <= 9;
      //     break;
      //   case "2":
      //     conditie_tip_flori = nr_fire <= 21;
      //     break;
      //   case "3":
      //     conditie_tip_flori = nr_fire > 21;
      //     break;
      //   default:
      //     conditie_tip_flori = true;
      // }

      if (conditie_nume && conditie_pret_min && conditie_pret_max) {
        art.style.display = "flex";
      }
    }
  };

  //Info pret min
  // var rng_min = document.getElementById("inp-pret-min");
  // var info_min = document.getElementById("infoRange_min"); //returneaza null daca nu gaseste elementul
  // rng_min.onchange = function () {
  //   if (!info_min) {
  //     info_min = document.createElement("span");
  //     info_min.id = "infoRange_min";
  //     this.parentNode.appendChild(info_min);
  //   }

  //   info_min.innerHTML = "(" + this.value + ")";
  // };
  var elem_min = document.querySelector("#inp-pret-min");

  var rangeValueMin = function () {
    var newValue = elem_min.value;
    var target = document.querySelector(".valueMin");
    target.innerHTML = newValue + " lei";
  };

  elem_min.addEventListener("input", rangeValueMin);
  //Info pret max
  // var rng_max = document.getElementById("inp-pret-max");
  // var info_max = document.getElementById("infoRange_max"); //returneaza null daca nu gaseste elementul
  // rng_max.onchange = function () {
  //   if (!info_max) {
  //     info_max = document.createElement("span");
  //     info_max.id = "infoRange_max";
  //     this.parentNode.appendChild(info_max);
  //   }

  //   info_max.innerHTML = "(" + this.value + ")";
  // };

  var elem_max = document.querySelector("#inp-pret-max");

  var rangeValueMax = function () {
    var newValue = elem_max.value;
    var target = document.querySelector(".valueMax");
    target.innerHTML = newValue + " lei";
  };

  elem_max.addEventListener("input", rangeValueMax);
  // document.getElementById("resetare").onclick = function () {
  //   //resetare inputuri
  //   document.getElementById("i_rad4").checked = true;
  //   //MIN
  //   document.getElementById("inp-pret-min").value =
  //     document.getElementById("inp-pret-min").min;
  //   info_min.innerHTML = "(0)";
  //   //MAX
  //   document.getElementById("inp-pret-max").value =
  //     document.getElementById("inp-pret-max").max;
  //   info_max.innerHTML = "(300)";
  //   //document.getElementById("infoRange_min").innerHTML="("+document.getElementById("inp-pret-min").min+")";

  //   //de completat...

  //   //resetare articole
  //   var articole = document.getElementsByClassName("produs");
  //   for (let art of articole) {
  //     art.style.display = "block";
  //   }
  // };

  const countTheSumPrice = function () {
    // 4
    let sum = 0;
    productsInCart.forEach((item) => {
      sum += item.price;
    });
    return sum;
  };

  const updateShoppingCartHTML = function () {
    localStorage.setItem("shoppingCart", JSON.stringify(productsInCart));
    if (productsInCart.length > 0) {
      let result = productsInCart.map((product) => {
        return `
          <li class="buyItem">
            <img src="${product.image}">
            <div>
              <h5>${product.name}</h5>
              <h6>$${product.price}</h6>
              <div>
                <button class="button-minus" data-id=${product.id}>-</button>
                <span class="countOfProduct">${product.count}</span>
                <button class="button-plus" data-id=${product.id}>+</button>
              </div>
            </div>
          </li>`;
      });
      parentElement.innerHTML = result.join("");
      //document.querySelector(".checkout").classList.remove("hidden");
      cartSumPrice.innerHTML = "$" + countTheSumPrice();
    } else {
      //document.querySelector(".checkout").classList.add("hidden");
      parentElement.innerHTML = '<h4 class="empty">Coșul tău este gol</h4>';
      cartSumPrice.innerHTML = "";
    }
  };

  function updateProductsInCart(product) {
    // 2
    for (let i = 0; i < productsInCart.length; i++) {
      if (productsInCart[i].id == product.id) {
        productsInCart[i].count += 1;
        productsInCart[i].price =
          productsInCart[i].basePrice * productsInCart[i].count;
        return;
      }
    }
    productsInCart.push(product);
  }

  const products = document.querySelectorAll(".produs");
  const parentElement = document.querySelector("#buyItems");
  const cartSumPrice = document.querySelector("#sum-prices");
  let productsInCart = JSON.parse(localStorage.getItem("shoppingCart"));
  if (!productsInCart) {
    productsInCart = [];
  }

  products.forEach((item) => {
    item.addEventListener("click", (e) => {
      if (e.target.classList.contains("buton_cumpara")) {
        const productID = item.id;
        const productName = item.querySelector(".val-nume").innerHTML;
        const productPrice = item.querySelector(".val-pret").innerHTML;
        const productImage = item.querySelector("img").src;
        let product = {
          name: productName,
          image: productImage,
          id: productID,
          count: 1,
          price: +productPrice,
          basePrice: +productPrice,
        };
        console.log(product);
        updateProductsInCart(product);
        updateShoppingCartHTML();
        const data = JSON.parse(localStorage.getItem("shoppingCart"));
        console.log(data);
      }
    });
  });

  parentElement.addEventListener("click", (e) => {
    // Last
    const isPlusButton = e.target.classList.contains("button-plus");
    const isMinusButton = e.target.classList.contains("button-minus");
    if (isPlusButton || isMinusButton) {
      for (let i = 0; i < productsInCart.length; i++) {
        if (productsInCart[i].id == e.target.dataset.id) {
          if (isPlusButton) {
            productsInCart[i].count += 1;
          } else if (isMinusButton) {
            productsInCart[i].count -= 1;
          }
          productsInCart[i].price =
            productsInCart[i].basePrice * productsInCart[i].count;
        }
        if (productsInCart[i].count <= 0) {
          productsInCart.splice(i, 1);
        }
      }
      updateShoppingCartHTML();
    }
  });

  updateShoppingCartHTML();
};
