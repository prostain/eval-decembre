function req_livre(url, data, done, error, real_type = null){

    let req = Xhr();
    let type = url.split('.')[1];
    let progressBar = document.getElementById("p");

    req.onload= function(){
        if ( this.status === 200){
            if (type==='php')
                (real_type === 'xml')?done(req.responseXML):done(req.responseText);
            else if (type === 'xml')
                done(req.responseXML);
            else
                done(req.responseText);
        } else
            error();
    };

    let chaine_url ='?';
    for (const property in data){
        chaine_url += encodeURIComponent(property) + '='+ encodeURIComponent(data[property])+'&';
    }
    chaine_url += 'date=' + new Date();
    req.open("GET", url+chaine_url, false);
    req.onprogress = function(pe) {
        if(pe.lengthComputable) {
            progressBar.max = pe.total
            progressBar.value = pe.loaded
        }
    }
    req.onloadend = function(pe) {
        progressBar.value = pe.loaded
    }
    req.send(null);

}

function Xhr(){
    let obj = null;
    try { obj = new ActiveXObject("Microsoft.XMLHTTP");}
    catch(Error) { try { obj = new ActiveXObject("MSXML2.XMLHTTP");}
    catch(Error) { try { obj = new XMLHttpRequest();}
    catch(Error) { alert(' Impossible de créer l\'objet XMLHttpRequest')}
    }
    }
    return obj;
}

function err (){
    console.error('il y a eu un problème');
}