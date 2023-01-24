// IIFE wrap
let pokemonRepo = (function () {
  let pokemonList = [
    { name:'Pikachu', height:.4, types:'electric'},
    { name:'Squirtle', height:.5, types:'water'},
    { name:'Charizard', height:1.7, types:['fire', 'flying']},
    { name:'Ninetails', height:1.1, types:'electric'},
  ];
document.write("<p></p>")

function add(pokemon) {
  pokemonList.push(pokemon);
}

function getAll() {
  return pokemonList;
}

return {
  add: add,
  getAll: getAll
};
})();
    
pokemonRepo.getAll().forEach(function(pokemon) {
  document.write(pokemon.name + pokemon.height + "<p></p>");
});