document.addEventListener('DOMContentLoaded', () => {
    const passwordList = document.getElementById('password-list');
    const form = document.getElementById('add-password-form');
    const generatePasswordButton = document.getElementById('generate-password');

    const STORAGE_KEY = "passwords";

    function loadPasswords() {
        const passwords = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        passwordList.innerHTML = passwords.map(password => `
            <li>
                <div>
                    <strong>${password.url}</strong><br>
                    Username: ${password.login}<br>
                    Password: ${password.password}
                </div>
                <button class="delete-btn">Delete</button>
            </li>
        `).join('');

        document.querySelectorAll('.delete-btn').forEach((btn, index) => {
            btn.addEventListener('click', () => {
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
        const length = parseInt(document.getElementById('password-length').value, 10) || 12;
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
        let password = "";
        for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        document.getElementById('password').value = password;
    });

    loadPasswords();
});
