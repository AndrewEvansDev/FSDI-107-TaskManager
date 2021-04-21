var CUI ={};

class ContactMsg{
    constructor(name,email,contactBody){
        this.name = name;
        this.email = email;
        this.contactBody = contactBody;
    }
}

function saveMsg(){
    var name = CUI.name.val();
    var email = CUI.email.val();
    var contactBody = CUI.contactBody.val();
    var emailCheck = validateEmail(email);
    if(name ==""){
        $("p.rejectName").show()
        setTimeout(()=>$("p.rejectName").hide(),3000)
        return;
    }
    if(emailCheck == false){
        $("p.rejectEmail").show()
        setTimeout(()=>$("p.rejectEmail").hide(),3000)
        return;
    }
    if(contactBody ==""){
        $("p.rejectBody").show()
        setTimeout(()=>$("p.rejectBody").hide(),3000)
        return;
    }

    var newContactMsg = new ContactMsg(name,email,contactBody);
    console.log(newContactMsg);

    $.ajax({
        type: "POST",
        url: "/API/saveMsg",
        data: JSON.stringify(newContactMsg),
        contentType: "application/json",
        success: function (res) {
            console.log(res);
        },
        error: function (error) {
            console.log("Msg not sent", error);
        }
    })
};
function clearContact(){
    CUI.name.val("");
    CUI.email.val("");
    CUI.contactBody.val("");
}
function validateEmail(email) 
{
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
    {
    return (true)
    }
    return (false)
}


function initialize() {
    CUI.name = $("#contactName");
    CUI.email = $("#contactEmail");
    CUI.contactBody = $("#contactBody");
    $("button#contactBtn").click(saveMsg);
}

window.onload=initialize;