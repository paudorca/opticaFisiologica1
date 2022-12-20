var visualAcucity;  
var counterVal = -1;
var orientacion = 'dreta'; 
var totalAnswers = new Array(26).fill(0); //valor d'agudesa que va contestant
var correctAnswers = new Array(26).fill(0); //respostes correctes de l'usuari
var visualAgotadas = [];
var valorDistance = localStorage.getItem("distanceInput"); 
var valorSquare = localStorage.getItem("squareInput"); 
var s; 
var index; 
var ancho; 

//carrega del programa
window.onload = function() {
    todo(); 
}

//converteix el valor de mm a pixels 
//estableix el ample y l'alçada de la E d'snellen
function conversio() {
    s = (0.29*valorDistance)/visualAcucity; // s en mm, l'ampla i l'alçada de la E es 5 cops "s"
    result = s*5;
    factor = result/valorSquare; 
    pixels = 100*factor; 
    var pixels = Math.round(pixels);
    var text = pixels.toString(10);
    document.getElementById("foto").style.width= text+"px"; 
    document.getElementById("foto").style.height=text+"px";
}

//incrementa en 1 el numero de respostes de l'usuari
//counterVal va desde 0 fins a 500
function incrementClick() {
    ++counterVal; 
    var valResult = counterVal + ' / 500'
    document.getElementById("counter-label").innerHTML = valResult;
}

//quan s'acaba el test de agudesa visual, obre la pantalla amb els resultats
function abrirNuevoTab() {
    localStorage.setItem('correct',  JSON.stringify(correctAnswers));
    localStorage.setItem('total',  JSON.stringify(totalAnswers));
    var win = window.open("resultat.html", '_blank');
    win.focus();
  }

//conjunt de funcions a realitzar d'una resposta a l'altre
function todo() {
    updateAcucity();
    incrementClick(); 
    rotateSnellen(); 
    conversio(); 
    if (counterVal == 500) abrirNuevoTab(); 
}

//cambia el valor d'agudesa. Cada valor apareix com a molt 20 cops
function updateAcucity() {
    respuestas(); 
    visualAcucity = (Math.floor(Math.random() * 25) + 1)/10;
    index = visualAcucity*10; 
    //visualAgotadas es un vector amb els indexs d'agudessa que ja han arribat a 20
    //per tant si visualAgotadas conte el index que dona el random, es torna a calcular
    while (visualAgotadas.includes(visualAcucity*10)) {
        visualAcucity = (Math.floor(Math.random() * 25) + 1)/10;
        index = visualAcucity*10; 
    } 
    var texto = 'Visual Acuity ' + visualAcucity; 
    document.getElementById('acucity').innerHTML = texto; 
}

//si l'usuari selecciona adalt i la orientacio era adalt, es suma una resposta correcta
function adalt() {
    if (orientacion == 'adalt') ++correctAnswers[index]; 
    todo(); 
}

//si l'usuari selecciona esquerra i la orientacio era esquerra, es suma una resposta correcta
function esquerra() {
    if (orientacion == 'esquerra') ++correctAnswers[index];
    todo();  
}

//idem per dreta
function dreta() {
    if (orientacion == 'dreta') ++correctAnswers[index];
    todo();  
}

//idem per abaix
function abaix() {
    if (orientacion == 'abaix') ++correctAnswers[index];
    todo();  
}

//tecles
document.addEventListener('keydown', (event) => {
    var keyValue = event.key;
    
    if (keyValue == 'ArrowRight') {
        dreta(); 
    }
    else if (keyValue == 'ArrowLeft') {
        esquerra(); 
    }
    else if (keyValue == 'ArrowUp') {
        adalt(); 
    }
    else if(keyValue == 'ArrowDown'){
        abaix();
    }
  }, false);

  //suma de respostes totals
function respuestas() {
    ++totalAnswers[index];
    //comprobacio de si ja s'ha arribat a 20 cops el nivell d'agudessa
    if (totalAnswers[index] == 20 && counterVal != 499) visualAgotadas.push(index); 
}

//gira la e d'snellen turnAngle graus
function rotate(turnAngle) {
    document.getElementById('foto').setAttribute("style", "transform: rotate(" + turnAngle + "deg)");
}

//rota 0,90,180 o 270 graus la E
function rotateSnellen() {
    var num = Math.floor(Math.random() * 4) + 1;
    if (num == 1) {
        rotate(0); 
        orientacion = 'dreta';
    }
    else if (num == 2) {
        rotate(90); 
        orientacion = 'abaix';
    }
    else if (num == 3) {
        rotate(180); 
        orientacion = 'esquerra';
    }
    else {
        rotate(270); 
        orientacion = 'adalt';
    }
}