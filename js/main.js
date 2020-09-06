var taskService = new TaskService();

function getELE(ele) {
    return document.getElementById(ele);
}

// function layThongTin() {
//     var createDate = getELE("datepicker").value;
//     var content = getELE("newTask").value;

//     console.log(createDate, content);
//     return new Task("", content, null, createDate);
// }

getELE("addItem").addEventListener("click", function(){
    var createDate = getELE("datepicker").value;
    var content = getELE("newTask").value;
    var newTask = new Task("", content, 0, createDate);

    taskService.themTask(newTask)
    .then(function(result){
        console.log(result.data);
    })
    .catch(function(err){
        console.log(err);
    });
});
