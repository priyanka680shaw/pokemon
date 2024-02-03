// const container = document.querySelector("#container");
// const promice = fetch('https://pokeapi.co/api/v2/type/');
// promice.then((response) =>{
//     const data = response.json();
//     return data;
// })
// .then((data)=>{
//     console.log(data);
//     console.log(data.results[0].url);
//     return data.results[0].url;
// })
// .then((urlApi)=>{
//     fetch(urlApi)
// })
// .then((val)=>{
//     console.log(val);
// })


const container = document.querySelector("#container");
const promise = fetch('https://pokeapi.co/api/v2/type/');

promise.then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); 
  })
  .then((data) => {
    console.log(data);
    console.log(data.results[0].url);
    return data.results[0].url;
  })
  .then((urlApi) => {
    return fetch(urlApi); 
  })
  .then((secondResponse) => {
    if (!secondResponse.ok) {
      throw new Error('Network response was not ok');
    }
    return secondResponse.json(); 
  })
  .then((secondData) => {
    console.log(secondData.
pokemon[0].pokemon.url);
return secondData.
pokemon[0].pokemon.url;
  })
  .then((thirdResponse)=>{
    console.log(thirdResponse);
    return fetch(thirdResponse);
  })
  .then((thirdResponseData)=>{
    //return finalDData = console.log(thirdResponseData.json());
    return thirdResponseData.json()
  })
  .then((val)=>{
    console.log(val.
        sprites.back_default
        );
  })

