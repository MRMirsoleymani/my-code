const searchInput = document.getElementById("Search-input");
const products = document.querySelectorAll(".Product-item");
const bottons = document.querySelectorAll(".filter");
const priceButton = document
  .getElementById("search_price")
  .querySelector("button");
const changeClass = (filter) => {
  bottons.forEach((botton) => {
    botton.dataset.filter === filter
      ? botton.classList.add("Selected")
      : botton.classList.remove("Selected");
  });
};

const filterHandeler = (event) => {
  const filter = event.target.dataset.filter;
  changeClass(filter);

  products.forEach((product) => {
    const category = product.dataset.category;
    if (filter === "all") {
      product.style.display = "block";
    } else {
      filter === category
        ? (product.style.display = "block")
        : (product.style.display = "none");
    }
  });
};

const searchHandeler = (event) => {
  const searchValue = event.target.value.toLowerCase().trim();

  products.forEach((product) => {
    const productName = product.children[1].innerText.toLowerCase();
    productName.includes(searchValue)
      ? (product.style.display = "block")
      : (product.style.display = "none");
  });
};

const searchPriceHandeler = (event) => {
  const searchPrice = +event.target.parentElement.children[0].value;

  products.forEach((product) => {
    const productPrice = product.children[2].innerText;
    const price = +productPrice.split(" ")[1];

    if (!searchPrice) {
      product.style.diplay = "block";
    } else {
      searchPrice === price
        ? (product.style.display = "block")
        : (product.style.display = "none");
    }
  });
};

searchInput.addEventListener("keydown", searchHandeler);
bottons.forEach((botton) => {
  botton.addEventListener("click", filterHandeler);
});
priceButton.addEventListener("click", searchPriceHandeler);
