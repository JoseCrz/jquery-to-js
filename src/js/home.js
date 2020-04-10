
(async function pokedex () {
  const $modal = document.querySelector('#modal')
  const $modalTitle = $modal.querySelector('h1')
  const $modalImage1 = $modal.querySelector('#modal-img-1')
  const $modalImage2 = $modal.querySelector('#modal-img-2')
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
      const front = newPokemon.sprites.front_default
      const back = newPokemon.sprites.back_default
      pokeArray.push({name: pokemonName, frontSprite: front, backSprite: back})
    }
    return pokeArray
  }

  const getPokemon = async pokemonName => {
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`)
    const dataParsed = await data.json()
    const pokemon = {
      name: dataParsed.name,
      frontSprite: dataParsed.sprites.front_default,
      backSprite: dataParsed.sprites.back_default,
    }
    return pokemon
  }

  const generatePokemonTemplate = (pokemonName, imageUrl, type) => {
    return (
      `<div class="primaryPokemonlistItem" data-pokemon="${pokemonName}" data-type="${type}">
        <img src="${imageUrl}">
        <h4 class="primaryPokemonlistItem-title">
          ${pokemonName}
        </h4>
      </div>`
    )
  }

  const generateFeaturingTemplate = (imageUrl, name) => {
    return (
      `<div class="featuring">
        <div class="featuring-image">
          <img src="${imageUrl}" alt="">
        </div>
        <div class="featuring-content">
          <p class="featuring-title">Pokémon found</p>
          <p class="featuring-album">${name}</p>
        </div>
      </div>`
    )
  }

  const showModal = async pokemonName => {
    $overlay.classList.add('active')
    const pokemon = await getPokemon(pokemonName)
    $modalTitle.textContent = pokemon.name
    $modalImage1.setAttribute('src',pokemon.frontSprite)
    $modalImage2.setAttribute('src', pokemon.backSprite)
    $modal.style.animation = 'modalIn 1s forwards'
  }

  const setAttributes = ($element, attributes = {}) => {
    for (let attribute in attributes) {
      $element.setAttribute(attribute, attributes[attribute])
    }
  }

  const addImageFadeIn = $element => {
    $element.lastElementChild.querySelector('img').addEventListener('load', event => {
      event.srcElement.classList.add('fadeIn')
    })
  }

  const getData = async type => {
    let pokemonList
    if(localStorage.getItem(type)) {
      pokemonList = JSON.parse(localStorage.getItem(type))
      console.log('Not requested')
    } else {
      pokemonList = await getPokemons(type)
      localStorage.setItem(type, JSON.stringify(pokemonList))
      console.log('Requested')
    }
    return pokemonList
  }

  $hideModal.addEventListener('click', () => {
    $overlay.classList.remove('active')
    $modal.style.animation = 'modalOut .8s forwards'
  })

  $home.addEventListener('click', async event => {
    if (event.target.tagName === 'IMG' || event.target.tagName === 'H4' ) {
      const pokemonName = event.target.parentNode.dataset.pokemon
      showModal(pokemonName)
    }
  })

  $form.addEventListener('submit', async event => {
    event.preventDefault()
    $home.classList.add('search-active')
    const $loader = document.createElement('img')
    setAttributes($loader, {
      src: 'src/images/loader.gif',
      height: 50,
      width: 50,
    })
    $featuringContainer.append($loader)
    const formData = new FormData($form)
    const pokemonName = formData.get('name')
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`)
    const pokemon = await data.json()
    const featuring = generateFeaturingTemplate(pokemon.sprites.front_default, pokemon.name)
    document.querySelector('#featuring img').style.display = 'none'
    $featuringContainer.insertAdjacentHTML('beforeend', featuring)
  })

  const grassPokemon = await getData('grass')
  document.querySelector('#grass .loader').style.display='none'
  grassPokemon.forEach(pokemon => {
    const HTMLString = generatePokemonTemplate(pokemon.name, pokemon.frontSprite)
    $grassContainer.insertAdjacentHTML('beforeend',HTMLString)
    addImageFadeIn($grassContainer)
  })

  const firePokemon = await getData('fire')
  document.querySelector('#fire .loader').style.display='none'
  firePokemon.forEach(pokemon => {
    const HTMLString = generatePokemonTemplate(pokemon.name, pokemon.frontSprite)
    $fireContainer.insertAdjacentHTML('beforeend',HTMLString)
    addImageFadeIn($fireContainer)
  })

  const waterPokemon = await getData('water')
  document.querySelector('#water .loader').style.display='none'
  waterPokemon.forEach(pokemon => {
    const HTMLString = generatePokemonTemplate(pokemon.name, pokemon.frontSprite)
    $waterContainer.insertAdjacentHTML('beforeend',HTMLString)
    addImageFadeIn($waterContainer)
  })

})()