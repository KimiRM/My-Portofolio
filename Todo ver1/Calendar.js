class Calendar{
    constructor(app){
        this.app = app
        this.currentDate = moment();
        this.CalendarContainer = document.getElementById('LeftMenu');
        this.styler = new Styler();
    }
    render(){
        this.CalendarContainer.innerHTML = "";

        if (this.selectedDate) {
        const preview = this._createDayPreview(this.selectedDate);
        this.CalendarContainer.appendChild(preview);
        return; // Exit early, don't render calendar
    }
        
        // Create calendar wrapper
        const calendarWrapper = document.createElement('div');
        calendarWrapper.className = 'calendar-wrapper';
        
        // Create header with navigation
        const header = this._createHeader();
        calendarWrapper.appendChild(header);
        
        // Create grid
        const grid = this._createGrid();
        calendarWrapper.appendChild(grid);
        
        // Add legend
        const legend = this._createLegend();
        calendarWrapper.appendChild(legend);
        
        this.CalendarContainer.appendChild(calendarWrapper);
    }

    _createHeader(){
        const header = document.createElement('div');
        header.className = "Calendar-header";
        this.styler._setWidth(header);
        this.styler._setDisplayFlex(header,"row","center","center","45px");

        const monthYear = document.createElement('span');
        monthYear.className = 'calendar-month-year';
        monthYear.textContent = this.currentDate.format('MMMM YYYY');
        
        const prevBtn = document.createElement('button');
        prevBtn.className = 'fas fa-chevron-left';
        prevBtn.addEventListener('click', () => {
            this.currentDate.subtract(1, 'month');
            this.render();
        });
        const nextBtn = document.createElement('button');
        nextBtn.className = 'fas fa-chevron-right';
        nextBtn.addEventListener('click', () => {
            this.currentDate.add(1, 'month');
            this.render();
        });
        this.styler._setBg(prevBtn,"#F6BD60");
        this.styler._setBg(nextBtn,"#F6BD60");
        
        this.styler._setBorder(nextBtn,"0px","black","solid");
        this.styler._setBorder(prevBtn,"0px","black","solid");
        this.styler._setBorderRaidus(nextBtn,"5px");
        this.styler._setBorderRaidus(prevBtn,"5px");

        nextBtn.style.padding = "10px";
        nextBtn.style.width="40px";
        nextBtn.style.height="40px";
        prevBtn.style.padding = "10px";
        prevBtn.style.width="40px";
        prevBtn.style.height="40px";

        

        header.appendChild(prevBtn);
        
        header.appendChild(monthYear);
        header.appendChild(nextBtn);
        
        return header;
    }

    _createGrid(){
        const grid = document.createElement('div');
        grid.className = 'calendar-grid';
        
        // Day names
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        daysOfWeek.forEach(day => {
            const dayName = document.createElement('div');
            dayName.className = 'calendar-day-name';
            dayName.textContent = day;
            grid.appendChild(dayName);
        });
        
        // Get first day of month and number of days
        const firstDay = this.currentDate.clone().startOf('month').day();
        const daysInMonth = this.currentDate.daysInMonth();
        const today = moment();
        
        // Empty days before first day of month
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            grid.appendChild(emptyDay);
        }
        
        // Days of month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement('div');
            this.styler._setBorder(dayCell);
            dayCell.className = 'calendar-day';
            dayCell.textContent = day;
            
            const dateObj = this.currentDate.clone().date(day);
            
            // Check if today
            if (dateObj.isSame(today, 'day')) {
                dayCell.classList.add('today');
                this.styler._setBg(dayCell,"#84A59D");
            }
            
            // Check if has activities
            if (this._hasActivities(dateObj)) {
                dayCell.classList.add('has-activities');
                this.styler._setBg(dayCell,"#F28482");
                dayCell.style.color = "white";
            }
            
            // Check if selected
            if (this.selectedDate && dateObj.isSame(this.selectedDate, 'day')) {
                dayCell.classList.add('selected');
            }
            
            // Click event to filter activities
            dayCell.addEventListener('click', () => {
                this.selectedDate = dateObj.clone();
                this.render();
                this.app.filterActivitiesByDate(dateObj);
            });
            
            grid.appendChild(dayCell);
        }
        
        return grid;
    }

    _createLegend() {
        const legend = document.createElement('div');
        legend.className = 'calendar-legend';
        
        const todayItem = document.createElement('span');
        todayItem.className = 'legend-item';
        todayItem.innerHTML = '<span class="legend-dot today-dot"></span> Today';
        legend.appendChild(todayItem);
        
        const activityItem = document.createElement('span');
        activityItem.className = 'legend-item';
        activityItem.innerHTML = '<span class="legend-dot activity-dot"></span> Has activities';
        legend.appendChild(activityItem);
        
        const selectedItem = document.createElement('span');
        selectedItem.className = 'legend-item';
        selectedItem.innerHTML = '<span class="legend-dot selected-dot"></span> Selected';
        legend.appendChild(selectedItem);
        
        return legend;
    }

    _createDayPreview(dateObj){
        const dayPrevWrapper = document.createElement('div');
        dayPrevWrapper.className = 'dayPrev-wrapper';

        const header = document.createElement('div');
        header.className = 'dayPrev-header';
        header.innerHTML = `<span>${dateObj.format('dddd, MMMM DD, YYYY')}</span>`;
        dayPrevWrapper.appendChild(header);


        const backBtn = document.createElement('button');
        backBtn.textContent = '◀';
        backBtn.className = 'calendar-nav-btn';
        backBtn.addEventListener('click', () => {
            dayPrevWrapper.style.display = "none";
            this.clearFilter();
            this.render();
        });
        dayPrevWrapper.appendChild(backBtn);

        const info = document.createElement('p');
        info.textContent = `Selected date: ${dateObj.format('MM/DD/YYYY')}`;
        info.style.padding = '10px';
        info.style.margin = '5px 0';
        dayPrevWrapper.appendChild(info);
        
        return dayPrevWrapper;
    }

    _hasActivities(date) {
        if (!this.app || !this.app.$Activities) return false;
        
        const dateStr = date.format('YYYY-MM-DD');
        return this.app.$Activities.some(activity => {
            if (activity.type === 'Task') {
                return moment(activity.Start).isSame(date, 'day');
            } else {
                return moment(activity.date).isSame(date, 'day');
            }
        });
    }

    clearFilter() {
        this.selectedDate = null;
        this.render();
        this.app._ShowActivities();
    }

}