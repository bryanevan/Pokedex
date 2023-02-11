let pokemonRepository = (function() {
    let pokemonList = [];
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=1000";
    let loadBar = document.querySelector(".lds-ripple");

    let searchButton = $(".btn-warning");
    searchButton.on("click", function() {
        let uPokemonList = $(".pokemon-list");
        uPokemonList.empty();
        getByName($(".form-control").val()).forEach(function(pokemon) {
            addListItem(pokemon);
        });
    })

    // Return functions

    // Return the entire pokemon array
    function getAll() {
        return pokemonList;
    }

    // Add (push) a pokemon object to the pokemon array
    function add(pokemon) {
        if (typeof pokemon === "object" && "name" in pokemon && "detailsUrl" in pokemon) {
            pokemonList.push(pokemon);
        }
    }

    // Return a pokemon array with all pokemons
    // that include the "search" term in their Name
    function getByName(search) {
        return pokemonList.filter(function(pokemon) {
            return pokemon.name.toLowerCase().includes(search.toLowerCase());
        });
    }

    // Add a button to the website with the pokemon name
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

    // Log the given pokemon details on the console
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function() {
            showModal(pokemon);
        });
    }

    // Fetch all pokemons from the api
    // and adds them to the array using the add function
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

    // Add details to a specific pokemon object on the array
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

    // Show a loading animation
    function showLoadingMessage() {
        loadBar.classList.remove("lds-ripple-hidden");
        loadBar.classList.add("lds-ripple-visible");
    }

    // Hide the loading animation
    function hideLoadingMessage() {
        loadBar.classList.remove("lds-ripple-visible");
        loadBar.classList.add("lds-ripple-hidden");
    }

    // Show a modal with the pokemon details
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