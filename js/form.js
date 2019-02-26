
document.querySelector('#submit-btn').addEventListener('click', addDataFromForm);
var teamMemmbersArray = [];

function addDataFromForm() {
    checkValidityUsername();
    checkValidityEmail();
    teamMemmbersArray.push({
        username: document.getElementById('username').value,
        //name: document.getElementById('name').value,
        //surname: document.getElementById('surname').value,
        //phoneNumber: document.getElementById('phone-number').value,
        //address: document.getElementById('address').value,
        //yearOfBirth: document.getElementById('year-of-birth').value,
        //postcode: document.getElementById('postcode').value,
        email: document.getElementById('email').value
    });
    console.log(teamMemmbersArray);
    resetFormValues();
    alert('The form is successfully submitted');
}

function resetFormValues() {
    document.querySelector("#team-registration-form").reset();
}

function checkValidityUsername() {
    teamMemmbersArray.forEach(element => {
        if(element.username === document.getElementById('username').value) {
            console.log('username invalid');
        }
    });    
}

function checkValidityEmail() {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(document.getElementById('email').value)) {
        console.log('email invalid');
    }
}