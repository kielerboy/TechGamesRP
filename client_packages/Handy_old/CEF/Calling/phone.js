function button1Clicked(){
    document.getElementById("number").value = document.getElementById("number").value + "1";
    // VORWAHLERKENNUNG - if (document.getElementById("number").value.length == 3) document.getElementById("number").value = document.getElementById("number").value + " - ";
}
function button2Clicked(){
    document.getElementById("number").value = document.getElementById("number").value + "2";
}
function button3Clicked(){
    document.getElementById("number").value = document.getElementById("number").value + "3";
}
function button4Clicked(){
    document.getElementById("number").value = document.getElementById("number").value + "4";
}
function button5Clicked(){
    document.getElementById("number").value = document.getElementById("number").value + "5";
}
function button6Clicked(){
    document.getElementById("number").value = document.getElementById("number").value + "6";
}
function button7Clicked(){
    document.getElementById("number").value = document.getElementById("number").value + "7";
}
function button8Clicked(){
    document.getElementById("number").value = document.getElementById("number").value + "8";
}
function button9Clicked(){
    document.getElementById("number").value = document.getElementById("number").value + "9";
}
function button0Clicked(){
    document.getElementById("number").value = document.getElementById("number").value + "0";
}
function buttoncallClicked(){
    //////// Aus dem CEF Browser heraus lassen sich keine Serverevents callen. Müsste ein Zwischenschritt über nen ClientEvent noch dazu geschrieben werden.
    var number = document.getElementById("number").value;
    mp.trigger('client:Handy:startCall', number);
    location.href = "../Error/error.html";
}
function buttondeleteClicked(){
    document.getElementById("number").value = document.getElementById("number").value.slice(0, -1);
}
