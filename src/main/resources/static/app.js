
document.addEventListener('DOMContentLoaded', fetchUsers);

function fetchUsers() {
    fetch('/api/users')
        .then(response => response.json())
        .then(users => {
            populateTable(users);
        });
}

function populateTable(users) {
    const tableBody = document.querySelector('#userTable tbody');
    tableBody.innerHTML = '';
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.email}</td>
            <td>${user.birthDate}</td>
            <td>
                <button onclick="editUser(${user.id})">Edit</button>
                <button onclick="deleteUser(${user.id})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function filterUsersByName(searchName) {
    const lowerCaseSearchName = searchName.toLowerCase();

    fetch(`/api/users/name/${lowerCaseSearchName}`)
        .then(response => response.json())
        .then(users => {
            populateTable(users);
        });
}

function showAddUserForm() {
    document.getElementById('formTitle').textContent = 'Add User';
    document.getElementById('userFormElement').reset();
    document.getElementById('userId').value = '';
    document.getElementById('userForm').style.display = 'block';
}

function editUser(userId) {
    fetch(`/api/users/${userId}`)
        .then(response => response.json())
        .then(user => {
            document.getElementById('userId').value = user.id;
            document.getElementById('firstName').value = user.firstName;
            document.getElementById('lastName').value = user.lastName;
            document.getElementById('email').value = user.email;
            document.getElementById('birthDate').value = user.birthDate;
            document.getElementById('formTitle').textContent = 'Edit User';
            document.getElementById('userForm').style.display = 'block';
            document.getElementById('errorMessage').style.display = 'none';
        });
}

function deleteUser(userId) {
    fetch(`/api/users/${userId}`, { method: 'DELETE' })
        .then(() => fetchUsers());
}

document.getElementById('userFormElement').addEventListener('submit', function (e) {
    e.preventDefault();

    const userId = document.getElementById('userId').value;
    const user = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        birthDate: document.getElementById('birthDate').value
    };

    const method = userId ? 'PUT' : 'POST';
    const url = userId ? `/api/users/${userId}` : '/api/users';

    fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errors => { throw new Error(JSON.stringify(errors)) });
            }
            return response.json();
        })
        .then(() => {
            document.getElementById('userForm').style.display = 'none';
            fetchUsers();
        })
        .catch(error => {
            const errors = JSON.parse(error.message);
            const errorMessageList = errors.map(msg => `<li>${msg}</li>`).join('');
            document.getElementById('errorMessage').innerHTML = `<p>${errorMessageList}</p>`;
            document.getElementById('errorMessage').style.display = 'block';
        });
});