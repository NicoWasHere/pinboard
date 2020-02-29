const { app, BrowserWindow } = require('electron')


let mainWindow 
const createWindow = () =>{
 mainWindow = new BrowserWindow({
      'minHeight': 400,
      'minWidth': 600,
        webPreferences:{
            nodeIntegration: true
        }
    })
mainWindow.maximize()
mainWindow.loadFile("index.html")
}


app.on('ready',()=>createWindow("index.html"))