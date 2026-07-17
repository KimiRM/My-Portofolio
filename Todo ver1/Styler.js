class Styler{
    // constructor(){

    // }
    //different methods for styling

    styleTable = (table) => {
        table.style.borderCollapse = "collapse";

        const all_headers = table.querySelectorAll('th');
        for (let th of all_headers) {
            this.styleTh(th,);
        }


    }

    styleTbody = (table,tbody) => {
        const all_cells = table.querySelectorAll('td');
        for(let td of all_cells){
            this.styleTd(td);
        }
    }

    styleTh = (th ,border_width = "1px" ,type = "solid" ,border_color="#ddd" ,padding="12px 16px",background_color="#7476ff",text_color = "#f2f2f2") => {
        th.style.backgroundColor= background_color;
        th.style.color= text_color;
        th.style.border= `${border_width} ${type} ${border_color}`;
        th.style.padding= "12px 16px";
    }

    styleTd = (td ,border_width = "1px" ,type = "solid" ,color="#ddd" ,padding="12px 16px") => {
        td.style.border= `${border_width} ${type} ${color}`;
        td.style.padding= padding;
    }
}