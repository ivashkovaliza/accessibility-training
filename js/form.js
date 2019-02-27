
document.querySelector('#submit-btn').addEventListener('click', addDataFromForm);
var teamMemmbersArray = [];
var errorsAmount = 0;
var errorsArray = [];
var $regionnotice = $('<div class="regionnotice help is-danger" tabindex="-1">'),
$errorHeading = $('<h3>Error! The form could not be submitted due to invalid entries.</h3><p>Please fix the following fields:</p>'),
$listOfErrors = $('<ol>'),
$usernameError = $('<p id="username-error" class="elementnotice help is-danger">This username is unavailable, please enter new username</p>');

function addDataFromForm(e) {
    e.preventDefault();
    resetFormState();
    checkValidityUsername();   
    if(errorsAmount) {
        $regionnotice.append($errorHeading);
        $regionnotice.append($listOfErrors);
        errorsArray.forEach( element => {
            $listOfErrors.append(element)
        });
        $('#team-registration-form').prepend($regionnotice);
        $regionnotice.focus();
        return;
    } 
    //checkValidityEmail();
    //checkValidityPhone();
    //checkEqualNameAndSurname();
    //if(!document.getElementById('year-of-birth').hasAttribute('disabled')) {
      //  checkValidityYear();
    //}    

    teamMemmbersArray.push({
        username: document.getElementById('username').value,
        //name: document.getElementById('name').value,
        //surname: document.getElementById('surname').value,
        //phoneNumber: document.getElementById('phone-number').value,
        //address: document.getElementById('address').value,
        //yearOfBirth: document.getElementById('year-of-birth').value,
        //postcode: document.getElementById('postcode').value,
        //email: document.getElementById('email').value
    });
    console.log(teamMemmbersArray);
    //resetFormValues();
    alert('The form is successfully submitted');
}

function resetFormValues() {
    document.querySelector("#team-registration-form").reset();
}

function checkValidityUsername() {
    $usernameError.remove();
    teamMemmbersArray.forEach(element => {
        if(element.username === document.getElementById('username').value || document.getElementById('username').value === "") {
            errorsAmount++;
            $('#username-field').append($usernameError);
            errorsArray.push($('<li><a href="#username">This username is unavailable, please enter new username</a></li>'));
        } else {
            document.getElementById('username').setAttribute('aria-invalid','false');
        }
    });    
}

function checkValidityEmail() {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(document.getElementById('email').value)) {
        console.log('email invalid');
    }
}

function checkValidityPhone() {   
    if(!/^[0-9]+$/.test(document.getElementById('phone-number').value)) {
        console.log('phone invalid');
    }        
}

function checkEqualNameAndSurname() {
    teamMemmbersArray.forEach(element => {
        if(element.name === document.getElementById('name').value && element.surname === document.getElementById('surname').value) {
            document.getElementById('year-of-birth').removeAttribute('disabled');
            document.getElementById('year-of-birth').setAttribute('aria-disabled','true');
        }
    });
}

function checkValidityYear() {
    if(!/^[1-9][0-9]{3}$/.test(document.getElementById('year-of-birth').value)) {
        console.log('year of birth invalid');
    }
}

function resetFormState() {
    $regionnotice.remove();
    errorsAmount = 0;
}