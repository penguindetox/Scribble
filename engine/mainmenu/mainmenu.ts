import { ipcRenderer } from "electron";
import fs from 'fs/promises';

export class MainMenu{
    constructor(){
        var scriptform =  document.getElementById('create-project') as HTMLFormElement;

        var scriptname = document.getElementById('script-name') as HTMLInputElement;
        var loadscriptbutton = document.getElementById('loadscript') as HTMLButtonElement;

        var scriptlocinput = document.getElementById('script-location') as HTMLInputElement;
        var scriptlocbutton = document.getElementById('location-button') as HTMLButtonElement;

        scriptlocbutton.addEventListener("click", async () =>{
            var path = await this.requestFilePath();
            if(!path) return;

            scriptlocinput.value = path;
        });

        loadscriptbutton.addEventListener("click", async () =>{
            var path = await this.loadScript();
            if(!path) return;

            this.loadScriptEditor(path);
        });

        

        scriptform.addEventListener("submit", async(e) =>{
            e.preventDefault();

            var save = JSON.stringify(
                {
                    name:scriptname.value,
                    content:"",
                    audio:{
                        audioSrcFolder:"",
                        files:[]
                    },

                    comments:[]
                }
            );

            fs.writeFile(`${scriptlocinput.value}/${scriptname.value}.scrib`,save);
            this.loadScriptEditor(`${scriptlocinput.value}/${scriptname.value}.scrib`);
        });
    }

    public async loadScriptEditor(scriptPath:string){
        localStorage.setItem("scriptPath",scriptPath);
        location.href = `../editor/editor.html`;
    }

    public async loadScript(){
        var choice = await ipcRenderer.invoke('load-file',{properties:["openFile"],            filters:[
            {name:"Scribble File",extensions:["scrib"]}
        ]});

        if(!choice) return;

        return choice;
    }

    public async requestFilePath(){
        var choice = await ipcRenderer.invoke('save-file-location',{
            properties:["openDirectory","createDirectory"],

        });

        if(!choice) return;

        return choice;
    }


}

var menu = new MainMenu();