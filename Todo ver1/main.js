// =================   Go to Button    ===================

const GotoBtn = document.getElementById('GotoBtn');

// =================   Right Menu Section    ===================

const AddBtn = document.getElementById('AddTodo');
const DeleteBtn = document.getElementById('DeleteTodo');
const EditBtn = document.getElementById('EditTodo');
const SearchBtn = document.getElementById('SearchTodo');
const FilterBtn = document.getElementById('FilterTodo');
const TagsDiv = document.getElementById('tags');


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
const AddSectionEvent_DurDiv = document.getElementById('AddSectionEvent-Duration-options');

const AddSectionAddBtn = document.getElementById('AddSection-AddBtn');
const AddSectionCloseBtn = document.getElementById('AddSection-CloseBtn');


// =================   Search Section    ===================

const SearchSection = document.getElementById('SearchSection');
const SearchInput = document.getElementById('SearchInput');
const SearchSectionBtn = document.getElementById('SearchBtn');

// =================   Priorities    ===================

const LOW = 1;
const MEDIUM = 2;
const HIGH = 3;
const URGENT = 4;

// =================   Categories    ===================

const PERSONAL = 1;
const WORK = 2;
const EDUCATIONAL = 3;









// ======================    Todo Main Class    ======================

class TodoAPP{
    constructor(){
        this.$Activities = [];
        this.$LastID = 0;
        this.$SelectedItems = [];
        this.$filteredDate = null;
        this.$searchedItem = null;
        this.$itemsOnBoard = null;

        this.styler = new Styler();
        this._createDurOption();
        DeleteBtn.addEventListener('click' , this._DelteItems);
        SearchBtn.addEventListener('click',this.SearchSectionShow);
        

        setTimeout(() => {
            this.calendar = new Calendar(this);
            this.calendar.render();
            this.addClearFilterButton();
        }, 0);



        this.GotoTable();
    }

    _createDurOption = ()=>{
        let selectHour = document.createElement('select');
        selectHour.id='hours';
        for(let i =0;i<24;i++){
            let option = document.createElement('option');
            if(i%10 == i){
               option.value = `0${i}`;
               option.innerHTML = `0${i}`;
            }else{
                option.value = `${i}`;
                option.innerHTML = `${i}`;
            }
            selectHour.appendChild(option);
        }
        let selectMin = document.createElement('select');
        selectMin.id='minutes';
        for(let i=0;i<60;i+=10){
            let option = document.createElement('option');
            if(i == 0){
               option.value = `00`;
               option.innerHTML = `00`;
            }else{
                option.value = `${i}`;
                option.innerHTML = `${i}`;
            }
            selectMin.appendChild(option);
        }
        AddSectionEvent_DurDiv.appendChild(selectHour);
        AddSectionEvent_DurDiv.appendChild(selectMin);
    }

    updateCalendar() {
        if (this.calendar) {
            this.calendar.render();
        }
    }

