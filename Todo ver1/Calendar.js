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
            dayCell.className = 'calendar-day';
            dayCell.textContent = day;
            
            const dateObj = this.currentDate.clone().date(day);
            
            // Check if today
            if (dateObj.isSame(today, 'day')) {
                dayCell.classList.add('today');
            }
            
            // Check if has activities
            if (this._hasActivities(dateObj)) {
                dayCell.classList.add('has-activities');
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