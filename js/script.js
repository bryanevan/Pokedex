// IIFE wrap
let pokemonRepo = (function () {
  let pokemonList = [
    { name:'Pikachu', height:.4, types:'electric'},
    { name:'Squirtle', height:.5, types:'water'},
    { name:'Charizard', height:1.7, types:['fire', 'flying']},
    { name:'Ninetails', height:1.1, types:'electric'},
  ];
  document.write("<p></p>");

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }
  function addListItem (pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    button.addEventListener("click", function(Event) {
      showDetails(pokemon);
    });
  }
  
  function showDetails (pokemon) {
        console.log(pokemon);
    };
  
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
      };
  })();

  pokemonRepo.getAll().forEach(function(pokemon) {
    pokemonRepo.addListItem(pokemon);
});