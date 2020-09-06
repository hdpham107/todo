function TaskService(){
    this.themTaskAPI = function(task){
        return axios({
            url: "https://5f3bbfc4fff8550016ae5980.mockapi.io/Task",
            method: "POST",
            data: task,
        });
    }

    this.layDSTaskAPI = function(){
        return axios({
            url: "https://5f3bbfc4fff8550016ae5980.mockapi.io/Task",
            method: "GET",
        });
    }
}