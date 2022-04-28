import fs from 'fs/promises';
import { AudioManager } from '../audio/AudioManager';
import { TextAreaCommands } from './managers/Commands';

export class ScriptManager{
    public area:HTMLDivElement;
    public commentBuffer:Comment[];
    public audio:AudioManager;
    constructor(area:HTMLDivElement){
        this.area = area;
        this.commentBuffer = [];
        this.audio = new AudioManager();

        new TextAreaCommands(this.area).init();
    }

    public async saveScript(){
        var currentscript = localStorage.getItem("scriptPath");

        var scriptfilebuf = await fs.readFile(currentscript as string);

        var scriptfile = JSON.parse(scriptfilebuf.toString());
        var tempcontentbuffer = this.area.innerHTML;
        console.log(tempcontentbuffer);
        //console.log(tempcontentbuffer)
        tempcontentbuffer = tempcontentbuffer.replace(/<br>/g,'\n');
        tempcontentbuffer = tempcontentbuffer.replace(/<div>/g,'');
        tempcontentbuffer = tempcontentbuffer.replace(/<\/div>/g,'');
        tempcontentbuffer = tempcontentbuffer.replace(/&nbsp;/g,'/nb');

        scriptfile.content = tempcontentbuffer;
        scriptfile.comments = this.commentBuffer;

        fs.writeFile(currentscript as string,JSON.stringify(scriptfile));

        return true;
    }

    public async loadScript(){
        var currentscript = localStorage.getItem("scriptPath");

        var scriptfilebuf = await fs.readFile(currentscript as string);

        var scriptfile = JSON.parse(scriptfilebuf.toString());
        var tempcontentbuffer = scriptfile.content;

        tempcontentbuffer = tempcontentbuffer.replace(/\n/g,'<div><br></div>');
        tempcontentbuffer = tempcontentbuffer.replace(/\/nb/g,'&nbsp;')

        this.area.innerHTML = tempcontentbuffer;

        this.commentBuffer = scriptfile.comments;
        

        return true;
    }
}