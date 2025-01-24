fetch("https://striveschool-api.herokuapp.com/api/product/", {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNjI5Y2I3NDcwMTAwMTU4YjJiMzciLCJpYXQiOjE3Mzc3MTIyODQsImV4cCI6MTczODkyMTg4NH0.Qa4h_QJ6leyscheHpP8miF8JiP73g84x3k4PWuwZvnE",
  },
})
  .then((resp) => {
    console.log(resp);

    if (resp.ok) {
      return resp.json();
    } else {
      throw new Error("ERROR! Failed to retrieve data!");
    }
  })
  .then((products) => {
    console.log(products);

    const productList = document.getElementById("productList");

    products.forEach((item) => {
      console.log(item);

      const div = document.createElement("div");
      div.classList.add("col-4");
      div.innerHTML = `
          <div class="card">
            <img src="${item.imageUrl}" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">${item.name}</h5>
              <p class="card-text">&#8364; ${item.price}</p>
              <a href="./details.html?appId=${item._id}" class="btn btn-dark">Detail</a>
              <a href="#" class="btn btn-dark">Buy</a>
            </div>
          </div>
        </div>
        `;

      productList.appendChild(div);
    });
  })
  .catch((err) => {
    console.dir(err);

    generateAlert(err.message);
  });

const generateAlert = function (message) {
  const alertContainer = document.getElementById("alert-container");

  alertContainer.innerHTML = `<div class="alert alert-danger" role="alert">
                                ${message}
                              </div>`;
};
