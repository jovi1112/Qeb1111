function startStressing() {
    const server = document.getElementById('server').value;
    const port = document.getElementById('port').value;
    const status = document.getElementById('status');

    if (!server || !port) {
        status.textContent = 'Por favor, introduce la dirección del servidor y el puerto.';
        return;
    }

    status.textContent = 'Iniciando estrés en el servidor...';

    const numberOfConnections = 100; // Número de conexiones simultáneas
    for (let i = 0; i < numberOfConnections; i++) {
        stressServer(server, port);
    }
}

function stressServer(server, port) {
    const ws = new WebSocket(`ws://${server}:${port}`);

    ws.onopen = function () {
        console.log('Conexión establecida con el servidor.');
        ws.send(JSON.stringify({ 'method': 'ping' }));
    };

    ws.onmessage = function (event) {
        console.log('Mensaje recibido del servidor:', event.data);
    };

    ws.onclose = function () {
        console.log('Conexión cerrada con el servidor.');
    };

    ws.onerror = function (error) {
        console.log('Error en la conexión:', error);
    };
}
