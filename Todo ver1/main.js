const AddBtn = document.getElementById('AddTodo');
const DeleteBtn = document.getElementById('DeleteTodo');
const EditBtn = document.getElementById('EditTodo');


const Task = {
    id: Number,
    title: String,
    descript: String,
    Start: Date,
    End: Date
}

const Event = {
    id: Number,
    title: String,
    descript: String,
    date: Date,
    duration: Number
}

class TodoAPP{
    constructor(){
        this.$TaskList = [];
        this.$EventList = [];
        this.$LastTaskID = 0;
        this.$LastEventID = 0;
    }
    _AssignTaskID(Task){
        Task.id = this.$LastTaskID +1;
        this.$LastTaskID++;
    }

    _AssignEventID(Event){
        Event.id = this.$LastEventID +1;
        this.$LastEventID++;
    }

    
}