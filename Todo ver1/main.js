const AddBtn = document.getElementById('AddTodo');
const DeleteBtn = document.getElementById('DeleteTodo');
const EditBtn = document.getElementById('EditTodo');


const Task = {
    id : Number,
    title: String,
    descript = String
}

const Event = {
    id : Number,
    title: String,
    descript = String
}

class TodoAPP{
    constructor(){
        this.$TaskList = [];
        this.$EventList = [];
    }

}