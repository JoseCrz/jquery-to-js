
(async function pokedex () {
  const getPokemons = async type => {
    const url = `https://pokeapi.co/api/v2/type/${type}/`

    const response = await fetch(url)
    const data = await response.json()
    const pokemons = data.pokemon
    return pokemons
  }

  const grassPokemon = await getPokemons('grass')
  console.log("pokedex -> grassPokemon", grassPokemon)

 

  const $modal = document.querySelector('#modal')
  const $modalTitle = $modal.querySelector('h1')
  const $modalImage = $modal.querySelector('img')
  const $modalDescription = $modal.querySelector('p')
  const $hideModal = document.querySelector('#hide-modal')
  const $overlay = document.querySelector('#overlay')
  const $fireContainer = document.querySelector('#fire')
  const $grassContainer = document.querySelector('#grass')
  const $waterContainer = document.querySelector('#water')
  const $featuringContainer = document.querySelector('#featuring')
  const $form = document.querySelector('#form')
  const $home = document.querySelector('#home')

})()