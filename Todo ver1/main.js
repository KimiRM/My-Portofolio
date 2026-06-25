const AddBtn = document.getElementById('AddTodo');
const DeleteBtn = document.getElementById('DeleteTodo');
const EditBtn = document.getElementById('EditTodo');

// =================   Table Section    ===================

const TaskEventTable = document.getElementById('TaskEventTable');
const TodoTable = document.getElementById('TodoTable');
const TableRightMenu = document.getElementById('RightMenu');
const TableLeftMenu = document.getElementById('LeftMenu');

// =================   Add Section    ===================
const AddSection = document.getElementById('AddSection');
AddSection.style.display = "none";
const AddSectionTaskDiv = document.getElementById('AddSectionTask');
AddSectionTaskDiv.style.display = "none";
const AddSectionEventDiv = document.getElementById('AddSectionEvent');
AddSectionEventDiv.style.display = "none";
const AddSectionFooter = document.getElementById('AddSectionFooter');
AddSectionFooter.style.display = "none";

const AddSectionTaskBtn = document.getElementById('AddSection-AddTask');
const AddSectionEventBtn = document.getElementById('AddSection-AddEvent');

const AddSectionTask_Title = document.getElementById('AddSectionTask-TitleInput');
const AddSectionTask_Desc = document.getElementById('AddSectionTask-DescInput');
const AddSectionTask_StartTime = document.getElementById('AddSectionTask-StartTime-input');
const AddSectionTask_EndTime = document.getElementById('AddSectionTask-EndTime-input');


const AddSectionEvent_Title = document.getElementById('AddSectionEvent-TitleInput');
const AddSectionEvent_Desc = document.getElementById('AddSectionEvent-DescInput');
const AddSectionEvent_Date = document.getElementById('AddSectionEvent-Date-input');


const AddSectionAddBtn = document.getElementById('AddSection-AddBtn');
const AddSectionCloseBtn = document.getElementById('AddSection-CloseBtn');

const now = moment().format('YYYY-MM-DDTHH:mm');
document.getElementById('AddSectionTask-StartTime-input').value = now;
document.getElementById('AddSectionTask-EndTime-input').value = now;
document.getElementById('AddSectionEvent-Date-input').value = now;




// ======================    Todo Main Class    ======================

class TodoAPP{
    constructor(){
        this.$TaskList = [];
        this.$EventList = [];
        this.$LastTaskID = 0;
        this.$LastEventID = 0;
    }

    //  ==================     Add Task/Event     ==================
    AddToDo = () =>{
        AddSection.style.display = "block";

        AddSectionTaskBtn.removeEventListener('click' , this._AddTodo_Task);
        AddSectionEventBtn.removeEventListener('click' , this._AddTodo_Event);

        AddSectionTaskBtn.addEventListener('click' , this._AddTodo_Task);
        AddSectionEventBtn.addEventListener('click' , this._AddTodo_Event);

        
    }
    _AddTodo_Task = () =>{
        AddSectionTaskDiv.style.display = "block";
        AddSectionFooter.style.display = "block";
        AddSectionEventDiv.style.display = "none";

        AddSectionAddBtn.removeEventListener('click', this._AddTask);
        AddSectionCloseBtn.removeEventListener('click', this._CloseAddSection);

        AddSectionAddBtn.addEventListener('click' , this._AddTask);
        AddSectionCloseBtn.addEventListener('click' , this._CloseAddSection);
    }

    _AddTask = ()=> {
        try{
            const t = AddSectionTask_Title.value;
            const d = AddSectionTask_Desc.value;
            const st = AddSectionTask_StartTime.value;
            const et = AddSectionTask_EndTime.value;

            this._CreatTask(t,d,st,et);
            console.log(this.$TaskList);
            this._CloseAddSection();

        }catch(err){
            console.log(err.message);
        }
    }

    _CloseAddSection = ()=>{
        AddSectionTask_Title.value ="" ;
        AddSectionTask_Desc.value = "";
        AddSectionEvent_Title.value ="" ;
        AddSectionEvent_Desc.value = "";
        AddSection.style.display = "none";
        AddSectionTaskDiv.style.display = "none";
        AddSectionEventDiv.style.display = "none";
        AddSectionFooter.style.display = "none";
    }

    _AddTodo_Event = () =>{
        AddSectionEventDiv.style.display = "block";
        AddSectionFooter.style.display = "block";
        AddSectionTaskDiv.style.display = "none";

        AddSectionAddBtn.removeEventListener('click', this._AddEvent);
        AddSectionCloseBtn.removeEventListener('click', this._CloseAddSection);

        AddSectionAddBtn.addEventListener('click' , this._AddEvent);
        AddSectionCloseBtn.addEventListener('click' , this._CloseAddSection);
    }
    
    _AddEvent = ()=> {
        try{
            const t = AddSectionEvent_Title.value;
            const d = AddSectionEvent_Desc.value;
            const date = AddSectionEvent_Date.value;

            this._CreatEvent(t,d,date);
            console.log(this.$EventList);
            this._CloseAddSection();

        }catch(err){
            console.log(err.message);
        }
    }

    _AssignTaskID(Task){
        this.$LastTaskID++;
        return this.$LastTaskID;
    }

    _AssignEventID(Event){
        this.$LastEventID++;
        return this.$LastEventID;
    }

    _CreatTask(title="Undefined",desc="",start=moment().format("YYYYMMDD"),end=moment().format("YYYYMMDD")){
        const newTask = {
            id: this._AssignTaskID(this),
            type: "Task",
            title: title,
            descript: desc,
            Start: start,
            End: end
        };
        this.$TaskList.push(newTask);
    }

    _CreatEvent(title="Undefined",desc="",date=moment().format("YYYYMMDD"),dur=0){
        const newEvent = {
            id: this._AssignEventID(this),
            type: "Event",
            title: title,
            descript: desc,
            date: date,
            duration: dur
        };
        this.$EventList.push(newEvent);
    }

}

function Setup(){
    const app = new TodoAPP;
    AddBtn.addEventListener('click',app.AddToDo);

}