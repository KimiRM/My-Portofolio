const SaveFormDiv = document.getElementById('SaveFormDiv');
SaveFormDiv.style.display = "none";
const EditFormDiv = document.getElementById('EditFormDiv');
EditFormDiv.style.display = "none";
const Board = document.getElementById('Board');

const SaveFormSubmit = document.getElementById('SaveFormSubmit');
const SaveCardTitle = document.getElementById('SaveCardTitle');
const SaveCardDescription = document.getElementById('SaveCardDescription');
const SaveFormClose = document.getElementById('SaveFormClose');
const SaveForm = document.getElementById('SaveForm');

const EditFormSubmit = document.getElementById('EditFormSubmit');
const EditCardTitle = document.getElementById('EditCardTitle');
const EditCardDescription = document.getElementById('EditCardDescription');
const EditFormClose = document.getElementById('EditFormClose');
const EditForm = document.getElementById('EditForm');


const SaveNewItem = document.getElementById('SaveNewItem');
const ShowAll = document.getElementById('ShowAll');
const DeleteItem = document.getElementById('DeleteItem');
const HideItems = document.getElementById('HideItems');

const ViewDiv = document.getElementById('ViewDiv');
ViewDiv.style.display = "none";
const ViewCardTitle = document.getElementById('ViewCardTitle');
const ViewCardDescription = document.getElementById('ViewCardDescription');
const ViewDivClose = document.getElementById('ViewDivClose');



class MemoryCard{
    $list=[];
    $errorElement = null;
    $BoardOn = false;
    $editingCard = null;
    $selectedCards= [];
    $cardindex = 0;
    $selectionMode = false;

    
    SaveItem = () => {
        SaveFormDiv.style.display = "block";

        SaveFormSubmit.removeEventListener('click', this._saveCard);
        SaveFormClose.removeEventListener('click', this._closeSaveForm);

        SaveFormSubmit.addEventListener('click' , this._saveCard);
        SaveFormClose.addEventListener('click' , this._closeSaveForm);
    }
    _saveCard =(e) => {
        e.preventDefault();
        try{
            const t = SaveCardTitle.value;
            const d = SaveCardDescription.value;
            if(!this._checkFormat(t,true) && !this._checkFormat(d,false)) return err;
            
            let card = {
                Title: t,
                Description: d ,
                id : `card_${this.$cardindex}`
            };
            this.$cardindex++;
            if(this._checkIfExists(card)) return err;

            this.$list.push(card);
            if(this.$BoardOn) this.showItems();
            SaveFormDiv.style.display = "none";
        }catch(err){
            console.log(err.message
            );
            this._showError(err.message);
        }finally{
            for (let x of this.$list){
                console.log(`title : ${x.Title}\ndescription : ${x.Description}\n---------------------------`)
            }
            SaveCardTitle.value ="";
            SaveCardDescription.value ="";
        }

    }
    _closeSaveForm = () => {
        SaveCardTitle.value ="";
        SaveCardDescription.value ="";
        SaveFormDiv.style.display = "none";
        if(this.errorElement) {
            this.errorElement.remove();
            this.errorElement = null;
        }
    }
    showItems = () =>{
        this.$BoardOn = true;
        Board.style.display ="flex";
        Board.innerHTML = '';
        for (let x of this.$list){
            let div = document.createElement('div');

            div.setAttribute('id',x.id);
            let t = document.createElement('h3');
            t.innerHTML = x.Title;
            let d = document.createElement('p');
            let shortDescription = x.Description.length > 10 
            ? x.Description.substring(0, 10) + '...' 
            : x.Description;
            d.innerHTML = shortDescription;


            let bEdit=document.createElement("button");
            bEdit.setAttribute('name','Edit');
            bEdit.textContent = "Edit";
            bEdit.addEventListener('click' ,() => this.editItem(x));

            let bViewDetail=document.createElement("button");
            bViewDetail.setAttribute('name','View Detail');
            bViewDetail.textContent = "View Details";
            bViewDetail.addEventListener('click' ,() => this.ViewDetail(x)
            );

            let checkBox = document.createElement('input');
            checkBox.setAttribute('type','checkbox');
            checkBox.setAttribute('id',`selectCard_${x.id.split('_')[1]}`);
            checkBox.disabled = true;

            this._setStyle_text(t,d);
            this._setStyle_btns(bEdit,bViewDetail);
            this._setStyle_checkBox(checkBox);
            this._setStyle_div(div);

            div.appendChild(checkBox);
            div.appendChild(t);
            div.appendChild(d);
            div.appendChild(bEdit);
            div.appendChild(bViewDetail);
            
            Board.appendChild(div);
        }
    }
    _setStyle_div(d){
        d.style.position = "relative";
        d.style.backgroundColor  = "rgb(239, 239, 239)";
        d.style.borderRadius  = "5px";
        d.style.border = "none";
    }
    _setStyle_checkBox(cb){
        cb.style.accentColor = "black";
        cb.style.position = "absolute";
        cb.style.top = "10px";
        cb.style.right = "10px";
        cb.style.width = "18px";
        cb.style.height = "18px";
        cb.style.boxShadow = "none";
        cb.style.outline = "none";
        cb.style.border = "1px solid black";
        cb.style.borderRadius = "2px";
        cb.style.backgroundColor = "white";
    }
    _setStyle_text(...args){
        for (let item of args){
            item.style.color = "black";
            item.style.marginLeft = "10px";
        }
        args[0].style.fontSize = "22px";
        args[1].style.fontSize = "20px";
    }
    _setStyle_btns(...args){
        for (let item of args){
            item.style.border = "1px solid black";
            item.style.fontSize = "16px";
            item.style.borderRadius  = "5px";
            item.style.backgroundColor  = "transparent";
            item.style.color = "black";
            item.style.margin = "10px";
            item.addEventListener('mouseenter', () => {
            item.style.border = "1px solid red";
            item.style.color = "red";
            item.style.transition = "300ms";
        });
        item.addEventListener('mouseleave', () => {
            item.style.border = "1px solid black";
            item.style.color = "black";
        });
        }
    }

