$(document).ready(function () {

    var MarvelApi = window.MarvelApi;

    var key = '70c13ec2b56b84adfcd99807f11bbe74';
    var api = new MarvelApi(key);

    api.findSeries('avengers').then(serie => {

        let serieImage = `url(${ serie.thumbnail.path }.${ serie.thumbnail.extension })`;
        $('.Layout').css('background-image', serieImage);

        var characters = serie.characters.items;
        var promises = [];

        for (let character of characters) {

            let promise = api.getResourceURI(character.resourceURI);
            promises.push(promise);
        }
        return Promise.all(promises);
    })
    // .then((characters).filter(character) => return !!character.thumbnail && !!character.description )
    .then(characters => {
        $('.Card').each((i, item) => {
            let character = characters[i];
            let $this = $(item);
            let $image = $this.find('.Card-image img');
            let $description = $this.find('.Card-description');
            let $name = $this.find('.Card-name');
            let $points = $this.find('.Card-points');
            var rand = Math.ceil(Math.random() * 1000);

            $image.attr('src', `${ character.thumbnail.path }.${ character.thumbnail.extension }`);
            $name.text(character.name);
            $description.text(character.description);
            $points.text(rand);
        });
    }).catch(err => {
        console.error(err);
    });
});