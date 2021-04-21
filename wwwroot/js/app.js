var important = false;
var UI = {};
var serverUrl = "http://fsdi.azurewebsites.net/api";
var myTasks = [];

function toggleImportant() {
    if (important) {
        important = false;
    } else {
        important = true;
    }
}

function checkDate(date){
    var d = new Date(date)
    if(d instanceof Date && isFinite(d) == false) {
    return false}
}


function saveTask() {
    var important = false;
    var title = UI.title.val();
    var description = UI.description.val();
    var dueDate = UI.dueDate.val();
    var location = UI.location.val();
    var alertText = UI.alertText.val();
    var convertStatus = UI.selstatus.val();
    var status = parseInt(convertStatus);
        important = $("input[type='radio']:checked").val() == "true";
    
    var dateCheck = new Date(dueDate);
    var dateObject;
    if(checkDate(dateCheck)==false){
        console.log("bad date yo")
        $("input#txtDueDate").addClass("inputFail").val("Invalid date");
        $("#msgFail").show();
        setTimeout(function(){
            $("input#txtDueDate").removeClass("inputFail").val("");
            $("#msgFail").hide();
            },5000
        )
        return;
    }else{
        dateObject = dateCheck.toISOString();
    }


    if (title.length < 5) {
        $("#msgFail").show();
        $("input#txtTitle").addClass("inputFail").val("min 5 characters");
        setTimeout(function () {
            $("#msgFail").hide();
            $("input#txtTitle").removeClass("inputFail").val("");
        }, 7000);
        return;
        }
    if (description.length < 20||description.length>220) {
        $("#msgFail").show();
        $("input#txtLocation").addClass("inputFail").val("min 20 max 220 char");
        setTimeout(function () {
            $("#msgFail").hide();
            $("input#txtLocation").removeClass("inputFail").val("");
        }, 7000);
        return;
        }
    if (location.length < 5) {
        $("#msgFail").show();
        $("input#txtLocation").addClass("inputFail").val("min 5 characters");
        setTimeout(function () {
            $("#msgFail").hide();
            $("input#txtLocation").removeClass("inputFail").val("");
        }, 7000);
        return;
        }
    if (alertText.length > 20) {
        $("#msgFail").show();
        $("input#txtAlert").addClass("inputFail").val("max 20 characters");
        setTimeout(function () {
            $("#msgFail").hide();
            $("input#txtAlert").removeClass("inputFail").val("");
        }, 7000);
        return;
        }
    var taskToBeSaved = new Task(
        title,
        description,
        important,
        dateObject,
        location,
        alertText,
        status
    );
    console.log(taskToBeSaved);

    $.ajax({
        type: "POST",
        url: "/API/saveTask",
        data: JSON.stringify(taskToBeSaved),
        contentType: "application/json",
        success: function (res) {
            displayTask(res);
            console.log(res);
        },
        error: function (error) {
            console.log("Error/fail", error);
        },
    });
    clearForm();
}

function fetchTasks() {
    $.ajax({
        type: "GET",
        url: "/API/getTasks",
        success: function (res) {
            /*I added this in to fix an error on the console, not sure if it's needed.
            I actually think the null value is the problem...
            */
            if(res != null){
            for (let i = 0; i < res.length; i++) {
                let task = res[i];
                if (task.user === "AndrewEvans") {
                    displayTask(task);
                    myTasks.push(task);
                }
                }
            }
        },
        error: function (errDetails) {
            console.error(errDetails);
        },
    });
}


function init() {
    UI.id = $("#txtId");
    UI.title = $("#txtTitle");
    UI.description = $("#txtDescription");
    UI.dueDate = $("#txtDueDate");
    UI.location = $("#txtLocation");
    UI.alertText = $("#txtAlert");
    UI.selstatus = $("#selStatus");
    //load data
    fetchTasks();
    //hook events
    // $("#iconImp").click(toggleImportant);
    $("#btnSave").click(saveTask);


}

function clearForm() {
    UI.title.val("");
    UI.description.val("");
    UI.dueDate.val("");
    UI.location.val("");
    UI.alertText.val("");
    UI.selstatus.val("");
    if (important) toggleImportant();
    $('input[type="radio"]').prop('checked', false);
    $("section#details").removeClass("unimportant").removeClass("important").addClass("unimportant");
}

