onload = function () {
    function err (){
        console.error('il y a eu un problème');
    }
    // requete recupère données en ajax
    req_livre("biblio.xml",{},get_livres, err,'txt');

    function get_livres(txt){
        let dispo = 1;
        let non_dispo = 1;
        let display = 'oui';

        //création d'une pagination
        document.getElementById('buttons').innerHTML = `
        <button class="prev"><a href=""><img src="img/back.png" alt=""></a></button>
        <button class="next"><a href=""><img src="img/next.png" alt=""></a></button>
        page: <span id="page"></span>`;
        
        //creation de radio pour choisir entre livres dispo et non disponible
        document.getElementById('liste').innerHTML =
            `<div id="dispo"><input name="livres" type="radio" id="dispo" checked>
            <label for="dispo">Livres disponibles</label></div>
            <div id="non_dispo">
            <input name="livres" type="radio" id="non_dispo">
            <label for="non_dispo">Livres non disponibles</label></div>`;
        
        function dis_trs(livre, bool,ch){
            let size=0;
            for (let i=0; i< livre.length; i++){

                if (livre[i].getElementsByTagName('disponible')[0].textContent === bool){
                    size++;
                    if (size<=10)
                        ch += `<tr id="${i}">`;
                    else
                        ch += `<tr style="display:none" id="${i}">`;
                    ch += `<td>${livre[i].getElementsByTagName('titre')[0].textContent}</td>`
                    ch += `<td>${livre[i].getElementsByTagName('auteur')[0].textContent}</td>`;
                    ch += `<td>${livre[i].getElementsByTagName('genre')[0].textContent}</td>`;
                    ch += `<td>${livre[i].getElementsByTagName('editeur')[0].textContent}</td>`;
                    ch += `<td >${livre[i].getElementsByTagName('disponible')[0].textContent}</td></tr>`;

                }
            }
            return ch;
        }

        //créer les diférents tableaux en fonction des disponibilités
        for (let i=0; i<2; i++){

            let ch = '';
            if (i%2 === 0)
                ch += `<table id="oui">`;
            else
                ch += `<table style="display:none" id="non">`;

            ch += `<thead>
                        <tr>
                        <th>Titre</th>
                        <th>Auteur</th>
                        <th>Genre</th>
                        <th>Editeur</th>
                        <th>Disponibilité</th>
                        </tr>
                        </thead>
                        <tbody style='text-align:center'>`;

            let livre = txt.getElementsByTagName('livre');

            if (i%2 === 0)
                ch = dis_trs(livre,'oui',ch);
            else
                ch = dis_trs(livre,'non',ch);
            ch += `</tbody></table>`;
            document.getElementById('tab_livres'+i).innerHTML = ch;
        }

        //pagination
        let ma_page = document.getElementById('page');
        ma_page.textContent = dispo;

        //affiche seulement le 10 elements par pages
        function affiche_ligne (la_page){
            let j = null;
            (display === 'oui')?j=0:j=1;
            let trs = document.getElementsByTagName('tbody')[j].getElementsByTagName('tr');
            if(la_page>0 && la_page <= Math.ceil(trs.length/10) ){
                if (display === 'oui'){
                    dispo = la_page;
                    ma_page.textContent = dispo;
                } else {
                    non_dispo = la_page;
                    ma_page.textContent = non_dispo;
                }

                for (let y=0; y<trs.length;y++){
                    if ( y >= parseInt(la_page-1+ '0') && y < parseInt(la_page+ '0')){
                        if(typeof trs[y] !== undefined)
                            trs[y].style.display = 'table-row';
                    } else {
                        if(typeof trs[y] !== undefined)
                            trs[y].style.display = 'none';
                    }
                }
            }
        }

        //evenement quand on clique sur precedent
        document.getElementsByClassName('prev')[0].onclick = function (e){
            e.preventDefault();
            let la_page = null;
            if(display === "oui")
                la_page = dispo-1;
            else
                la_page = non_dispo-1;
            affiche_ligne(la_page);
        };

        //evenement quand on clique sur suivant
        document.getElementsByClassName('next')[0].onclick = function (e){
            e.preventDefault();
            let la_page = null;
            if(display === "oui")
                la_page = dispo+1;
            else
                la_page = non_dispo+1;
            affiche_ligne(la_page);
        };

        //evenement quand on clique sur disponible
        document.getElementById('dispo').onclick = function (){
            ma_page.textContent = dispo;
            display = 'oui';
            document.getElementsByTagName('table')[0].style.display = 'table-row';
            document.getElementsByTagName('table')[1].style.display = 'none';
        };

        //evenement quand on clique sur non disponible
        document.getElementById('non_dispo').onclick = function (){
            ma_page.textContent = non_dispo;
            display = 'non';
            document.getElementsByTagName('table')[0].style.display = 'none';
            document.getElementsByTagName('table')[1].style.display = 'table-row';
        };

        let progressBar = document.getElementById("p");
        progressBar.style.display = 'none';
    }

};