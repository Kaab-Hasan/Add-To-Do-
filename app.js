
// Check if user is logged in on page load
window.onload = function() {
    checkLoginStatus();
};

// Show Login Form
function showLoginForm() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('signUpForm').style.display = 'none';
    document.getElementById('todoSection').style.display = 'none';
}

// Show Sign-Up Form
function showSignUpForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signUpForm').style.display = 'block';
    document.getElementById('todoSection').style.display = 'none';
}

// Close Login Form
function closeLoginForm() {
    document.getElementById('loginForm').style.display = 'none';
}

// Close Sign-Up Form
function closeSignUpForm() {
    document.getElementById('signUpForm').style.display = 'none';
}

// Login
function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('todoSection').style.display = 'block';
        document.getElementById('loginButton').style.display = 'none';
        document.getElementById('signUpButton').style.display = 'none';
        document.getElementById('logoutButton').style.display = 'block';
        loadTodos();
    } else {
        alert('Invalid login credentials');
    }
}

// Sign-Up
function signUp() {
    const username = document.getElementById('signUpUsername').value;
    const password = document.getElementById('signUpPassword').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(u => u.username === username)) {
        alert('Username already exists');
        return;
    }

    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Sign up successful!');
    closeSignUpForm();
}
// JavaScript for theme toggle
// function toggleTheme() {
//     // Toggle the 'light-theme' class on the body element
//     document.body.classList.toggle('light-theme');
    
//     // Optionally change the text of the button based on the theme
//     const themeButton = document.getElementById('themeToggleButton');
//     if (document.body.classList.contains('light-theme')) {
//         themeButton.textContent = '🌚'; // Change to moon icon for dark mode
//     } else {
//         themeButton.textContent = '🌙'; // Change to sun icon for light mode
//     }
// }
// Check Login Status
function checkLoginStatus() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        document.getElementById('loginButton').style.display = 'none';
        document.getElementById('signUpButton').style.display = 'none';
        document.getElementById('logoutButton').style.display = 'block';
        document.getElementById('todoSection').style.display = 'block';
        loadTodos();
    } else {
        document.getElementById('loginButton').style.display = 'block';
        document.getElementById('signUpButton').style.display = 'block';
        document.getElementById('logoutButton').style.display = 'none';
        document.getElementById('todoSection').style.display = 'none';
    }
}

// Log Out
function logout() {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('todos');
    checkLoginStatus();
}

// Add Todo Item
function addTodo() {
    const todoText = document.getElementById('todoInput').value;
    if (!todoText) return;

    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    const newTodo = { text: todoText, id: Date.now() };
    todos.push(newTodo);
    localStorage.setItem('todos', JSON.stringify(todos));
    document.getElementById('todoInput').value = '';
    loadTodos();
}

// Load Todos
function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';

    todos.forEach(todo => {
        const todoItem = document.createElement('li');
        todoItem.innerHTML = `
            ${todo.text}
            <button onclick="editTodo(${todo.id})">Edit</button>
            <button onclick="deleteTodo(${todo.id})">Delete</button>
        `;
        todoList.appendChild(todoItem);
    });
}

// Edit Todo Item
function editTodo(id) {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    const todo = todos.find(t => t.id === id);
    const newText = prompt('Edit your todo:', todo.text);

    if (newText !== null && newText !== '') {
        todo.text = newText;
        localStorage.setItem('todos', JSON.stringify(todos));
        loadTodos();
    }
}

// Delete Todo Item
function deleteTodo(id) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos = todos.filter(t => t.id !== id);
    localStorage.setItem('todos', JSON.stringify(todos));
    loadTodos();
}
