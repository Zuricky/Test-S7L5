const params = new URLSearchParams(window.location.search);
const productId = params.get("appId");

const URL = productId
  ? "https://striveschool-api.herokuapp.com/api/agenda/" + productId
  : "https://striveschool-api.herokuapp.com/api/agenda/";

window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("product-form");
  const submitBtn = document.getElementById("submit-btn");
  const subtitle = document.querySelector("h2 + h5");
  const delBtn = document.getElementById("delete-btn");

  if (productId) {
    submitBtn.innerText = "Edit product";
    submitBtn.classList.add("btn-success");

    subtitle.innerText = "— Edit product";

    delBtn.classList.remove("d-none");
    delBtn.onclick = handleDelete;

    fetch(URL)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
      })
      .then((product) => {
        console.log(product);

        form.elements.name.value = product.name;
        form.elements.description.value = product.description;
        form.elements.brand.value = product.brand;
        form.elements.imageUrl.value = product.imageUrl;
        form.elements.price.value = product.price;
      });
  } else {
    submitBtn.innerText = "Add product";
    submitBtn.classList.add("btn-dark");

    subtitle.innerText = "— Create new product";
  }
});

form.onsubmit = function (event) {
  event.preventDefault();

  const newProduct = {
    name: form.elements.name.value,
    description: form.elements.description.value,
    brand: form.elements.brand.value,
    imageUrl: form.elements.imageUrl.value,
    price: form.elements.price.value,
  };

  console.log(newProduct);

  fetch(URL, {
    method: productId ? "PUT" : "POST",
    body: JSON.stringify(newProduct),
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNjI5Y2I3NDcwMTAwMTU4YjJiMzciLCJpYXQiOjE3Mzc3MTIyODQsImV4cCI6MTczODkyMTg4NH0.Qa4h_QJ6leyscheHpP8miF8JiP73g84x3k4PWuwZvnE",
    },
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Error during product creation!");
      }
    })
    .then((createdApp) => {
      if (!productId) {
        alert("Product with id: " + createdApp._id + " created correctly!");

        form.reset();
      } else {
        alert("Product with id: " + createdApp._id + " edited correctly!");
      }
    });
};

const handleDelete = () => {
  const hasConfirmed = confirm("Are you sure you want to delete the product?");

  if (hasConfirmed) {
    fetch(URL, { method: "DELETE" })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
      })
      .then((deletedApp) => {
        alert("We deleted " + deletedApp.name + " with id " + deletedApp._id);

        window.location.assign("./index.html");
      })
      .catch((err) => console.log(err));
  }
};
