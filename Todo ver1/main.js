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

const AddSectionEvent_Title = document.getElementById('AddSectionEvent-TitleInput');
const AddSectionEvent_Desc = document.getElementById('AddSectionEvent-DescInput');

const AddSectionAddBtn = document.getElementById('AddSection-AddBtn');
const AddSectionCloseBtn = document.getElementById('AddSection-CloseBtn');



class TodoAPP{
    constructor(){
        this.$TaskList = [];
        this.$EventList = [];
        this.$LastTaskID = 0;
        this.$LastEventID = 0;
    }

    AddToDo = () =>{
        AddSection.style.display = "block";

        AddSectionTaskBtn.removeEventListener('click' , this._AddTodo_Task);

        AddSectionTaskBtn.addEventListener('click' , this._AddTodo_Task);
        
    }
    _AddTodo_Task = () =>{
        AddSectionTaskDiv.style.display = "block";
        AddSectionFooter.style.display = "block";

        AddSectionAddBtn.removeEventListener('click', this._AddTask);
        AddSectionCloseBtn.removeEventListener('click', this._CloseAddSection);

        AddSectionAddBtn.addEventListener('click' , this._AddTask);
        AddSectionCloseBtn.addEventListener('click' , this._CloseAddSection);
    }

    _AddTask = ()=> {
        try{
            const t = AddSectionTask_Title.value;
            const d = AddSectionTask_Desc.value;

            this._CreatTask(t,d);
            console.log(this.$TaskList);
            this._CloseAddSection();

        }catch(err){
            console.log(err.message);
        }
    }

    _CloseAddSection = ()=>{
        AddSectionTask_Title.value ="" ;
        AddSectionTask_Desc.value = "";
        AddSection.style.display = "none";
        AddSectionTaskDiv.style.display = "none";
    }

    _AddTodo_Event = () =>{
        AddSectionEventDiv.style.display = "block";
        AddSectionFooter.style.display = "block";

        AddSectionAddBtn.removeEventListener('click', this._AddEvent);
        AddSectionCloseBtn.removeEventListener('click', this._CloseAddSection);

        AddSectionAddBtn.addEventListener('click' , this._AddEvent);
        AddSectionCloseBtn.addEventListener('click' , this._CloseAddSection);
    }
    
    _AddEvent = ()=> {
        try{
            const t = AddSectionEvent_Title.value;
            const d = AddSectionEvent_Desc.value;

            this._CreatEvent(t,d);
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