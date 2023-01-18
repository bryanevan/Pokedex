let pokemonList = [
    { name:'Pikachu', height:.4, types:'electric'},
    { name:'Squirtle', height:.5, types:'water'},
    { name:'Charizard', height:1.7, types:['fire', 'flying']},
    { name:'Ninetails', height:1.1, types:'electric'},
];
document.write("<p></p>")

for (let i=0; i < pokemonList.length; i++){
    if (pokemonList[i].height > 1.5){
    document.write(pokemonList[i].name + " Height=" + pokemonList[i].height + "," + " Wow! That's a big Pokemon." + "<p></p>");}
    else {
        document.write(pokemonList[i].name + " Height=" + pokemonList[i].height + "<p></p>") ;
    }
}