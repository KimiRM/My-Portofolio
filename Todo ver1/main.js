const AddBtn = document.getElementById('AddTodo');
const DeleteBtn = document.getElementById('DeleteTodo');
const EditBtn = document.getElementById('EditTodo');

const TaskEventTable = document.getElementById('TaskEventTable');
const TodoTable = document.getElementById('TodoTable');
const TableRightMenu = document.getElementById('RightMenu');
const TableLeftMenu = document.getElementById('LeftMenu');

const AddSection = document.getElementById('AddSection');
AddSection.style.display = "none";
const AddSectionTaskDiv = document.getElementById('AddSectionTask');
AddSectionTaskDiv.style.display = "none";
const AddSectionEventDiv = document.getElementById('AddSectionEvent');
AddSectionEventDiv.style.display = "none";
const AddSectionAddBtn = document.getElementById('AddSection-AddBtn');
const AddSectionCloseBtn = document.getElementById('AddSection-CloseBtn');
const AddSectionTask_Title = document.getElementById('AddSectionTask-TitleInput');
const AddSectionTask_Desc = document.getElementById('AddSectionTask-DescInput');
const AddSectionTaskBtn = document.getElementById('AddSection-AddTask');
const AddSectionEventBtn = document.getElementById('AddSection-AddEvent');


class TodoAPP{
    constructor(){
        this.$TaskList = [];
        this.$EventList = [];
        this.$LastTaskID = 0;
        this.$LastEventID = 0;
    }

    AddToDo = () =>{
        AddSection.style.display = "block";

        AddSectionAddBtn.removeEventListener('click', this._AddTask);
        AddSectionCloseBtn.removeEventListener('click', this._closeSaveForm);

        AddSectionAddBtn.addEventListener('click' , this._AddTask);
        AddSectionCloseBtn.addEventListener('click' , this._closeSaveForm);
    }

    _AddTask = (e)=> {
        try{
            const t = AddSectionTask_Title.value;
            const d = AddSectionTask_Desc.value;

            this._CreatTask(t,d);
            console.log(this.$TaskList);

        }catch(err){
            console.log(err.message);
        }
    }

    _CloseAddSection = ()=>{
        AddSectionTask_Title , AddSectionTask_Desc = "" , "";
        AddSection.style.display = "none";
    }

    _AssignTaskID(Task){
        Task.id = this.$LastTaskID +1;
        this.$LastTaskID++;
    }

    _AssignEventID(Event){
        Event.id = this.$LastEventID +1;
        this.$LastEventID++;
    }

    _CreatTask(title="Undefined",desc="",start=moment().format("YYYYMMDD"),end=moment().format("YYYYMMDD")){
        const newTask = {
            id: this._AssignTaskID(this),
            title: title,
            descript: desc,
            Start: start,
            End: end
        };
        this.$TaskList.push(Task);
    }

    _CreatEvent(title="Undefined",desc="",date=moment().format("YYYYMMDD"),dur=0){
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