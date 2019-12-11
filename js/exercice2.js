function Xhr() {
    let obj = null;
    try { obj = new ActiveXObject("Microsoft.XMLHTTP"); } catch (Error) {
        try { obj = new ActiveXObject("MSXML2.XMLHTTP"); } catch (Error) {
            try { obj = new XMLHttpRequest(); } catch (Error) { alert('Impossible de créer l\'objet XMLHttpRequest') }
        }
    }

    return obj;
}

// Fonction qui récupère les villes en passant en paramètre la valeur de l'input
function display_villes(input) {
    let req = Xhr();

    req.onload = function() {
        if (this.status === 200) {
            let les_villes = JSON.parse(this.responseText); // transforme la liste des villes en un json
            afficheVilles(les_villes);
        }
    };

    req.open("POST", 'get_villes.php', true);
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.send('ville='+input.value);
}

// Affiche les villes dans la datalist
function afficheVilles(json){

    // Si la datalist est déjà présente, on la supprime pour en créer une nouvelle
    if(document.getElementById('villes')){
        document.getElementsByTagName('body')[0].removeChild(document.getElementById('villes'));
    }
    let datalist = document.createElement('datalist');
    datalist.setAttribute('id','villes');

    for(let indice in json){

        // On créé l'option
        let option = document.createElement('option');
        option.setAttribute('value',json[indice]['nom']);
        datalist.appendChild(option);
    }
    document.getElementsByTagName('body')[0].appendChild(datalist);
}