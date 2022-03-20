const API_URL = "https://pokeapi.co/api/v2/pokemon?offset=20&limit=40";

const pokemonsContainer = document.querySelector(".pokemons");
const previousBTN = document.querySelector("#btn-previous");
const nextBTN = document.querySelector("#btn-next");

let API_URL_NEXT = "";
let API_URL_PREVIOUS = "";

async function getPokemonNames (pagination) {
    try {
        console.log(pagination);
        let API_URL_TO_USE;
        if(pagination === "next") {
            API_URL_TO_USE = API_URL_NEXT;
        } else if(pagination === "previous") {
            API_URL_TO_USE = API_URL_PREVIOUS;
        } else {
            API_URL_TO_USE = API_URL;
        }
        const response = await fetch(API_URL_TO_USE);
        const responseJSON = await response.json();
        // console.log(responseJSON);
        API_URL_NEXT = responseJSON.next;
        API_URL_PREVIOUS = responseJSON.previous;
        previousBTN.disabled = API_URL_PREVIOUS === null; //
        const pokemonData = responseJSON.results;
        // console.log(pokemonData);
        pokemonsContainer.innerHTML = "";
        for(let i = 0; i < pokemonData.length; i++) {
           // console.log(pokemonData[i]);
            pokemonsContainer.innerHTML += `<li>${pokemonData[i].name}</li>`
        }
    } catch (error) {
        console.log(error);
    }
}

getPokemonNames().then();

let handleClickPrevious = function() {
    console.log("you clicked me");
    getPokemonNames("previous").then();
}
previousBTN.addEventListener("click", handleClickPrevious);

let handleClickNext = function() {
    console.log("you clicked me");
    getPokemonNames("next");

}
nextBTN.addEventListener("click", handleClickNext);

