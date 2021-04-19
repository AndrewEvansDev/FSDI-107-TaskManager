var CUI ={};

class Msg{
    constructor(name,email,msg){
        this.name = name;
        this.email = email;
        this.msg = msg;
    }
}

$("button#contactBtn").click(function(){
    var name = CUI.name.val();
    var email = CUI.email.val();
    var msg = CUI.msg.val();

    var newMsg = new Msg(name,email,msg);
    console.log(msgMsg);

    $.ajax({
        type: "POST",
        url: "/API/saveMsg",
        data: JSON.stringify(newMsg),
        contentType: "application/json",
        success: function (res) {
            console.log(res);
        },
        error: function (error) {
            console.log("Msg not sent", error);
        }
    })
});


function initialize() {
    CUI.name = $("#contactName");
    CUI.email = $("#contactEmail");
    CUI.msg = $("#contactMsg");
}

window.onload=initialize;