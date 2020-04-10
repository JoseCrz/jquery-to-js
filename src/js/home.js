// ? XMLHttpRequest

// * jQuery
$.ajax('https://randomuser.me/api/', {
  method: 'GET',
  success: function(data) {
    console.log('[jQuery]', data.results[0])
  },
  error: function(error) {
    console.log('[jQuery]', error)
  }
})

// * Vanilla
fetch('https://randomuser.me/api/')
.then(response => {
  return response.json()
})
.then(data => {
  console.log('[Vanilla]', data.results[0])
})
.catch(error => console.log('[Vanilla]', error))