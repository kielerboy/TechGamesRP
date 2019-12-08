function buttoncallRejected(){
    var url = new URL(window.location.href);
    var callingNumber = url.searchParams.get("phonenumber");
    var leitstelle = url.searchParams.get("leitstelle");
    mp.trigger("client:Handy:rejectCall", callingNumber, leitstelle);
    location.href = "../Main/main.html";
}