    ViewDetail(card){
        ViewDiv.style.display = "flex";
        ViewCardDescription.textContent = card.Description;
        ViewCardTitle.textContent = card.Title;

        ViewDivClose.removeEventListener('click' , this._closeView);
        ViewDivClose.addEventListener('click' , this._closeView);
    }
    _closeView(){
        ViewCardTitle.value = "";
        ViewCardDescription.value = "";
        ViewDiv.style.display = "none";
    }
    editItem = (card) =>{
        this.$editingCard = card;
    
        EditFormDiv.style.display = "flex";
        EditCardTitle.value = card.Title;
        EditCardDescription.value = card.Description;

        EditFormSubmit.removeEventListener('click', this._editForm);
        EditFormClose.removeEventListener('click', this._closeEditForm);
        
        EditFormSubmit.addEventListener('click', this._editForm);
        EditFormClose.addEventListener('click', this._closeEditForm);
        
    }
    _editForm = (e) =>{
        console.log("entered edit form");
        e.preventDefault();
        try{
            let new_t = EditCardTitle.value;
            let new_d = EditCardDescription.value;
            if(!this._checkFormat(new_t,true) || !this._checkFormat(new_d,false)) return err;
            if (!this.$editingCard) return err;
            this.$editingCard.Title = new_t;
            this.$editingCard.Description = new_d;
            console.log("captured new items");
            this._closeEditForm();
            if(this.$BoardOn) this.showItems();

        }catch(err){
            console.log(err.message);
        }
    }
    _closeEditForm = () =>{
        EditCardTitle.value = "";
        EditCardDescription.value = "";
        EditFormDiv.style.display = "none";

        if (this.editErrorElement) {
            this.editErrorElement.remove();
            this.editErrorElement = null;
        }
    }
    DeleteItem = () => {
        if(!this.$selectionMode){
            DeleteItem.textContent = "Delete Selected";
            this._selectItem();
            DeleteItem.style.backgroundColor = "red";
            DeleteItem.style.border = "1px solid red";
            DeleteItem.style.color = "black";
            DeleteItem.addEventListener('mouseenter', () => {
                DeleteItem.style.border = "1px solid white";
                DeleteItem.style.color = "white";
                DeleteItem.style.transition = "300ms";
            });
            DeleteItem.addEventListener('mouseleave', () => {
                DeleteItem.style.border = "1px solid red";
                DeleteItem.style.color = "black";
            });
            this.$selectionMode = true;
        }
        else{
            this._removeFromList();
            DeleteItem.textContent = "Delete Item";
            DeleteItem.style.color = "white";
            DeleteItem.style.backgroundColor = "transparent";
            DeleteItem.style.border = "1px solid white";
            DeleteItem.addEventListener('mouseenter', () => {
                DeleteItem.style.border = "1px solid red";
                DeleteItem.style.color = "red";
                DeleteItem.style.transition = "300ms";
            });
            DeleteItem.addEventListener('mouseleave', () => {
                DeleteItem.style.border = "1px solid white";
                DeleteItem.style.color = "white";
            });
            this.$selectionMode = false;
        }
    }