function displayTask(task) {
    let syntax;
    var aDate = new Date(task.dueDate);
    var bDate = aDate.toLocaleDateString();
    if(task.important===true){

        syntax=`
        <div id="${task.id}z" class="important task-item">
        <div class="extraWrap">
        <div class="itemHeader">
            <div class="taskh5"><h5>${task.title}</h5></div>
            <div class="itemDate">${bDate}</div>
        </div>
        <div id="${task.id}icon class="iconExpand"><i onclick="expTask(${task.id})" class="fas fa-eye-slash"></i></div>
        </div>
        <div class="iconAlertWrap">
        <div id="${task.id}alert" class="itemAlert">${task.alertText}</div>
            <div class="taskIcon"><i class="fas fa-map-marker-alt"></i><i class="fas fa-star-half-alt"></i><i onclick="taskClick(${task.id})" class="fas fa-pen-square"></i><i onclick="deleteTask(${task.id})" class="fas fa-trash"></i></div>
        
        </div>
        
        <div id="${task.id}loc" class="itemLoc"><i class="fas fa-map-marker"></i> ${task.location} </div>
        <div id="${task.id}desc" class="taskDesc">${task.description}</div>
    </div>
        `
    }else{
        syntax = `     
        <div id="${task.id}z" class="unimportant task-item">
        <div class="extraWrap">
        <div class="itemHeader">
            <div class="taskh5"><h5>${task.title}</h5></div>
            <div class="itemDate">${bDate}</div>
        </div>
        <div id="${task.id}icon class="iconExpand"><i onclick="expTask(${task.id})" class="fas fa-eye-slash"></i></div>
        </div>
        <div class="iconAlertWrap">
        <div id="${task.id}alert" class="itemAlert">${task.alertText}</div>
            <div class="taskIcon"><i class="fas fa-map-marker-alt"></i><i class="fas fa-star-half-alt"></i><i onclick="taskClick(${task.id})" class="fas fa-pen-square"></i><i onclick="deleteTask(${task.id})" class="fas fa-trash"></i></div>
        
        </div>
        
        <div id="${task.id}loc" class="itemLoc"><i class="fas fa-map-marker"></i> ${task.location} </div>
        <div id="${task.id}desc" class="taskDesc">${task.description}</div>
        </div>
        `
        }
    



    important=false;
    $("#pendingTasks").append(syntax);
}

function expTask(id){
for (var i = 0; i < myTasks.length; i++){
        let it = myTasks[i].id;
    if(id==it){
        var icon = `div#${id}icon.iconExpand`
        var loc = `div#${id}loc.itemLoc`;
        var desc = `div#${id}desc.taskDesc`; 
        var alert = `div#${id}alert.itemAlert`;
        if($(desc).is(":visible")){
        
        $(desc).hide();
        $(loc).hide();
        $(alert).show();
        $(icon).addClass("fa-eye-slash").removeClass("fa-eye");
        //fix this
    }    else{
        $(desc).show();
        $(loc).show();
        $(alert).hide();
        $(icon).addClass("fa-eye").removeClass("fa-eye-slash");
    }
    }
}}


function deleteTask(id) {
    console.log("Task delete request sent for ID: ", id);
    $.ajax({
        type: "DELETE",
        url: "/tasks/delTask/"+ id,
        success: function() {
            console.log("Task deleted!");
            $("#" + id).remove();
            $("div#"+id+"z").hide();
        },
        error: function( errDetails ) {
            console.error(errDetails)
        }
    });
    
}



$('#hideShow').click(function() {
    if($('#details').is(":visible")) {
        $('#details').slideUp();
        $('.hideShow span').text('show');
        $('#list').css('width','100%');
        // $('.hideShow span').css('margin-left','-6.2rem')
    } else {
        $('#details').slideDown();
        $('.hideShow span').text('hide')
        $('#list').css('width','69%')
        // $('.hideShow span').css('margin-left','-5.5rem')
    }
    });

function taskClick(id) {

    for (var i = 0; i < myTasks.length; i++) {
        var task = myTasks[i];
        if (task.id == id) {
            var aDate = new Date(task.dueDate);
            var bDate = aDate.toLocaleDateString();
            console.log(task);
            UI.title.val(task.title);
            UI.description.val(task.description);
            UI.dueDate.val(bDate);
            UI.location.val(task.location);
            UI.alertText.val(task.alertText);
            important = !task.important;
            UI.selstatus.val(task.selstatus)
            toggleImportant();
        }
    }
}

$("input#important").click(function(){
    $("section#details").addClass("important").removeClass("unimportant");
})
$("input#notImportant").click(function(){
    $("section#details").addClass("unimportant").removeClass("important")
})
$("input.form-control").focus(function(){
    $(this).prev('label').addClass('label-focus')
});
$("input.form-control").blur(function(){
    $(this).prev('label').removeClass('label-focus')
});
$("select").focus(function(){
    $(this).prev('label').addClass('label-focus')
});
$("select").blur(function(){
    $(this).prev('label').removeClass('label-focus')
});
$("textarea").focus(function(){
    $(this).prev('label').addClass('label-focus')
});
$("textarea").blur(function(){
    $(this).prev('label').removeClass('label-focus')
});
$("input#txtDueDate").focus(function(){
    $('label.fixPickerLabel').addClass('label-focus')
});
$("input#txtDueDate").blur(function(){
    $('label.fixPickerLabel').removeClass('label-focus')
});



window.onload = init;