
(async function movies () {
  const getMovies = async genre => {
    const url = `https://yts.mx/api/v2/list_movies.json?genre=${genre}/`

    const response = await fetch(url)
    const data = await response.json()
    const movies = data.data
    return movies
  }

  const actionMovies = await getMovies('action')
  const terrorMovies = await getMovies('terror')
  console.log("movies -> terrorMovies", terrorMovies)
  console.log("movies -> actionMovies", actionMovies)
})()