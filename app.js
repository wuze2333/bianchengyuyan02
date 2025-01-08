const passwordList = document.getElementById('password-list');
const form = document.getElementById('add-password-form');
const generatePasswordButton = document.getElementById('generate-password');

const STORAGE_KEY = "passwords";

function loadPasswords() {
    const passwords = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    passwordList.innerHTML = passwords.map(password => `
        <li>
            <div>
                <strong>PageLink: <a href="${password.url}" target="_blank">${password.url}</a></strong><br>
                Username: ${password.login}<br>
                Password: ${password.password}
            </div>
            <button class="delete-btn">Delete</button>
        </li>
    `).join('');

    // Add event listeners to delete buttons
    document.querySelectorAll('.delete-btn').forEach((button, index) => {
        button.addEventListener('click', () => {
            passwords.splice(index, 1);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(passwords));
            loadPasswords();
        });
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = document.getElementById('site-url').value;
    const login = document.getElementById('login-name').value;
    const password = document.getElementById('password').value;

    const passwords = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    passwords.push({ url, login, password });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(passwords));

    loadPasswords();
    form.reset();
});

generatePasswordButton.addEventListener('click', () => {
    const password = Math.random().toString(36).slice(-10);
    document.getElementById('password').value = password;
});

loadPasswords();
