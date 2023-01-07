window.onload = function () {
  let productsInCart = JSON.parse(localStorage.getItem("shoppingCart"));
  console.log(productsInCart);

  const parentElement = document.querySelector("#buyItems");
  const cartSumPrice = document.querySelector("#sum-prices");

  const countTheSumPrice = function () {
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
            <img class="product-img" src="${product.image}">
            <div class="product-info">
              <h5 class="product-name">${product.name}</h5>
              <div class="butoane_plus_minus">
                <button class="button-minus" data-id=${product.id}>-</button>
                <span class="countOfProduct">${product.count}</span>
                <button class="button-plus" data-id=${product.id}>+</button>
              </div>
              <h6 class="product-price">${product.price} lei</h6>
            </div>
          </li>`;
      });
      parentElement.innerHTML = result.join("");
      //document.querySelector(".checkout").classList.remove("hidden");
      cartSumPrice.innerHTML = "TOTAL: " + "$" + countTheSumPrice();
    } else {
      //document.querySelector(".checkout").classList.add("hidden");
      parentElement.innerHTML =
        '<h4 class="empty">Coșul tău este gol</h4>';
      cartSumPrice.innerHTML = "";
    }
  };

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