    AddToDo = () =>{
        Overlay.style.display = "block";
        AddSection.style.display = "block";

        AddSectionTaskDiv.style.display = "block";
        this.styler._setBg(AddSectionTaskBtn,"#ffffff");

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

        this.styler._setBg(AddSectionTaskBtn,"#ffffff");
        this.styler._setBg(AddSectionEventBtn,"#F5CAC3");


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
            const p = this._GetPriorityTask();
            const c = this._GetCategoryTask();

            this._CreatTask(t,d,st,et,p,c);
            this._CloseAddSection();

        }catch(err){
            console.log(err.message);
        }
    }

    _AddTodo_Event = () =>{
        AddSectionEventDiv.style.display = "block";
        AddSectionFooter.style.display = "block";
        AddSectionTaskDiv.style.display = "none";

        this.styler._setBg(AddSectionEventBtn,"#ffffff");
        this.styler._setBg(AddSectionTaskBtn,"#F5CAC3");

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
            const dur = this._GetDuration();
            const p = this._GetPriorityEvent();
            const c = this._GetCategoryEvent();


            this._CreatEvent(t,d,date,dur,p,c);
            this._CloseAddSection();


        }catch(err){
            console.log(err.message);
        }
    }

    _GetDuration = () => {
        const hourSelect = document.getElementById('hours');
        const minSelect = document.getElementById('minutes');
        
        if (!hourSelect || !minSelect) {
            console.error('Duration selects not found');
            return 0;
        }
        
        const hours = parseInt(hourSelect.value) || 0;
        const minutes = parseInt(minSelect.value) || 0;

        return (hours * 60) + minutes;
    }

    _GetPriorityTask=()=>{
        const taskSelect = document.getElementById('TaskPriority');
        
        if (!taskSelect) {
            console.error('Priority not found');
            return 0;
        }
        switch(taskSelect.value){
            case "LOW": 
                return LOW;
            case "MEDIUM":
                return MEDIUM;
            case "HIGH":
                return HIGH;
            case "URGENT":
                return URGENT;
            default:
                return LOW;
        }

    }
    _GetPriorityEvent=()=>{
        const eventSelect = document.getElementById('EventPriority');
        
        if (!eventSelect) {
            console.error('Priority not found');
            return 0;
        }
        switch(eventSelect.value){
            case "LOW": 
                return LOW;
            case "MEDIUM":
                return MEDIUM;
            case "HIGH":
                return HIGH;
            case "URGENT":
                return URGENT;
            default:
                return LOW;
        }

    }
    _GetCategoryTask=()=>{
        const taskSelect = document.getElementById('TaskCategory');
        
        if (!taskSelect) {
            console.error('Category not found');
            return 0;
        }
        switch(taskSelect.value){
            case "PERSONAL": 
                return PERSONAL;
            case "WORK":
                return WORK;
            case "EDUCATIONAL":
                return EDUCATIONAL;
            default:
                return PERSONAL;
        }

    }
    _GetCategoryEvent=()=>{
        const eventSelect = document.getElementById('EventCategory');
        
        if (!eventSelect) {
            console.error('Category not found');
            return 0;
        }
        switch(eventSelect.value){
            case "PERSONAL": 
                return PERSONAL;
            case "WORK":
                return WORK;
            case "EDUCATIONAL":
                return EDUCATIONAL;
            default:
                return PERSONAL;
        }

    }
    _AssignID(){
        this.$LastID++;
        return this.$LastID;
    }

    _CreatTask(title="Undefined",desc="",start=moment().format("YYYYMMDD"),end=moment().format("YYYYMMDD"),priority=LOW,category=PERSONAL){
        const newTask = {
            id: this._AssignID(),
            type: "Task",
            title: title,
            descript: desc,
            Start: start,
            End: end,
            priority: priority,
            catagory: category
        };
        this.$Activities.push(newTask);
        this._ShowActivities();
        this.updateCalendar();
    }

    _CreatEvent(title="Undefined",desc="",date=moment().format("YYYYMMDD"),dur=0,priority=LOW,category=PERSONAL){
        const newEvent = {
            id: this._AssignID(),
            type: "Event",
            title: title,
            descript: desc,
            date: date,
            duration: dur,
            priority: priority,
            category: category
        };
        this.$Activities.push(newEvent);
        this._ShowActivities();
        this.updateCalendar();
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
        this.styler._setBg(AddSectionTaskBtn,"#ffffff");
        this.styler._setBg(AddSectionEventBtn,"#F5CAC3");
    }

    filterActivitiesByDate(date) {
        this.$filteredDate = date;
        this._ShowActivities();
    }

    _ShowActivities = ()=>{
        TaskEventTable_table.innerHTML = "";
        this._changeTableHeight();
        const table_wrapper = document.createElement('div');
        this.styler._setPadding(table_wrapper,"10px");

        const scrollWrapper = document.createElement('div');
        scrollWrapper.style.width = '100%';
        scrollWrapper.style.overflowX = 'auto';
        scrollWrapper.style.overflowY = 'visible';
        scrollWrapper.style.paddingBottom = '10px';
        scrollWrapper.style.position = 'relative';
        
        // Add scrollbar styling
        scrollWrapper.style.scrollbarWidth = 'thin';
        scrollWrapper.style.scrollbarColor = '#84A59D #f0f0f0';

        const table = document.createElement('table');
        this._CreateTableHeader(table, ["","Title" , "Date" ,"Description",'Priority','Catagory','Progress']);
        const tbody = document.createElement('tbody');

        this.$itemsOnBoard = this.__getSortedActivities(this.$Activities);

        if (this.$filteredDate) {
            this.$itemsOnBoard = this.$itemsOnBoard.filter(a => {
                if (a.type === 'Task') {
                    return moment(a.Start).isSame(this.$filteredDate, 'day');
                } else {
                    return moment(a.date).isSame(this.$filteredDate, 'day');
                }
            });
        }

        if(this.$searchedItem){
            let activities = this.$itemsOnBoard.filter(a => {
               return a.title.includes(this.$searchedItem) || a.descript.includes(this.$searchedItem)
            });
            if (activities.length == 0){
                window.alert('Nothing Found');
            }
            else{
                this.$itemsOnBoard = activities;
                this._createSearchTag();
            }
        }

        for (let a of this.$itemsOnBoard){
            let aTostr = this.__ActivityToString(a);
            const row = this._CreateTableBodyRows(tbody, aTostr , a.id);

            row.addEventListener('dblclick', () => {
                this._EditActivity(row, a);
            });
        }

        table.appendChild(tbody);
        this.styler.styleTable(table);

        scrollWrapper.appendChild(table);
        table_wrapper.appendChild(scrollWrapper);
        TaskEventTable_table.appendChild(table_wrapper);
    }

    _changeTableHeight(){
        if (this.$Activities.length < 4){
            this.styler._setHeight(TodoTable,"430px");
        }
        else if (this.$Activities.length >= 4 && this.$Activities.length < 9){
            this.styler._setHeight(TodoTable,"630px");
        }
        else{
            return;
        }
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

        const checkboxCol = document.createElement('td');
        this.__createCheckBox(checkboxCol, id);
        tr.appendChild(checkboxCol);

        for (let s of colValues){
            const col = document.createElement('td');
            col.textContent = s;
            tr.appendChild(col);
        }

        const priorityCol = document.createElement('td');
        this._showPriority(priorityCol, id);
        tr.appendChild(priorityCol);

        const categoryCol = document.createElement('td');
        this._showCategory(categoryCol, id);  
        tr.appendChild(categoryCol);

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

    _showPriority(tr,id){
        let item = this.$Activities.find(a => a.id == id);

        if (!item) {
            console.warn(`Activity with id ${id} not found`);
            return;
        }

        const priorityWrapper = document.createElement('div');
        const text = document.createElement('span');
        switch (item.priority){
            case LOW:
                text.textContent = "Low";
                this.styler._setColor(text,'#ffffff');
                break;
            case MEDIUM:
                this.styler._setColor(text,'#ffffff');
                text.textContent = "Medium";
                break;
            case HIGH:
                text.textContent = "High";
                this.styler._setColor(text,'#ffffff');
                break;
            case URGENT:
                text.textContent = "Urgent";
                this.styler._setColor(text,'#ffffff');
                break;
            default:
                text.textContent = "Low";
                break;
        }
        text.style.fontSize = "18px";
        this.styler._setFontFamily(text);
        this.styler._stylePriorityDiv(priorityWrapper,item.priority);
        priorityWrapper.appendChild(text);
        tr.appendChild(priorityWrapper);
    }

    _showCategory(tr,id){
        let item = this.$Activities.find(a => a.id == id);

        if (!item) {
            console.warn(`Activity with id ${id} not found`);
            return;
        }

        const categoryWrapper = document.createElement('div');
        const text = document.createElement('span');
        switch (item.category){
            case PERSONAL:
                text.textContent = "Personal";
                this.styler._setColor(text,'#f28482');
                break;
            case WORK:
                this.styler._setColor(text,'#84A59D');
                text.textContent = "Work";
                break;
            case EDUCATIONAL:
                text.textContent = "Educational";
                this.styler._setColor(text,'#f6bd60');
                break;
            default:
                text.textContent = "Personal";
                this.styler._setColor(text,'#f28482');
                break;
        }
        text.style.fontSize = "18px";
        this.styler._setFontFamily(text);
        this.styler._styleCategoryDiv(categoryWrapper,item.category);
        categoryWrapper.appendChild(text);
        tr.appendChild(categoryWrapper);
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

        this._DisableDeleteBtn();
    }
    _DisableDeleteBtn = () => {
        DeleteBtn.disabled = this.$SelectedItems.length === 0;
    }

    _DelteItems = () => {
        if (this.$SelectedItems.length === 0) {
            return;  // Just exit early, nothing to delete
        }
        if(window.confirm("Are you sure you want to delete items?")){
            this.$Activities = this.$Activities.filter ( a => {
                return !this.$SelectedItems.some(m => m == a.id);
            })
            this.$SelectedItems = [];
            this._DisableDeleteBtn();
            this._ShowActivities();
            this.updateCalendar();

        }
    }

    __getSortedActivities(list) {
        return [...list].sort((a, b) => {
            let timeA = a.type === 'Task' ? a.Start : a.date;
            let timeB = b.type === 'Task' ? b.Start : b.date;
            return new Date(timeA) - new Date(timeB);
        });
    }
    __ActivityToString(a){
        if(a.type == "Task"){
            const start = moment(a.Start).format('MMM DD, HH:mm');
            const end = moment(a.End).format('MMM DD, HH:mm');
            return [a.title , `${start} to ${end}` ,this._cutDescription(a.descript)];
        }
        else{
            const date = moment(a.date).format('MMM DD, HH:mm');
            const dur = this._durToString(a.duration);
            return [a.title , `${date} ${dur}` ,this._cutDescription(a.descript)];
        }
    }

    _durToString(dur){
        let mins = dur%60;
        let hours = Math.floor(dur/60);
        if (hours >0){
            return `for ${hours} hours and ${mins} minutes`;
        }else{
            return `for ${dur} minutes`;
            
        }
    }

    _cutDescription(desc){
        if(desc.length > 20){
            return `${desc.slice(0,19)} ...`
        }
        else return desc
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
        finally{
            this.updateCalendar();
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
        finally{
            this.updateCalendar();
        }
    }

    GotoTable = ()=>{
        GotoBtn.addEventListener('click',function(){
            TodoTable.scrollIntoView({behavior: "smooth",block: 'start'})
        });
    }

    SearchSectionShow = () => {
        Overlay.style.display="block";
        SearchSection.style.display = "block";

        SearchSectionBtn.removeEventListener('click',this.SearchTodos);
        SearchSectionBtn.addEventListener('click',this.SearchTodos);

        SearchInput.addEventListener('keypress',(event)=>{
            if (event.key === 'Enter') {
                this.SearchTodos();
            }
        });
    }
    SearchTodos=()=>{
        this.$searchedItem = SearchInput.value;
        this._ShowActivities();
        this._CloseSearch();
    }

    _createSearchTag = () => {
        const existingTag = document.getElementById('SearchTag');
        if (existingTag) {
            TagsDiv.removeChild(existingTag);
        }

        const tagWrapper = document.createElement('div');
        tagWrapper.id = 'SearchTag';
        const tagName = document.createElement('span');
        tagName.textContent = this.$searchedItem;
        tagName.style.color = "#84A59D";
        tagName.style.fontWeight = '400';
        const clear = document.createElement('button');
        clear.innerHTML = '<i class="fa-solid fa-xmark"></i>';

        clear.removeEventListener('click',this._clearSearchTag);
        clear.addEventListener('click',this._clearSearchTag);

        this.styler._setFontFamily(tagName,'DynaPuff');
        this.styler._styleTagDiv(tagWrapper);
        this.styler._styleClearTagBtn(clear);

        tagWrapper.appendChild(tagName);
        tagWrapper.appendChild(clear);
        TagsDiv.appendChild(tagWrapper);
        
    }

    _clearSearchTag = ()=> {
        this.$searchedItem = null;
        let st = document.getElementById('SearchTag');
        st.remove();
        this._ShowActivities();
    }

    _CloseSearch(){
        SearchInput.value="";
        SearchSection.style.display='none';
        Overlay.style.display='none';
    }
}

function Setup(){
    const app = new TodoAPP;
    AddBtn.addEventListener('click',app.AddToDo);
    Overlay.addEventListener('click', function(e) {
        if (e.target === this) { 
            app._CloseAddSection();
            app._CloseSearch();
        }
    });
    app._ShowActivities();
    

}