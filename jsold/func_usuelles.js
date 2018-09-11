// **************************************************************
function addEvent(element, event, func) {
	if (element.addEventListener) {
		element.addEventListener(event, func, false);
	} else {
		element.attachEvent('on' + event, func);
	}
}
// **************************************************************

function set_message(texte, couleur) {
	var msg = document.getElementById("message");
	if (typeof(texte) == "string")
		msg.replaceChild(document.createTextNode(texte), msg.firstChild);
	else {
		var span = document.createElement("span");
		for (var i = 0, c = texte.length; i < c; i++) {
			span.appendChild(document.createTextNode(texte[i]));
			span.appendChild(document.createElement("br"));
		}
		msg.replaceChild(span, msg.firstChild);
	}
	if (couleur == 'vert')
		msg.style.backgroundColor = '#4ce000';
	else if (couleur == 'rouge')
		msg.style.backgroundColor = '#ff0000';
	else if (couleur == 'orange')
		msg.style.backgroundColor = '#ff6a00';
	else
		msg.style.backgroundColor = '#afafdc';
	
	clearTimeout(reinit_msg);
	reinit_msg = setTimeout(function() {
		var msg = document.getElementById("message");
		msg.replaceChild(document.createTextNode("Aucun message à afficher."), msg.firstChild);
		msg.style.backgroundColor = "#afafdc";
	}, 5000);
}

function set_etat(texte, couleur) {
	var etat = document.getElementById("etat");
	if (typeof(texte) == "string")
		etat.replaceChild(document.createTextNode(texte), etat.firstChild);
	else {
		var span = document.createElement("span");
		for (var i = 0, c = texte.length; i < c; i++) {
			span.appendChild(document.createTextNode(texte[i]));
			span.appendChild(document.createElement("br"));
		}
		etat.replaceChild(span, etat.firstChild);
	}
	if (couleur == 'vert')
		etat.style.backgroundColor = '#4ce000';
	else if (couleur == 'rouge')
		etat.style.backgroundColor = '#ff0000';
	else if (couleur == 'orange')
		etat.style.backgroundColor = '#ff6a00';
	else
		etat.style.backgroundColor = '#afafdc';
}

function set_log(texte) {
	var log = document.getElementById("log");
	log.insertBefore(document.createElement("br"), log.firstChild);
	log.insertBefore(document.createTextNode(texte), log.firstChild);
}