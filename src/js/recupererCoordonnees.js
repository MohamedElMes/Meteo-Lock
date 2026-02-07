async function recupererCoordonnees(ville, codePays) {
    const url = "https://geocoding-api.open-meteo.com/v1/search?name=" + ville + "&countryCode=" + codePays;
    const reponse = await fetch(url);
    const coordonnees = await reponse.json();

    if ( coordonnees['results'].length > 1 ) {
        coordonnees['results'].forEach((coordonnee) => {
            if (coordonnee.name.toLowerCase() == ville.toLowerCase() ) {
                recupererMeteo(coordonnee.latitude, coordonnee.longitude, coordonnee.name, coordonnee.admin1, coordonnee.country, coordonnees['results'].length);
            }
        });
    } else {
        recupererMeteo(coordonnees['results'][0].latitude, coordonnees['results'][0].longitude, coordonnees['results'][0].name, coordonnees['results'][0].admin1, coordonnees['results'][0].country, 1)
    }
}