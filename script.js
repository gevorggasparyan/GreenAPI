const baseUrl = 'https://api.green-api.com/';

async function getSettings() {
    const idInstance = document.getElementById('idInstance').value;
    const apiToken = document.getElementById('apiTokenInstance').value;
    console.log(idInstance + ", " + apiToken)
    const response = await fetch(`${baseUrl}/waInstance${idInstance}/getSettings/${apiToken}`);
    const data = await response.json();
    document.getElementById('response').textContent = JSON.stringify(data, null, 2);
}

async function getStateInstance() {
    const idInstance = document.getElementById('idInstance').value;
    const apiToken = document.getElementById('apiTokenInstance').value;
    const response = await fetch(`${baseUrl}/waInstance${idInstance}/getStateInstance/${apiToken}`);
    const data = await response.json();
    document.getElementById('response').textContent = JSON.stringify(data, null, 2);
}

async function sendMessage() {
    const idInstance = document.getElementById('idInstance').value;
    const apiToken = document.getElementById('apiTokenInstance').value;
    const phone = document.getElementById('phoneNumber').value;
    const message = document.getElementById('message').value;

    const response = await fetch(`${baseUrl}/waInstance${idInstance}/sendMessage/${apiToken}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatId: `${phone}@c.us`, message })
    });
    const data = await response.json();
    document.getElementById('response').textContent = JSON.stringify(data, null, 2);
}

async function sendFileByUrl() {
    const idInstance = document.getElementById('idInstance').value;
    const apiToken = document.getElementById('apiTokenInstance').value;
    const phone = document.getElementById('phoneNumber').value;
    const fileUrl = document.getElementById('fileUrl').value;

    const response = await fetch(`${baseUrl}/waInstance${idInstance}/sendFileByUrl/${apiToken}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatId: `${phone}@c.us`, urlFile: fileUrl, fileName: 'file.png' })
    });
    const data = await response.json();
    document.getElementById('response').textContent = JSON.stringify(data, null, 2);
}
