function login() {
    fetch('/api/login', {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        const token = data.token;
        // Guardar el token en el almacenamiento local o de sesión
        localStorage.setItem('token', token);
        alert('Inicio de sesión exitoso');
    })
    .catch(error => console.error('Error:', error));
}

function getPosts() {
    const token = localStorage.getItem('token');
    fetch('/api/posts', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        alert('Publicaciones obtenidas correctamente');
    })
    .catch(error => console.error('Error:', error));
}

