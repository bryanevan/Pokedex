let pokemonRepository = (function() {
    let pokemonList = [];
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=10";
    let loadBar = document.querySelector(".lds-dual-ring");

    let searchButton = $(".btn-warning");
    searchButton.on("click", function() {
        let uPokemonList = $(".pokemon-list");
        uPokemonList.empty();
        getByName($(".form-control").val()).forEach(function(pokemon) {
            addListItem(pokemon);
        });
    })

    // Return functions

    // This function return the entire pokemon array
    function getAll() {
        return pokemonList;
    }

    // This function adds (pushes) a pokemon object to the pokemon array
    function add(pokemon) {
        if (typeof pokemon === "object" && "name" in pokemon && "detailsUrl" in pokemon) {
            pokemonList.push(pokemon);
        }
    }

    // This function returns a pokemon array with all pokemons
    // that include the "search" term in their Name
    function getByName(search) {
        return pokemonList.filter(function(pokemon) {
            return pokemon.name.toLowerCase().includes(search.toLowerCase());
        });
    }

    // This function adds a button to the website with the pokemon name
    // and an event listener that calls the showDetails function on click
    function addListItem(pokemon) {
        let uPokemonList = $(".pokemon-list");
        let listItem = $('<li class="group-list-item"></li>');
        let button = $(`<button type="button" class="pokemon-button btn btn-primary" 
            data-toggle="modal" data-target="#pokeModal">${pokemon.name}</button>`);

        listItem.append(button);
        uPokemonList.append(listItem);

        button.on("click", function() {
            showDetails(pokemon);
        });
    }

    // This function logs the given pokemon details on the console
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function() {
            showModal(pokemon);
        });
    }

    // This function fetches all pokemons from the api
    // ands adds them ton the array using the add function
    function loadList() {
        showLoadingMessage();
        return fetch(apiUrl).then(function(response) {
            return response.json();
        }).then(function(json) {
            json.results.forEach(function(item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function(e) {
            console.error(e);
        }).finally(function() {
            hideLoadingMessage();
        });
    }

    // This function adds details to a specific pokemon object on the array
    // using the deatilsUrl of the pokemon object to get the details from the api
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function(response) {
            return response.json();
        }).then(function(details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
            item.weight = details.weight;
        }).catch(function(e) {
            console.error(e);
        });
    }

    // This function shows a loading animation
    function showLoadingMessage() {
        loadBar.classList.remove("lds-dual-ring-hidden");
        loadBar.classList.add("lds-dual-ring-visible");
    }

    // This function hides the loading animation
    function hideLoadingMessage() {
        loadBar.classList.remove("lds-dual-ring-visible");
        loadBar.classList.add("lds-dual-ring-hidden");
    }

    // This function shows a modal with the pokemon details
    function showModal(pokemon) {
        let types = "";
        pokemon.types.forEach(function(type) {
            types += type.type.name + " ";
        });

        let modalTitile = $(".modal-title");
        let modalBody = $(".modal-body");

        modalTitile.empty();
        modalBody.empty();

        modalTitile.append(pokemon.name);
        modalBody.append(`<img class="modal-img" src="${pokemon.imageUrl}">`);
        modalBody.append(`<p>Height: ${pokemon.height}</p>`);
        modalBody.append(`<p>Weight: ${pokemon.weight}</p>`);
        modalBody.append(`<p>Types: ${types}</p>`);
    }

    // Load Pokemons from the API and print each pokemon on the website
    function loadAll() {
        loadList().then(function() {
            getAll().forEach(function(pokemon) {
                addListItem(pokemon);
            });
        });
    }

    // Return object with the same names for keys as values
    return {
        getAll: getAll,
        add: add,
        getByName: getByName,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showModal: showModal,
        loadAll: loadAll
    };
})();

pokemonRepository.loadAll();