let open_btn = document.getElementById("open-btn");
let user_modal = document.getElementById("user-modal");
let close = document.getElementById("close");
let save = document.getElementById("save");
let result = document.getElementById("result");
const users = JSON.parse(localStorage.getItem("users")) || [];
let search = "";
let edit_user = -1;
let current_page = 1;
let items_per_page = 2;
let forms = {
    first_name: '',
    last_name: '',
    age: '',
    mail: ''
};

document.addEventListener("DOMContentLoaded", function() {
    save.addEventListener("click", addUser);
    displayUsers();
});

open_btn.addEventListener("click", function() {
    toggleModal("block");
    resetForm();
});

close.addEventListener("click", function() {
    toggleModal("none");
});

function displayUsers() {
    result.innerHTML = "";
    let filtered_users = users?.filter(item => {
        if(item?.first_name?.toLowerCase().includes(search.toLowerCase())){
            return item
        }
    });
    let start_index = (current_page - 1) * items_per_page;
    let end_index = start_index + items_per_page;
    let display_users = filtered_users.slice(start_index, end_index);

    display_users.forEach((item, index) => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${start_index + index + 1}</td>
            <td>${item.first_name}</td>
            <td>${item.last_name}</td>
            <td>${item.age}</td>
            <td>${item.mail}</td>
            <td>
                <button class="btn btn-info" onclick="editUser(${start_index + index})">Edit</button>
                <button class="btn btn-danger" onclick="deleteUser(${start_index + index})">Delete</button>
            </td>
        `;
        result.appendChild(tr);
    });
    paginationUser(filtered_users.length);
}

function paginationUser(total_users) {
    let pagination_controls = document.getElementById("pagination-controls");
    let total_pages = Math.ceil(total_users / items_per_page);
    pagination_controls.innerHTML = "";

    for (let i = 1; i <= total_pages; i++) {
        let page_btn = document.createElement("button");
        page_btn.innerText = i;
        page_btn.className = i === current_page ? "btn btn-primary" : "btn btn-outline-primary";
        page_btn.addEventListener("click", function() {
            current_page = i;
            displayUsers();
        });
        pagination_controls.appendChild(page_btn);
    }
}

window.addEventListener("click", function(event) {
    if (event.target === user_modal) {
        toggleModal("none");
    }
});

function handleChange(event) {
    const { name, value } = event.target;
    forms = { ...forms, [name]: value };
}

function addUser() {
    if (!forms.first_name || !forms.last_name || !forms.age || !forms.mail) {
        alert("All fields are required.");
        return;
    }
    
    if (edit_user === -1) {
        users.push({ ...forms });
    } else {
        users[edit_user] = { ...forms };
        edit_user = -1;
    }
    
    saveStorage();
    displayUsers();
    toggleModal("none");
    resetForm();
}

function toggleModal(status) {
    user_modal.style.display = status;
}

function handleSearch(event) {
    search = event.target.value;
    current_page = 1;
    displayUsers();
}

function saveStorage() {
    localStorage.setItem("users", JSON.stringify(users));
}

function editUser(index) {
    edit_user = index;
    forms = { ...users[index] };
    document.querySelector("input[name='first_name']").value = forms.first_name;
    document.querySelector("input[name='last_name']").value = forms.last_name;
    document.querySelector("input[name='age']").value = forms.age;
    document.querySelector("input[name='mail']").value = forms.mail;
    toggleModal("block");
}

function deleteUser(index) {
    users.splice(index, 1);
    saveStorage();
    displayUsers();
}

function resetForm() {
    forms = {
        first_name: '',
        last_name: '',
        age: '',
        mail: ''
    };
    document.querySelector("input[name='first_name']").value = "";
    document.querySelector("input[name='last_name']").value = "";
    document.querySelector("input[name='age']").value = "";
    document.querySelector("input[name='mail']").value = "";
}
