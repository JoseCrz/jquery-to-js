
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

  const showModal = () => {
    $overlay.classList.add('active')
    $modal.style.animation = 'modalIn .8s forwards'
  }

  const setAttributes = ($element, attributes = {}) => {
    for (let attribute in attributes) {
      $element.setAttribute(attribute, attributes[attribute])
    }
  }

  $hideModal.addEventListener('click', () => {
    $overlay.classList.remove('active')
    $modal.style.animation = 'modalOut .8s forwards'
  })

  $home.addEventListener('click', event => {
    if (event.target.tagName === 'IMG' || event.target.tagName === 'H4' ) {
      showModal()
    }
  })

  $form.addEventListener('submit', event => {
    event.preventDefault()
    $home.classList.add('search-active')
    const $loader = document.createElement('img')
    setAttributes($loader, {
      src: 'src/images/loader.gif',
      height: 50,
      width: 50,
    })
    $featuringContainer.append($loader)
  })

  const grassPokemon = await getPokemons('grass')
  document.querySelector('#grass .loader').style.display='none'
  grassPokemon.forEach(pokemon => {
    const HTMLString = generatePokemonTemplate(pokemon.name, pokemon.imageUrl)
    $grassContainer.insertAdjacentHTML('beforeend',HTMLString)
  })

  const firePokemon = await getPokemons('fire')
  document.querySelector('#fire .loader').style.display='none'
  firePokemon.forEach(pokemon => {
    const HTMLString = generatePokemonTemplate(pokemon.name, pokemon.imageUrl)
    $fireContainer.insertAdjacentHTML('beforeend',HTMLString)
  })

  const waterPokemon = await getPokemons('water')
  document.querySelector('#water .loader').style.display='none'
  waterPokemon.forEach(pokemon => {
    const HTMLString = generatePokemonTemplate(pokemon.name, pokemon.imageUrl)
    $waterContainer.insertAdjacentHTML('beforeend',HTMLString)
  })

})()