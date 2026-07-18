class Calender{
    constructor(app){
        this.app = app
        this.currentDate = moment();
        this.CalendarContainer = document.getElementById('LeftMenu');
    }
    render(){
        this.CalendarContainer.innerHTML = "";
    }

    _createHeader(){
        const header = document.createElement('div');
        header.className = "Calendar-header";

        const monthYear = document.createElement('span');
        monthYear.className = 'calendar-month-year';
        monthYear.textContent = this.currentDate.format('MMMM YYYY');
        
        const navButtons = document.createElement('div');
        navButtons.className = 'calendar-nav-buttons';
        
        const prevBtn = document.createElement('button');
        prevBtn.textContent = '◀';
        prevBtn.className = 'calendar-nav-btn';
        prevBtn.addEventListener('click', () => {
            this.currentDate.subtract(1, 'month');
            this.render();
        });
        const nextBtn = document.createElement('button');
        nextBtn.textContent = '▶';
        nextBtn.className = 'calendar-nav-btn';
        nextBtn.addEventListener('click', () => {
            this.currentDate.add(1, 'month');
            this.render();
        });
        
        navButtons.appendChild(prevBtn);
        navButtons.appendChild(nextBtn);
        
        header.appendChild(monthYear);
        header.appendChild(navButtons);
        
        return header;
    }

    _createGrid(){

    }

}