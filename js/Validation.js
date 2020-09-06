function Validation(){
    // check rỗng
    this.kiemTraRong = function(inputValue, message){
        // Nếu giá trị rỗng
        if(inputValue.trim() == ""){
            alert(message);
            return false;
        }
        return true;
    }
}