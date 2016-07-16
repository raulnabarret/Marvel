$(document).ready(function() {
	
	class MarvelApi {
		constructor (key) {
			this.key = key
			this.baseUrl = 'http://gateway.marvel.com/v1/public/'
		}

		findSeries (title) {
			let url = `${this.baseUrl}series?title=${title}&apikey=${this.key}`
			
			if (localStorage[url]) {
				var datos = localStorage[url]
				datos = JSON.parse(datos)
				return Promise.resolve(datos)
			} else {
				return Promise.resolve($.get(url))
					.then((res) => {
						var datos = res.data.results[0]
						datosStorage = JSON.stringify(datos)
						localStorage[url] = datosStorage
						return Promise.resolve(datos)
					})
			}
		}

		getResourceURI (resourceURI) {
			let url = `${resourceURI}?apikey=${this.key}`
			
			if (localStorage[url]) {
				var datos = localStorage[url]
				datos = JSON.parse(datos)
				return Promise.resolve(datos)
			} else {				
				return Promise.resolve($.get(url))
					.then((res) => {
						var datos = res.data.results[0]
						datos = JSON.stringify(datos)
						localStorage[url] = datos 
						return Promise.resolve(datos)
					})				
			}

		}
	}

	window.MarvelApi = MarvelApi

});

