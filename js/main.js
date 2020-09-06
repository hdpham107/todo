var taskService = new TaskService();
var validation = new Validation();

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

// function layThongTin() {
//     var createDate = getELE("datepicker").value;
//     var content = getELE("newTask").value;

//     console.log(createDate, content);
//     return new Task("", content, 0, createDate);
// }

getELE("addItem").addEventListener("click", function () {
    var createDate = getELE("datepicker").value;
    var content = getELE("newTask").value;

    var newTask = new Task(content, 0, createDate);

    var isValid = true;
    // kiểm tra ngày rỗng
    isValid &= validation.kiemTraRong(createDate, "Ngày không được phép rỗng!");
    console.log(isValid);
    // kiểm tra nội dung task rỗng
    isValid &= validation.kiemTraRong(content, "Nội dung task không được phép rỗng!");
    console.log(isValid);

    if (isValid) {
        console.log(newTask);
        taskService.themTaskAPI(newTask)
            .then(function (result) {
                console.log(result.data);
                layDSTask();
            })
            .catch(function (err) {
                console.log(err);
            });
    }
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
                    <span>
                        ${task.taskContent} 
                    </span>
                    <span class="buttons">
                        <button class="remove">
                            <i class="fa fa-trash-alt" onclick="xoaTask(${task.id})"></i>
                        </button>
                        <button class="complete">
                            <i class="fa fa-check-circle far" onclick="checkTask(${task.id})"></i>
                        </button>
                    </span>
                </li>
            `;
        } else {
            contentCompleted += `
                <li>
                    <span>
                        ${task.taskContent}
                    </span>
                    <span class="buttons">
                        <button class="remove">
                            <i class="fa fa-trash-alt" onclick="xoaTask(${task.id})"></i>
                        </button>
                        <button class="complete">
                            <i class="fa fa-check-circle fas" onclick="checkTask(${task.id})"></i>
                        </button>
                    </span>
                </li>
            `;
        }
    });

    todo.innerHTML = contentTodo;
    completed.innerHTML = contentCompleted;
}

// xóa task
function xoaTask(id) {
    taskService.xoaTaskAPI(id)
        .then(function () {
            layDSTask();
        })
        .catch(function (err) {
            console.log(err);
        });
}

// check task
function checkTask(id) {
    taskService.layTaskAPI(id)
        .then(function (result) {
            console.log(result.data);
            var task = result.data;
            if (task.status == 0) {
                task.status = 1;
            } else {
                task.status = 0;
            }

            console.log(task);
            // cập nhật task với status mới
            taskService.capNhatTaskAPI(task)
                .then(function () {
                    layDSTask();
                })
                .catch(function (err) {
                    console.log(err);
                });
        })
        .catch(function (err) {
            console.log(err);
        });
}