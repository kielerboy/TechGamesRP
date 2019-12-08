function buttoncallAccept(){
  var url = new URL(window.location.href);
  var callingNumber = url.searchParams.get("phonenumber");
  var leitstelle = url.searchParams.get("leitstelle");
  mp.trigger("client:Handy:startCall", callingNumber, leitstelle);
  location.href = "../Phonecall/phonecall.html?phonenumber=" + callingNumber + "&leitstelle=" + leitstelle;
}
function buttoncallRejected(){
  var url = new URL(window.location.href);
  var callingNumber = url.searchParams.get("phonenumber");
  mp.trigger("client:Handy:rejectCall", callingNumber);
  location.href = "../Main/main.html";
}
