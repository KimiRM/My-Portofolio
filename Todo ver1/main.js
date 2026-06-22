const AddBtn = document.getElementById('AddTodo');
const DeleteBtn = document.getElementById('DeleteTodo');
const EditBtn = document.getElementById('EditTodo');




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

    _CreatTask(title,desc,start,end){
        const newTask = {
            id: this._AssignTaskID(this),
            title: title,
            descript: desc,
            Start: start,
            End: end
        };
        this.$TaskList.push(Task);
    }

    _CreatEvent(title,desc,date,dur){
        const newEvent = {
            id: this._AssignEventID(this),
            title: title,
            descript: desc,
            date: date,
            duration: dur
        };
        this.$EventList.push(newEvent);
    }

}