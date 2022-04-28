import { ipcRenderer } from "electron";
import { ScriptManager } from "./ScriptManager";

export class TextEditor{
    public scripteditorarea:HTMLDivElement;
    public manager:ScriptManager;

    public async OnSave(){
        var notif = document.getElementById('notif') as HTMLDivElement;
        var notifcancelbutton = document.getElementById('notifclosebutton') as HTMLButtonElement;
        notif.style.visibility = "hidden";

        notifcancelbutton.addEventListener("click", async () =>{
            notif.style.visibility = "hidden";
        })

        ipcRenderer.on('save-scribble-script',(_,args) =>{
            this.manager.saveScript();
           notif.style.visibility = "visible";


           setTimeout(() =>{
               if(notif.style.visibility == "visible"){
                notif.style.visibility = "hidden";
               }
           
           },3000);
           
        });
    }

    constructor(){
        this.scripteditorarea = document.getElementById('texteditor') as HTMLDivElement;
        this.scripteditorarea.style.fontSize = "14px";
        this.manager = new ScriptManager(this.scripteditorarea);

        this.OnSave();
        this.manager.loadScript();
    }

}


async function main(){
    var editor = new TextEditor();
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var scrollLeft = 
              window.pageXOffset || document.documentElement.scrollLeft;
    editor.scripteditorarea.style.height = `${window.innerHeight - 82.5}px`;

    window.addEventListener('scroll', function(e){
        window.scrollTo(scrollLeft, scrollTop);
    });

    

    window.onresize = function (){
        editor.scripteditorarea.style.height = `${window.innerHeight - 82.5}px`;
    }
}

window.onload = main