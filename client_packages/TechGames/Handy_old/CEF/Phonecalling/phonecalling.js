function buttonDeclineCall(){
    //////// Aus dem CEF Browser heraus lassen sich keine Serverevents callen. Müsste ein Zwischenschritt über nen ClientEvent noch dazu geschrieben werden.
    var number = document.getElementById("callingPartner").value;
    mp.trigger("client:Handy:rejectCall", number);
    location.href = "../Main/main.html";
}
