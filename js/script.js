// IIFE
  let pokemonRepository = (function () {

    // empty array to load from api
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=120';

  //adds pokemon with .push, if object
  function add(pokemon) {
    if (
    typeof pokemon === "object" &&
  "name" in pokemon 
  ) {
    pokemonList.push(pokemon);
  } else {
    console.log("pokemon is not correct");
  }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem (pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listPokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
    // listens for a button click and the logs to the console the details (why do I need to put this under addListItem)
    button.addEventListener("click", function(Event) {
    showDetails(pokemon);
  });
  }

  //load a list of pokemon from api. Promise fetch function. 
  function loadList() {
    return fetch(apiUrl).then (function (response) {
        // convert response to json
        return response.json();
    }).then (function (json) {
        // api uses 'results' for array of pokemon. Each result, we are calling item. For each item, we assign keys to parameters (items from api)
        json.results.forEach(function (item) {
            let pokemon = {
                name: item.name,
                detailsUrl: item.url
            };
            // add function which pushes pokemon if it is object, and has name
            add(pokemon);
        });
        // if any error occurs, it will be cought right here
    }) .catch(function (e) {
        console.error (e);
    })
  }

  //load pokemon details - promise (image, height, type)
  function loadDetails(item) {
    // defining url from json results and then fetching those details
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
        // details coming from api (all the info on each pokemon) after selecting which detail is needed (sprites, height, types-array)
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
      // any errors will be cought here
    }).catch(function (e) {
      console.error(e);
    });
  }

  // info to log when pokemon is clicked. Execute loadDetails and pass pokemon as parameter and then executes console.log
  function showDetails (item) {
    pokemonRepository.loadDetails(item).then (function () {
        console.log(item);
    });
  }

  // all functions to return
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
    };
  })();

  // function that goes through the list of pokemon and displays them on index
  pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
    });
  });
