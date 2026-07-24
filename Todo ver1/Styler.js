class Styler{
    // constructor(){

    // }
    //different methods for styling

    styleTable = (table) => {
        table.style.borderCollapse = "collapse";
        table.style.width = "100%";

        const all_headers = table.querySelectorAll('th');
        for (let th of all_headers) {
            this.styleTh(th,);
        }
        const tbody = table.querySelectorAll('tbody');
        this.styleTbody(table,tbody);

    }

    styleTbody = (table,tbody) => {
        const all_cells = table.querySelectorAll('td');
        for(let td of all_cells){
            this.styleTd(td);
        }

        const all_rows = table.querySelectorAll('tr');
        for (let tr of all_rows){
            this.styleTr(tr);
        }
    }

    styleTh = (th ,border_width = "1px" ,type = "solid" ,border_color="#84A59D" ,padding="12px 16px",background_color="#F6BD60",text_color = "#ffffff",font_family="DynaPuff") => {
        th.style.backgroundColor= background_color;
        th.style.color= text_color;
        th.style.border= `${border_width} ${type} ${border_color}`;
        th.style.padding= "12px 16px";
        th.style.textAlign = "left";
        th.style.fontFamily = font_family;
        th.style.fontWeight = "500";
    }

    styleTd = (td ,border_width = "1px" ,type = "solid" ,color="#ddd" ,padding="12px 16px",font_family="Quicksand") => {
        td.style.borderBottom= `${border_width} ${type} ${color}`;
        td.style.padding= padding;
        td.style.textAlign = "left";
        td.style.fontFamily = font_family;
    }

    styleTr = (tr) =>{
        tr.style.cursor = "pointer";
    }

    _setBorder = (div,border_width="1px",color="#ddd",type="solid") => {
        div.style.border = `${border_width} ${type} ${color}`; 
    }

    _setBorderRaidus(div,border_raidus = "5px"){
        div.style.borderRadius = `${border_raidus}`;
    }

    _setBg = (div,color="#ddd") => {
        div.style.backgroundColor = color;
    }

    _setHover(obj,bg_before="transparent",bg_after="transparent",color_before="black",color_after="black",transition_duration="300ms",transition_mode="ease"){
        obj.style.transition = `${transition_duration} ${transition_mode}`;
        obj.addEventListener('mouseenter', function() {
            this.style.backgroundColor = bg_after;
            this.style.color = color_after;
        });

        obj.addEventListener('mouseleave', function() {
            this.style.backgroundColor = bg_before;
            this.style.color = color_before;
        });
    }

    _setWidth = (obj , width="100%") => {
        obj.style.width=width;
    }

    _setHeight = (obj , height="100%") => {
        obj.style.height=height;
    }

    _setDisplayFlex = (obj , direction="column",justify_content="center",align_items="center",gap="10px") => {
        obj.style.display = "flex";
        obj.style.flexDirection = direction;
        obj.style.gap=gap;
    }

    _setPadding(obj,padding="10px"){
        obj.style.padding=padding;
    }
    _setFontFamily(obj , font_family='quicksand'){
        obj.style.fontFamily = font_family;
    }

    _styleTagDiv(div){
        div.style.backgroundColor = "transparent";
        this._setBorder(div,"2px","#84A59D","solid");
        this._setBorderRaidus(div,"10px");
        this._setWidth(div,"60px");
        this._setHeight(div,"30px");
        div.style.display="flex";
        div.style.flexDirection="row";
        div.style.alignItems = "center";
        div.style.gap="10px";
        div.style.padding="5px";
    }

    _styleClearTagBtn(btn){
        this._setWidth(btn,"25px");
        this._setHeight(btn,"25px");
        this._setBorder(btn,"none","","");
        this._setBorderRaidus(btn,"50%");
        btn.style.color="#84A59D";
        this._setBg(btn,"transparent");
        this._setPadding(btn,"auto");
        btn.style.boxShadow = "none";
    }
}