const params = new URLSearchParams(window.location.search);
const productId = params.get("appId");

console.log("PRODUCT ID", productId);

fetch("https://striveschool-api.herokuapp.com/api/product/" + productId, {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNjI5Y2I3NDcwMTAwMTU4YjJiMzciLCJpYXQiOjE3Mzc3MTIyODQsImV4cCI6MTczODkyMTg4NH0.Qa4h_QJ6leyscheHpP8miF8JiP73g84x3k4PWuwZvnE",
  },
})
  .then((resp) => {
    if (!resp.ok) {
      throw new Error("Errore nel recupero del prodotto");
    }
    return resp.json();
  })
  .then((item) => {
    console.log(item);
    const container = document.getElementById("details-container");

    container.innerHTML = `
      <img src="${item.imageUrl}" alt="Immagine Prodotto" />
      <h6>${item.name}</h6>
      <p>${item.description}</p>
      <p>${item.price} &#8364;</p>
      <a href="./backoffice.html?appId=${item._id}" class="btn btn-dark">Edit</a>
    `;
  })
  .catch((err) => console.log(err));
