const divRegistration = document.getElementById('registration');
const divOptions = document.getElementById('start');
const btnUsername = document.getElementById('btn-username');
const messageErrorContainer = document.getElementById('message-error-registration');

btnUsername.addEventListener('click', function(e){

    e.preventDefault();

    const inputUsername = document.getElementById('username').value;

    if (inputUsername == '') {
        messageErrorContainer.innerHTML = `<span class="span-error-username">Username is empty<span>`;
        messageErrorContainer.style.display = 'block';
    } else {
        messageErrorContainer.style.display = 'none';
        sessionStorage.setItem('username', inputUsername);
        document.getElementById('username').value = '';
        showOptions();
    }

});

function showOptions() {
    divRegistration.style.display = 'none';
    divOptions.style.display = 'block';
}