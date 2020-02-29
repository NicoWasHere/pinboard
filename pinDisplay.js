window.addEventListener("message", (message)=>handleMessage(message),false)
let id
window.onload = () => {
   id = (window.location.search).split('?')[1]
   // id = id.replace(/%20/g,' ')
   window.opener.postMessage('L'+ id)
}

const handleMessage = (message) => {
   console.log(message)
   message = message.data
   
   document.getElementById('title').innerText = message.title
   document.getElementById('description').innerText = message.description
}
let button = document.querySelector('button')
button.onclick = () => {
   window.opener.postMessage('X'+id)
   window.close()
}