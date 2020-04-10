
(async function pokedex () {
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

  const getPokemons = async type => {
    const url = `https://pokeapi.co/api/v2/type/${type}/`

    const response = await fetch(url)
    const data = await response.json()
    const pokemons = data.pokemon
    let pokeArray = []
    for (let i =0; i <= 10; i++) {
      const pokemonName = pokemons[i].pokemon.name
      const newResponse = await fetch(pokemons[i].pokemon.url)
      const newPokemon = await newResponse.json()
      const image = newPokemon.sprites.front_default
      pokeArray.push({name: pokemonName, imageUrl: image})
    }
    return pokeArray
  }

  const generatePokemonTemplate = (pokemonName, imageUrl) => {
    return (
      `<div class="primaryPokemonlistItem">
        <div class="primaryPokemonlistItem-image">
          <img src="${imageUrl}">
        </div>
        <h4 class="primaryPokemonlistItem-title">
          ${pokemonName}
        </h4>
      </div>`
    )
  }

  const grassPokemon = await getPokemons('grass')
  grassPokemon.forEach(pokemon => {
    const HTMLString = generatePokemonTemplate(pokemon.name, pokemon.imageUrl)
    const html = document.implementation.createHTMLDocument()
    html.body.innerHTML = HTMLString
    $grassContainer.append(html.body.children[0])
  })
  // grassPokemon.forEach(pokemon => console.log(pokemon.name))

})()