


$(".btn").on('click', function(){
	$(".contact ,.overlay").removeClass("hidden");
});

var innerHTMLString = "";

function editContact(name) {
	mp.trigger("client:Handy:getSingleContact", name);
}

function callContact(name) {
	location.href = "../Phonecalling/phonecalling.html";
	mp.trigger("client:Handy:callContact", name);
}

function addEmergencyContacts() {
	innerHTMLString += "<div class='entry-contacts' onclick='callContact(`911`)'>Polizei</div><div class='entry-contacts' onclick='callContact(`912`)'>Medic</div><div class='entry-contacts' onclick='callContact(`913`)'>Taxi</div><div class='entry-contacts' onclick='callContact(`914`)'>Justiz</div>"
	document.getElementById('wrapper-contacts').innerHTML = innerHTMLString;
}

function addContactDiv(contactName) {
	if(contactName.length > 21) {
		contactname = contactName.substring(0,21);
	}
	innerHTMLString += `<div class='entry-contacts' onclick='editContact("` + contactName + `")'>` + contactName + `</div>`;
	document.getElementById('wrapper-contacts').innerHTML = innerHTMLString;
}

