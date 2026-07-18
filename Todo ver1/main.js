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
        this.$LastID = 0;
        this.$SelectedItems = [];
        this.$filteredDate = null;

        this.styler = new Styler();
        DeleteBtn.addEventListener('click' , this._DelteItems);

        setTimeout(() => {
            this.calendar = new Calendar(this);
            this.calendar.render();
            this.addClearFilterButton();
        }, 0);
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


        AddSectionAddBtn.removeEventListener('click', this._AddTask);
        AddSectionAddBtn.removeEventListener('click', this._AddEvent);
        AddSectionTaskBtn.removeEventListener('click', this._AddTodo_Task);
        AddSectionEventBtn.removeEventListener('click', this._AddTodo_Event);
        AddSectionCloseBtn.removeEventListener('click', this._CloseAddSection);

        AddSectionCloseBtn.addEventListener('click', this._CloseAddSection);
        AddSectionTaskBtn.addEventListener('click', this._AddTodo_Task);
        AddSectionEventBtn.addEventListener('click', this._AddTodo_Event);

        AddSectionAddBtn.addEventListener('click', this._AddTask);
    }
    _AddTodo_Task = () =>{
        AddSectionTaskDiv.style.display = "block";
        AddSectionFooter.style.display = "block";
        AddSectionEventDiv.style.display = "none";

        const now = moment().format('YYYY-MM-DDTHH:mm');
        AddSectionTask_StartTime.value = now;
        AddSectionTask_EndTime.value = now;

        AddSectionAddBtn.removeEventListener('click', this._AddEvent);
        AddSectionAddBtn.removeEventListener('click', this._AddTask);
        AddSectionAddBtn.addEventListener('click', this._AddTask);
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

        AddSectionAddBtn.removeEventListener('click', this._AddTask);
        AddSectionAddBtn.removeEventListener('click', this._AddEvent);
        AddSectionAddBtn.addEventListener('click', this._AddEvent);
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

    _AssignID(){
        this.$LastID++;
        return this.$LastID;
    }

    _CreatTask(title="Undefined",desc="",start=moment().format("YYYYMMDD"),end=moment().format("YYYYMMDD")){
        const newTask = {
            id: this._AssignID(),
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
            id: this._AssignID(),
            type: "Event",
            title: title,
            descript: desc,
            date: date,
            duration: dur
        };
        this.$Activities.push(newEvent);
        this._ShowActivities();
    }

    filterActivitiesByDate(date) {
        this.$filteredDate = date;
        this._ShowActivities();
    }

    _ShowActivities = ()=>{
        TaskEventTable_table.innerHTML = "";

        const table = document.createElement('table');
        this._CreateTableHeader(table, ["","Title" , "Date" ,"Description"])
        const tbody = document.createElement('tbody');

        const activities = this.__getSortedActivities();

        if (this.$filteredDate) {
            activities = activities.filter(a => {
                if (a.type === 'Task') {
                    return moment(a.Start).isSame(this.$filteredDate, 'day');
                } else {
                    return moment(a.date).isSame(this.$filteredDate, 'day');
                }
            });
        }

        for (let a of activities){
            let aTostr = this.__ActivityToString(a);
            const row = this._CreateTableBodyRows(tbody, aTostr , a.id);

            row.addEventListener('dblclick', () => {
                this._EditActivity(row, a);
            });
        }

        table.appendChild(tbody);
        this.styler.styleTable(table);
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

    _CreateTableBodyRows(obj,colValues,id){
        const tr = document.createElement('tr');
        this.__createCheckBox(tr,id);

        for (let s of colValues){
            const col = document.createElement('td');
            col.textContent = s;
            tr.appendChild(col);
        }
        obj.appendChild(tr);
        return tr;
    }

    __createCheckBox(obj,id){
        const cb = document.createElement('input');
        cb.type = "checkbox";
        cb.id = id;

        cb.addEventListener('change', () => {
            this._UpdateSelectedItems(cb.id);
        });

        obj.appendChild(cb);
    }

    addClearFilterButton() {
        const clearBtn = document.createElement('button');
        clearBtn.textContent = 'Show All';
        clearBtn.className = 'clear-filter-btn';
        clearBtn.addEventListener('click', () => {
            this.calendar.clearFilter();
            this.$filteredDate = null;
            this._ShowActivities();
        });
        
        const leftMenu = document.getElementById('LeftMenu');
        const oldBtn = leftMenu.querySelector('.clear-filter-btn');
        if (oldBtn) oldBtn.remove();
        leftMenu.appendChild(clearBtn);
    }

    _UpdateSelectedItems = (id) => {
        if(this.$SelectedItems.some(a => a == id)){
            this.$SelectedItems = this.$SelectedItems.filter(a => a != id);
        }
        else{
            this.$SelectedItems.push(id);
        }

        this._ShowDeleteBtn();
    }
    _ShowDeleteBtn = () => {
        if (this.$SelectedItems.length ==0){
            DeleteBtn.style.display = "none";

            DeleteBtn.removeEventListener('click' , this._DelteItems);
        }
        else{
            DeleteBtn.style.display = "block";
            DeleteBtn.addEventListener('click' , this._DelteItems);
        }
    }

    _DelteItems = () => {
        if(window.confirm("Are you sure you want to delete items?")){
            this.$Activities = this.$Activities.filter ( a => {
                return !this.$SelectedItems.some(m => m == a.id);
            })
            this.$SelectedItems = [];
            this._ShowDeleteBtn();
            this._ShowActivities();
        }
    }

    __getSortedActivities() {
        return [...this.$Activities].sort((a, b) => {
            let timeA = a.type === 'Task' ? a.Start : a.date;
            let timeB = b.type === 'Task' ? b.Start : b.date;
            return new Date(timeA) - new Date(timeB);
        });
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

    _EditActivity = (row, activity) => {
        Overlay.style.display = "block";
        AddSection.style.display = "block";
        AddSectionFooter.style.display = "block";

        if (activity.type === "Task") {
            AddSectionTaskDiv.style.display = "block";
            AddSectionEventDiv.style.display = "none";

            AddSectionTask_Title.value = activity.title;
            AddSectionTask_Desc.value = activity.descript;
            AddSectionTask_StartTime.value = moment(activity.Start).format('YYYY-MM-DDTHH:mm');
            AddSectionTask_EndTime.value = moment(activity.End).format('YYYY-MM-DDTHH:mm');
            
            AddSectionAddBtn.textContent = "Update";

            AddSectionAddBtn.removeEventListener('click', this._AddTask);
            AddSectionAddBtn.removeEventListener('click', this._AddEvent);
            AddSectionAddBtn.removeEventListener('click', this._UpdateTask);
            AddSectionAddBtn.addEventListener('click', () => this._UpdateTask(activity.id));
            
        } else {
            AddSectionEventDiv.style.display = "block";
            AddSectionTaskDiv.style.display = "none";

            AddSectionEvent_Title.value = activity.title;
            AddSectionEvent_Desc.value = activity.descript;
            AddSectionEvent_Date.value = moment(activity.date).format('YYYY-MM-DDTHH:mm');
        
            AddSectionAddBtn.textContent = "Update";

            AddSectionAddBtn.removeEventListener('click', this._AddTask);
            AddSectionAddBtn.removeEventListener('click', this._AddEvent);
            AddSectionAddBtn.removeEventListener('click', this._UpdateEvent);
            AddSectionAddBtn.addEventListener('click', () => this._UpdateEvent(activity.id));
        }

        AddSectionTaskBtn.removeEventListener('click', this._AddTodo_Task);
        AddSectionEventBtn.removeEventListener('click', this._AddTodo_Event);
        AddSectionTaskBtn.addEventListener('click', this._AddTodo_Task);
        AddSectionEventBtn.addEventListener('click', this._AddTodo_Event);

        AddSectionCloseBtn.removeEventListener('click', this._CloseAddSection);
        AddSectionCloseBtn.addEventListener('click', () => {
            AddSectionAddBtn.textContent = "Add";
            this._CloseAddSection();
        });
    }

    _UpdateTask = (id) => {
        try {
            const t = AddSectionTask_Title.value;
            const d = AddSectionTask_Desc.value;
            const st = AddSectionTask_StartTime.value;
            const et = AddSectionTask_EndTime.value;

            const index = this.$Activities.findIndex(a => a.id === id && a.type === "Task");
            if (index !== -1) {
                this.$Activities[index].title = t;
                this.$Activities[index].descript = d;
                this.$Activities[index].Start = st;
                this.$Activities[index].End = et;
            }
            
            AddSectionAddBtn.textContent = "Add";
            this._CloseAddSection();
            this._ShowActivities();
            
        } catch(err) {
            console.log(err.message);
        }
    }
    _UpdateEvent = (id) => {
        try {
            const t = AddSectionEvent_Title.value;
            const d = AddSectionEvent_Desc.value;
            const date = AddSectionEvent_Date.value;

            const index = this.$Activities.findIndex(a => a.id === id && a.type === "Event");
            if (index !== -1) {
                this.$Activities[index].title = t;
                this.$Activities[index].descript = d;
                this.$Activities[index].date = date;
            }
            
            AddSectionAddBtn.textContent = "Add";
            this._CloseAddSection();
            this._ShowActivities();
            
        } catch(err) {
            console.log(err.message);
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