function buttoncallRejected(){
    var callingNumber = document.getElementById("callingPartner").value;
    mp.trigger("client:Handy:rejectCall", callingNumber);
    location.href = "../Main/main.html";
}
