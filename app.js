//Nav Bar
const toggleButton = document.querySelector('.toggle-button');
const navbarLinks = document.querySelector('.navbar-links');
//Market place DIV
const market = document.querySelector('.paitings-container');

toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active')
});

//Get the products from the list
class Paitings{
  async getProducts() {
    try {
      let result = await fetch("paitings.json");
      let data = await result.json();
      let paitings = data.paitings;
      return paitings;
    } catch (err) {
      console.log(err);
    }
  }
}

class UI {
  displayPaitings(paitings) {
    let result = '';
    paitings.forEach( paiting => {
      result += `
        <div class="paiting-card" key=${paiting.id}>
          <img src=${paiting.url} alt=${paiting.title}>
          <div class="card-body">
              <h4>${paiting.title}</h4>
              <p>Artist: ${paiting.artist}</p>
          </div>
          <div class="card-sale">
              <h5>${paiting.price}</h5>
              <button class="btn">Buy</button>
          </div>
        </div>
      `
    });
    market.innerHTML = result;
  }
}

class Storage {}

document.addEventListener("DOMContentLoaded", () => {

  //Make sure that the API is only fetched on market.thml
  if(window.location.pathname === '/market.html') {
    const products = new Paitings();
    const ui = new UI();
    //Get all of the products
    products.getProducts().then(paitings => ui.displayPaitings(paitings));
  }

});


