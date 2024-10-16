const baseUrl = 'https://7103.api.greenapi.com';

function clearErrorMessages () {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(message => {
        message.style.display = 'none';
        message.textContent = '';
    });
}

function displayError (inputId, message) {
    const errorElement = document.getElementById(`${ inputId }-error`);
    errorElement.style.display = 'block';
    errorElement.textContent = message;
}

function validateInputs (...fields) {
    clearErrorMessages();
    let isValid = true;

    for (const field of fields) {
        if(!field.value.trim()) {
            displayError(field.id, `Please fill in the ${ field.id }`);
            isValid = false;
        }
    }

    return isValid;
}

async function getSettings () {
    const idInstance = document.getElementById('idInstance');
    const apiToken = document.getElementById('apiTokenInstance');

    if(!validateInputs(idInstance, apiToken)) return;

    try {
        const response = await fetch(`${ baseUrl }/waInstance${ idInstance.value }/getSettings/${ apiToken.value }`);
        const data = await response.json();
        document.getElementById('response').textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        displayError('response', 'Error fetching settings: ' + error.message);
    }
}

async function getStateInstance () {
    const idInstance = document.getElementById('idInstance');
    const apiToken = document.getElementById('apiTokenInstance');

    if(!validateInputs(idInstance, apiToken)) return;

    try {
        const response = await fetch(`${ baseUrl }/waInstance${ idInstance.value }/getStateInstance/${ apiToken.value }`);
        const data = await response.json();
        document.getElementById('response').textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        displayError('response', 'Error fetching instance state: ' + error.message);
    }
}

async function sendMessage () {
    const idInstance = document.getElementById('idInstance');
    const apiToken = document.getElementById('apiTokenInstance');
    const phone = document.getElementById('phoneNumber');
    const message = document.getElementById('message');

    if(!validateInputs(idInstance, apiToken, phone, message)) return;

    try {
        const response = await fetch(`${ baseUrl }/waInstance${ idInstance.value }/sendMessage/${ apiToken.value }`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chatId: `${ phone.value }@c.us`, message: message.value })
        });
        const data = await response.json();
        document.getElementById('response').textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        displayError('response', 'Error sending message: ' + error.message);
    }
}

async function sendFileByUrl () {
    const idInstance = document.getElementById('idInstance');
    const apiToken = document.getElementById('apiTokenInstance');
    const phone = document.getElementById('phoneNumberToSendFile');
    const fileUrl = document.getElementById('fileUrl');

    if(!validateInputs(idInstance, apiToken, phone, fileUrl)) return;

    try {
        const response = await fetch(`${ baseUrl }/waInstance${ idInstance.value }/sendFileByUrl/${ apiToken.value }`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chatId: `${ phone.value }@c.us`, urlFile: fileUrl.value, fileName: 'file.png' })
        });
        const data = await response.json();
        document.getElementById('response').textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        displayError('response', 'Error sending file: ' + error.message);
    }
}
