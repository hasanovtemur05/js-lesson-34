let open_btn = document.getElementById("open-btn")
let user_modal = document.getElementById("user-modal")
let forms = {}
let close = document.getElementById("close")
let save = document.getElementById("save")
let result = document.getElementById("result")
const users = []
let search = ""
document.addEventListener("DOMContentLoaded", function(){
    save.addEventListener("click", addUser)
    displayUsers()
})

open_btn.addEventListener("click", function(){
   toggleModal("block")
})

close.addEventListener("click", function(){
    toggleModal("none")
})

function displayUsers() {
    result.innerHTML = ""
    users.filter((item) =>{
        if (item.first_name.includes(search)) {
            return item
        } 
    }).forEach((item,index) => {
        let tr = document.createElement("tr")
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.first_name}</td>
            <td>${item.last_name}</td>
            <td>${item.age}</td>
            <td>${item.mail}</td>
        `
        result.appendChild(tr)
    })
}
window.addEventListener("click", function(event){
    if (event.target === user_modal) {
        toggleModal("none")
    }
})
function handleChange(event){
    const {name, value} = event.target
    forms = {...forms, [name]: value}
    // console.log(forms);
    
}
function addUser(){
    users.push({...forms})
    displayUsers()
    toggleModal("none")
}
function toggleModal(status){
    user_modal.style.display = status

}
function handleSearch (event){
    search = event.target.value
    displayUsers()
}