    _selectItem(){
        if(!this.$BoardOn){
            this.showItems();
        }
            this.$selectedCards = [];

            const allCheckboxes = Board.querySelectorAll('input[type="checkbox"]');
            allCheckboxes.forEach(checkbox => {

            checkbox.disabled = false;
            checkbox.style.opacity = "1";
            checkbox.style.visibility = "visible";

            const newCheckbox = checkbox.cloneNode(true);
            checkbox.parentNode.replaceChild(newCheckbox, checkbox);

            const id = checkbox.id;
            const card_num = id.split('_')[1];
            newCheckbox.addEventListener('change' ,(e) => {
                if(e.target.checked){
                    this.$selectedCards.push(`card_${card_num}`);
                    console.log("selectedCards : " ,this.$selectedCards);
                }else{
                    const index = this.$selectedCards.indexOf(`card_${card_num}`);
                    if(index > -1) {
                        this.$selectedCards.splice(index, 1);
                        console.log(`Deselected: card_${card_num}`);
                     }
                }
            });
            });
        
    }
    _removeFromList(){
        
        if (!this.$selectedCards || this.$selectedCards.length === 0) {
            alert("Please select items to delete first");
            return;
        }
        
        if(window.confirm("Are you sure you want to delete?")){
                this.$list = this.$list.filter( (card) => {
                    return !this.$selectedCards.includes(card.id)
                });
            }
        this.$selectedCards = [];
        this._uncheckCheckBox();
        
        if (this.$BoardOn) this.showItems();
        if(this.$list.length == 0) this.$BoardOn = false;
    }
    _uncheckCheckBox(){
        const allCheckboxes = Board.querySelectorAll('input[type="checkbox"]');
            allCheckboxes.forEach(checkbox => {
            checkbox.disabled = false;
            checkbox.removeEventListener('change',()=>this.$selectedCards = []);
        });
    }

    HideItem =()=>{
        const allCheckboxes = Board.querySelectorAll('input[type="checkbox"]');
            allCheckboxes.forEach(checkbox => {
            checkbox.disabled = false;
            checkbox.removeEventListener('change',()=>this.$selectedCards = []);
        });
        Board.style.display = "none";
        this.$BoardOn = false;
    }

    
    _showError(message) {
        this.errorElement = document.createElement('p');
        this.errorElement.innerHTML = message;
        this.errorElement.style.color = "red";
        this.errorElement.style.margin = "0";
        this.errorElement.style.padding = "5px";
        SaveForm.appendChild(this.errorElement);
    }

    _checkFormat(s,isTitle){
        if (isTitle && !/^\S/.test(s)) {
            console.log("Title cannot start with a space");
            return false;
        }
        
        if (isTitle && !s) {
            console.log("Title is required");
            return false;
        }
        
        return true;
    }
    _checkIfExists(card){
        let isExisting = false;
        this.$list.some(c => {
            if(card.Title == c.Title) isExisting= true;
        })
        if(isExisting) return true;
        return false;
    }
}


function SetUp(){
    const Mc =new MemoryCard;
    SaveNewItem.addEventListener('click' , Mc.SaveItem);
    DeleteItem.addEventListener('click' , Mc.DeleteItem);
    ShowAll.addEventListener('click' , Mc.showItems);
    HideItems.addEventListener('click' , Mc.HideItem);
}