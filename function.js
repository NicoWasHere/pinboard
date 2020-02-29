const fs = require('fs')
const os = require('os')

let pins = new Map()

let runtimeID = 0;

window.addEventListener('load',()=>initFolder())

const initFolder = () => {
    if (!fs.existsSync(`${os.homedir()}/Library/Pinboard`)) {
        fs.mkdirSync(`${os.homedir()}/Library/Pinboard`);
    }
}

fs.readFile(`${os.homedir()}/Library/Pinboard/pins.json`, "utf-8",(err,buf)=>{
    let temp = []
    temp = JSON.parse(buf) //this is the issue
    temp.forEach(pin => {
        pins.set(runtimeID,pin)
        runtimeID++
    })
    updatePins()
    }
)

const createFile = () => {
    let temp = []
    pins.forEach(pin => {
        temp.push(pin)
    })
    // console.log(JSON.stringify(temp))
    fs.writeFile(`${os.homedir()}/Library/Pinboard/pins.json`,JSON.stringify(temp),(err)=>{if(err){console.log(err)}})
}

const newPin = (pin) => {
    pins.set(runtimeID,pin)
    runtimeID++
    createFile()
    updatePins()
}

const button = document.getElementById('newPin')
button.addEventListener('click',()=>handleClick())


window.addEventListener("message", (message)=>handleForm(message),false)
const handleClick = () => { //make a popup modal
 window.open("newPin.html",'New Pin',"width=400,height=570,resizable=0",).focus()
}


const handleForm = (form) => {
    switch(form.data[0]){
        case 'N':
            form.data = form.data.substring(1)
            newPin(JSON.parse(form.data))
            break;
        case 'X':
            pins.delete(Number(form.data.substring(1)))
            updatePins()
            createFile()
            break;
        case 'L':
            loadPin(form.source,form.data.substring(1))
            break;
    }
}

const updatePins = () => {
    let pinZone = document.getElementById('pins')
    pinZone.innerHTML = ""
    pins.forEach((pin,key)=>{
       pinZone.innerHTML = pinZone.innerHTML + `<p onClick = "openPin('${key}','${pin.title}')"  class = "pin">${pin.title}</p>`
    })
}
const loadPin = (frame,id) =>{
   frame.postMessage(pins.get(Number(id)))
}

const openPin = (id, target) => {
  window.open(`pinDisplay.html?${id}`,target).focus()

}