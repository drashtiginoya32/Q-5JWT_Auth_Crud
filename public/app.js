function register() {
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;

    fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    }).then(res => res.json())
      .then(data => alert(data.msg));
}

function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    }).then(res => res.json())
      .then(data => {
          document.getElementById('token').value = data.token;
      });
}

function copyToken() {
    const token = document.getElementById('token');
    token.select();
    document.execCommand('copy');
    alert('Token copied to clipboard');
}
