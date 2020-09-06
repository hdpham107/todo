var taskService = new TaskService();

layDSTask();
function layDSTask() {
    taskService.layDSTaskAPI()
        .then(function (result) {
            console.log(result.data);
            hienThiDSTask(result.data);
        })
        .catch(function (err) {
            console.log(err);
        });
}

function getELE(ele) {
    return document.getElementById(ele);
}

function layThongTin() {
    var createDate = getELE("datepicker").value;
    var content = getELE("newTask").value;

    console.log(createDate, content);
    return new Task("", content, 0, createDate);
}

getELE("addItem").addEventListener("click", function () {
    // var createDate = getELE("datepicker").value;
    // var content = getELE("newTask").value;
    // var newTask = new Task("", content, 0, createDate);
    var newTask = layThongTin();

    taskService.themTaskAPI(newTask)
        .then(function (result) {
            console.log(result.data);
            layDSTask();
        })
        .catch(function (err) {
            console.log(err);
        });
});

function hienThiDSTask(mangTask) {
    var todo = getELE("todo");
    var completed = getELE("completed");
    var contentTodo = "";
    var contentCompleted = "";

    mangTask.map(function (task) {
        if (task.status == 0) {
            contentTodo += `
                <li>
                    ${task.taskContent} 
                    <span>
                        <i class="fa fa-trash-alt"></i>
                        <i class="fa fa-check-circle"></i>
                    </span>
                </li>
            `;
        } else {
            contentCompleted += `
                <li>
                    ${task.taskContent}
                    <span>
                        <i class="fa fa-trash-alt"></i>
                        <i class="fa fa-check-circle"></i>
                    </span>
                </li>
            `;
        }
    });

    todo.innerHTML = contentTodo;
    completed.innerHTML = contentCompleted;
}
