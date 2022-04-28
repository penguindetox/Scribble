import {app, BrowserWindow,dialog,ipcMain,Menu, MenuItemConstructorOptions, OpenDialogOptions} from 'electron';

//import * as remoteMain from '@electron/remote/main';
//remoteMain.initialize();

var mainMenuTemplate:MenuItemConstructorOptions[] = [
    {
        label:"Main",

        
    },
    {
        label:"File",
        submenu:[
            {
                label:"Save Script",
                accelerator:"CommandOrControl+S",
                click: () =>{
                    BrowserWindow.getFocusedWindow()?.webContents.send("save-scribble-script")
                }
            },
            {
                label:"Load Script",
                accelerator:"CommandOrControl+L"
            },
            
            {label:"Close Current Window",
            click: () =>{
                BrowserWindow.getFocusedWindow()?.close();
                if(BrowserWindow.getAllWindows().length === 0){
                    app.quit();
                }
            }}
        ],
    },
    {
        label:"Tools",
        submenu:[
            {label:"Comment"},
        ]
    },
    {
        label:"Settings",

        submenu: [
            {
                label: "Inspect Element",
                role: "toggleDevTools",
            },
            {
                label: "Reload Page",
                role: "reload",
            },
        ],
    }
]


var mainmenu = Menu.buildFromTemplate(mainMenuTemplate)

function createWindow(){
        var window:BrowserWindow = new BrowserWindow({
            webPreferences:{
                nodeIntegration:true,
                contextIsolation: false,
                webgl:true,
            },
            width:1280,
            height:720,
            
        });
        
        window.loadFile("./engine/mainmenu/mainmenu.html");
        
        return window;

    //window.maximize();
    //remoteMain.enable(window.webContents);
}

app.whenReady().then(() =>{
    Menu.setApplicationMenu(mainmenu)
    var window = createWindow();
    var ipcListeners = ()=>{
        ipcMain.handle("save-file-location",async (_,options) =>{
            var filechoice = await dialog.showOpenDialog(options as OpenDialogOptions);

            return filechoice.filePaths[0];
        });

        ipcMain.handle("load-file",async (_,options) =>{
            var file = await dialog.showOpenDialog(options as OpenDialogOptions);

            return file.filePaths[0];
        });
    }

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });

    ipcListeners();
});


app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});