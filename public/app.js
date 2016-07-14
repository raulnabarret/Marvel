$(document).ready(function () {

	let url = 'http://gateway.marvel.com:80/v1/public/series?title=avengers&apikey=70c13ec2b56b84adfcd99807f11bbe74';
	let key = 'apikey=70c13ec2b56b84adfcd99807f11bbe74';

	//Callbacks
	// Promise.resolve($.get(url, function(data) {
	// 	 	var characters = data.data.results[0].characters.items
	// 		debugger		
	// 	})
	// )

	// Promises
	Promise.resolve($.get(url)).then(data => {
		var characters = data.data.results[0].characters.items;
		var promises = [];

		for (var i in characters) {

			var character = characters[i];
			var characterUrl = `${ character.resourceURI }?${ key }`;

			promises.push(Promise.resolve($.get(characterUrl)));
		}

		return Promise.all(promises);
	}).then(characters => {
		console.log(characters);
	}).catch(err => {
		debugger;
		console.error(err);
	});
});