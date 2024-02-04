/***   select option value
 * get all pokemon type namein dropown list
 * *****/
const cardContainer = document.querySelector("#cardContainer");
const select = document.querySelector("#pokemonTypes");
const searchValue = document.querySelector("#searchValue");
const pokemonTypeApi = `https://pokeapi.co/api/v2/type/`;
//ui update part
function uiUpdatePrt(img,pokename){

  cardContainer.innerHTML += `     
                          <div class="cards">
                              <div class="innerCards">
                                  <figure class="images">
                                      <img src="${img}" alt="image">
                                  </figure>
                                  <figcaption class="caption">
                                      ${pokename}
                                  </figcaption>
                              </div>
                          </div>`;
}
const typeNmaeURL = {};
/*********
 * All pokemon Data
 * */
var arr = [];

async function allPokemon() {
  cardContainer.innerHTML = " ";
  try {
    let data = await fetch(`https://pokeapi.co/api/v2/pokemon/`);
    let x = await data.json();
    let y = x.results;

    await Promise.all(
      y.map(async (pokemon) => {
        let response = await fetch(pokemon.url);
        let result = await response.json();
        //   console.log(result);
        arr.push({
          name: result.name,
          img: result.sprites.front_default,
        });
      })
    );
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  arr.forEach((element) => {
    fetch(element.img).then((response) => {
      let img = response.url;
      let name = element.name;
      uiUpdatePrt(img, name);
      
    });
  });
}
window.load = allPokemon();

/**All pokemon Data**/  

function pokemonDropDown() {
  const pokemonType = fetch(pokemonTypeApi);
  pokemonType
    .then((pokemonTypeResponse) => {
      return pokemonTypeResponse.json();
    })
    .then((pokemonTypeData) => {
      for (let i = 0; i < pokemonTypeData.results.length; i++) {
        const type = pokemonTypeData.results[i];
        const typename = type.name;
        const typeurl = type.url;
        typeNmaeURL[typename] = typeurl;
        const option = document.createElement("option");
        option.innerText = typename;
        option.setAttribute("value", typename);
        option.setAttribute("url", typeurl);
        option.setAttribute("id", "optionData");
        select.append(option);
      }
    });
}
/***   select option value  end  *****/
/**************** filter by type function **********/
//var filterpokeArr = [];
function pokemonFilterhHandler() {
  arr = [];
  const selectValue = select.value;
  const pokemonetypes = typeNmaeURL[selectValue];
  fetch(pokemonetypes)
    .then((pokemonetypesResponse) => {
      return pokemonetypesResponse.json();
    })
    .then((pokemonetypesResponseData) => {
      const fetchedPokemon = pokemonetypesResponseData.pokemon;
      cardContainer.innerHTML = " ";
      for (let i = 0; i < 30; i++) {
        const pokemon = fetchedPokemon[i].pokemon;
        const pokemonName = pokemon.name;
        const pokemonUrl = pokemon.url;

        //console.log(pokemonName,pokemonUrl);
        // console.log(pokemon);
        fetch(pokemonUrl)
          .then((pokemonimageResponse) => {
            return pokemonimageResponse.json();
          })
          .then(
            (pokemonimageResponseData) =>
              pokemonimageResponseData.sprites.front_default
          )
          .then((imgUrl) => {
            arr.push({
              img: `${imgUrl}`,
              name: `${pokemonName}`,
            });
            uiUpdatePrt(imgUrl,pokemonName);
          });
      }
    });
}

function searchDataHandler(){
  cardContainer.innerHTML=" ";
   const getValue = searchValue.value;
   const findpokemon = arr.filter((data)=>{
      const findPoke = data.name.indexOf(getValue);
      if(findPoke !== -1){
          return true;
      }
   })
   //console.log(findpokemon);
   findpokemon.forEach((data)=>{
    
     uiUpdatePrt(data.img, data.name);
   })
}
searchValue.addEventListener("keyup" , searchDataHandler);

