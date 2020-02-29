

const handleSubmit = () => {
    let title = document.querySelector("[name ='title']").value
    title = title.trim()
    let description = document.querySelector("textarea").value
    let d = new Date()
    let date = (d.getHours()<12)?(d.getHours()+':'+d.getMinutes()+"am "):(d.getHours()-12+":"+d.getMinutes()+"pm ") +(d.getMonth()+1)+ "/" + d.getDate() + "/" + d.getFullYear()
    let data = {"title":title,"date":date,"description":description}
    window.opener.postMessage('N'+JSON.stringify(data))
    window.close()
}

