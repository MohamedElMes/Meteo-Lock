async function recupererMeteo(latitude, longitude, ville, departement, pays, nb) {
    const url = "https://api.open-meteo.com/v1/forecast?latitude=" + latitude + "&longitude=" + longitude + "&current=temperature_2m,relative_humidity_2m,apparent_temperature,cloud_cover,wind_speed_10m,precipitation_probability,weather_code&daily=sunrise,sunset";
    const reponse = await fetch(url);
    const meteo = await reponse.json();
    let villeCard;
  
    for ( const weatherCode in weatherCodes ) {
        if ( meteo['current'].weather_code == Number(weatherCode) ) {
            villeCard = weatherCodes[weatherCode];
        }
    };

    if ( nb == 1 ) {
        document.body.classList.add(villeCard);
        conteneur.innerHTML+=`<div class="ville-card p-2 rounded">
                <div class="d-flex justify-content-between">
                    <div>
                        <h5 class="fs-1">${ville}</h5>
                        <h6>${departement}, ${pays}</h6>
                        
                        <p class="mt-5">Précipitations: ${meteo['current'].precipitation_probability}${meteo['current_units'].precipitation_probability}</p>
                        <p>Humidité: ${meteo['current'].relative_humidity_2m}${meteo['current_units'].relative_humidity_2m}</p>
                        <p>Vent: ${meteo['current'].wind_speed_10m}${meteo['current_units'].wind_speed_10m}</p>
                    </div>
                    <div class="align-middle text-end">
                        <div class="align-middle">
                            <p class="m-0 fs-2">${meteo['current'].temperature_2m}${meteo['current_units'].temperature_2m}</p>
                            <p class="m-0 text-end">${meteo['current'].apparent_temperature}${meteo['current_units'].apparent_temperature}</p>
                            
                            <p class="mt-5">Lever soleil: ${meteo['daily']['sunrise'][0].substring(11,16)}</p>
                            <p>Coucher soleil: ${meteo['daily']['sunset'][0].substring(11,16)}</p>
                        </div>
                    </div>
                </div>
            </div>`
    } else {
        conteneur.classList.add("p-4", "border");
        console.log(villeCard )
                      conteneur.innerHTML+=`            <div class="${villeCard} mb-2 ville-card text-bg-dark p-2 rounded">
                <div class="d-flex justify-content-between">
                    <div>
                        <h5 class="card-title">${ville}</h5>
                        <h6>${departement}, ${pays}</h6>
                    </div>
                    <div class="align-middle d-flex gap-4">
                        <div class="align-middle">
                            <p class="m-0 fs-4">${meteo['current'].temperature_2m}${meteo['current_units'].temperature_2m}</p>
                            <p class="m-0 text-end">${meteo['current'].apparent_temperature}${meteo['current_units'].apparent_temperature}</p>
                        </div>
                        <div class="align-middle">
                            <button class="btn btn-secondary">Voir plus</button>
                        </div>
                    </div>
                </div>`
    }
}

 