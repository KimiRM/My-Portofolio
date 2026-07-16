const AddBtn = document.getElementById('AddTodo');
const DeleteBtn = document.getElementById('DeleteTodo');
const EditBtn = document.getElementById('EditTodo');

// =================   Table Section    ===================

const TaskEventTable = document.getElementById('TaskEventTable');
const TaskEventTable_table = document.getElementById('TaskEventTable-table');
const TodoTable = document.getElementById('TodoTable');
const TableRightMenu = document.getElementById('RightMenu');
const TableLeftMenu = document.getElementById('LeftMenu');

// =================   OverLay Section    ===================
const Overlay = document.getElementById('Overlay');

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






// ======================    Todo Main Class    ======================

class TodoAPP{
    constructor(){
        this.$Activities = [];
        this.$LastTaskID = 0;
        this.$LastEventID = 0;

        const styler = Styler();
    }

    //  ==================     Add Task/Event     ==================
    AddToDo = () =>{
        Overlay.style.display = "block";
        AddSection.style.display = "block";

        AddSectionTaskDiv.style.display = "block";
        AddSectionEventDiv.style.display = "none";
        AddSectionFooter.style.display = "block";

        const now = moment().format('YYYY-MM-DDTHH:mm');
        AddSectionTask_StartTime.value = now;
        AddSectionTask_EndTime.value = now;
        AddSectionEvent_Date.value = now;


        AddSectionTaskBtn.removeEventListener('click' , this._AddTodo_Task);
        AddSectionEventBtn.removeEventListener('click' , this._AddTodo_Event);

        AddSectionCloseBtn.removeEventListener('click', this._CloseAddSection);
        AddSectionCloseBtn.addEventListener('click' , this._CloseAddSection);

        AddSectionTaskBtn.addEventListener('click' , this._AddTodo_Task);
        AddSectionEventBtn.addEventListener('click' , this._AddTodo_Event);

        
    }
    _AddTodo_Task = () =>{
        AddSectionTaskDiv.style.display = "block";
        AddSectionFooter.style.display = "block";
        AddSectionEventDiv.style.display = "none";

        const now = moment().format('YYYY-MM-DDTHH:mm');
        AddSectionTask_StartTime.value = now;
        AddSectionTask_EndTime.value = now;

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
        Overlay.style.display = "none";
        AddSection.style.display = "none";
        AddSectionTaskDiv.style.display = "none";
        AddSectionEventDiv.style.display = "none";
        AddSectionFooter.style.display = "none";
    }

    _AddTodo_Event = () =>{
        AddSectionEventDiv.style.display = "block";
        AddSectionFooter.style.display = "block";
        AddSectionTaskDiv.style.display = "none";

        const now = moment().format('YYYY-MM-DDTHH:mm');
        AddSectionEvent_Date.value = now;

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
            console.log(this.$Activities);
            this._CloseAddSection();


        }catch(err){
            console.log(err.message);
        }
    }

    _AssignTaskID(){
        this.$LastTaskID++;
        return this.$LastTaskID;
    }

    _AssignEventID(){
        this.$LastEventID++;
        return this.$LastEventID;
    }

    _CreatTask(title="Undefined",desc="",start=moment().format("YYYYMMDD"),end=moment().format("YYYYMMDD")){
        const newTask = {
            id: this._AssignTaskID(),
            type: "Task",
            title: title,
            descript: desc,
            Start: start,
            End: end
        };
        this.$Activities.push(newTask);
        this._ShowActivities();
    }

    _CreatEvent(title="Undefined",desc="",date=moment().format("YYYYMMDD"),dur=0){
        const newEvent = {
            id: this._AssignEventID(),
            type: "Event",
            title: title,
            descript: desc,
            date: date,
            duration: dur
        };
        this.$Activities.push(newEvent);
        this._ShowActivities();
    }

    _ShowActivities = ()=>{
        TaskEventTable_table.innerHTML = "";

        const table = document.createElement('table');
        this._CreateTableHeader(table, ["","Title" , "Date" ,"Description"])
        const tbody = document.createElement('tbody');

        const activities = this.__getSortedActivities();
        for (let a of activities){
            let aTostr = this.__ActivityToString(a);
            this._CreateTableBodyRows(tbody ,aTostr);
        }
        table.appendChild(tbody);
        TaskEventTable_table.appendChild(table);
    }
    _CreateTableHeader(obj,colNames){
        const thead = document.createElement('thead');
        const tr = document.createElement('tr');

        for(let s of colNames) {
            const col = document.createElement('th');
            col.textContent = s;
            tr.appendChild(col);
        }
        thead.appendChild(tr);
        obj.appendChild(thead);
    }

    _CreateTableBodyRows(obj,colValues){
        const tr = document.createElement('tr');
        console.log('input : ',colValues);
        for (let s of colValues){
            const col = document.createElement('td');
            col.textContent = s;
            tr.appendChild(col);
        }
        obj.appendChild(tr);
    }

    __getSortedActivities() {
        return [...this.$Activities].sort((a, b) => a.sortTime - b.sortTime);
    }

    __ActivityToString(a){
        if(a.type == "Task"){
            const start = moment(a.Start).format('MMM DD, HH:mm');
            const end = moment(a.End).format('MMM DD, HH:mm');
            return [a.title , `Start: ${start}    End: ${end}` ,a.descript];
        }
        else{
            const date = moment(a.date).format('MMM DD, HH:mm');
            return [a.title , `${date}` ,a.descript];
        }
    }
}

function Setup(){
    const app = new TodoAPP;
    AddBtn.addEventListener('click',app.AddToDo);
    Overlay.addEventListener('click', function(e) {
        if (e.target === this) { // Only close if clicking the overlay itself
            app._CloseAddSection();
        }
    });
    app._ShowActivities();

}