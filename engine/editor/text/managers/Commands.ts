import $ from 'jquery';

export class TextAreaCommands{
    public area:HTMLDivElement;
    public keycodes:any;
    public constructor(area:HTMLDivElement){
        this.area = area;
        this.keycodes = {};
    }

    public init(){
        var origin = this;
        
        this.area.addEventListener('keydown', async function(e){
            origin.keycodes[e.key] = true;

            //console.log(origin.keycodes);
            origin.SelectAllText();
            origin.increaseFontSize();
            origin.decreaseFontSize();
            //console.log(e.key.toLowerCase());
        });

        this.area.addEventListener('keyup',async function(e){
            console.log(e.key);
            origin.keycodes[e.key] = false;
        });
    }

    public SelectAllText(){
        var sel:any, range:any;
	    var el = this.area; 
        if(this.keycodes["Meta"] && this.keycodes["a"] === true || this.keycodes["Control"] === true && this.keycodes["a"] === true){
            if (window.getSelection && document.createRange) { //Browser compatibility
                sel = window.getSelection();
                if(sel.toString() == ''){ //no text selection
                   window.setTimeout(function(){
                      range = document.createRange(); //range object
                      range.selectNodeContents(el); //sets Range
                      sel.removeAllRanges(); //remove all ranges from selection
                      sel.addRange(range);//add Range to a Selection.
                  },1);
                }

                this.keycodes["a"] = false;
              }
        }
       
    }

    public changeFontSize(){
        if(this.keycodes["meta"] == true && this.keycodes["p"] == true){
            document.execCommand("fontSize",false,"50px");
        }
    }

    public increaseFontSize(){
        if(this.keycodes["Meta"] === true && this.keycodes["Shift"] == true && this.keycodes["l"] === true || this.keycodes["Control"] === true && this.keycodes["Shift"] == true && this.keycodes["l"] === true){
            var fontnum = parseFloat(this.area.style.fontSize) + 3;
            console.log(fontnum)

            this.area.style.fontSize = `${fontnum}px`;
            this.keycodes["l"] = false;
           
        }

    }

    public decreaseFontSize(){
        if(this.keycodes["Meta"] === true && this.keycodes["Shift"] == true  && this.keycodes["k"] === true || this.keycodes["Control"] === true && this.keycodes["Shift"] == true && this.keycodes["k"] === true){
            var fontnum = parseFloat(this.area.style.fontSize) - 3;

            this.area.style.fontSize = `${fontnum}px`;
            this.keycodes["k"] = false;
           
        }

    }
}