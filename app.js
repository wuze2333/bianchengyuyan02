document.addEventListener('DOMContentLoaded', () => {
    const passwordList = document.getElementById('password-list');
    const passwordForm = document.getElementById('password-form');
    const generateButton = document.getElementById('generate');

    // 加载密码列表
    const loadPasswords = () => {
        const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
        passwordList.innerHTML = '';
        passwords.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div>
                    <strong>PageLink: <a href="${item.url}" target="_blank">${item.url}</a></strong><br>
                    Username: ${item.username}<br>
                    Password: ${item.password}
                </div>
                <button class="delete-btn">Delete</button>
            `;
            li.querySelector('.delete-btn').addEventListener('click', () => {
                passwords.splice(index, 1);
                localStorage.setItem('passwords', JSON.stringify(passwords));
                loadPasswords();
            });
            passwordList.appendChild(li);
        });
    };

    // 保存新密码
    passwordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const url = document.getElementById('url').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
        passwords.push({ url, username, password });
        localStorage.setItem('passwords', JSON.stringify(passwords));

        loadPasswords();
        passwordForm.reset();
    });

    // 生成随机密码
    generateButton.addEventListener('click', () => {
        const password = Math.random().toString(36).slice(-10);
        document.getElementById('password').value = password;
    });

    loadPasswords();
});
