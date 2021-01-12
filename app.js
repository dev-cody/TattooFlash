//Nav Bar
const toggleButton = document.querySelector('.toggle-button');
const navbarLinks = document.querySelector('.navbar-links');
//Market place DIV
const market = document.querySelector('.paitings-container');
//Artist splits page
const splitsPage = document.querySelector('.splits-artists');

//toggle navbar
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

//Get the painters from the list
class Artists {
  async getArtists() {
    try {
      let result = await fetch("artist.json");
      let data = await result.json();
      let artists = data.artists;
      return artists;
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

  displayArtist(artists) {
    let result = '';
    artists.forEach( artist => {
      result += `
        <div class="artist-card" key="${artist.id}>
          <div class="artist-card-body">
            <h4>${artist.name}</h4>
            <a href=${artist.profile}>
              <button class="btn">Split!</button>
            </a>
          </div>
        </div>
      `
    });
    splitsPage.innerHTML = result;
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
  } else if (window.location.pathname === '/splits.html') {
    const artists = new Artists();
    const ui = new UI();
    //Get all of the artists
    artists.getArtists().then(artists => ui.displayArtist(artists));
  } else if (window.location.pathname === '/signup.html') {

    //signup and registration toggle
    const createAccount = document.querySelector('#createAccount');
    const loginAlready = document.querySelector('#linkLogin');
    
    //toggle account creation and signup
    createAccount.addEventListener('click', () => {
      const loginForm = document.querySelector('#login');
      const createForm = document.querySelector('#createAccountForm');

      loginForm.classList.add("form-hidden");
      createForm.classList.remove("form-hidden");
    });

    loginAlready.addEventListener('click', () => {
      const loginForm = document.querySelector('#login');
      const createForm = document.querySelector('#createAccountForm');

      createForm.classList.add("form-hidden");
      loginForm.classList.remove("form-hidden");
    });
  }

});


