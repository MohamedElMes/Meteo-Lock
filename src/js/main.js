const villeEntree = document.getElementById("ville");
const paysEntree = document.getElementById("pays");
const formulaire = document.getElementById("formulaire");
const conteneur = document.getElementById("conteneur");


formulaire.addEventListener("submit", (form) => {
    form.preventDefault();

    conteneur.innerHTML=""
    document.body.className=""

    const ville = villeEntree.value;
    const codePays = paysEntree.value;

    if ( !ville || !codePays ) {
        console.log(errors[0]);
    } else {
        recupererCoordonnees(ville, codePays)
    }
});