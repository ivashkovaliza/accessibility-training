
document.querySelector('#submit-btn').addEventListener('click', addDataFromForm);
var teamMemmbersArray = [];
var errorsAmount = 0;
var errorsArray = [];
var $regionnotice = $('<div class="regionnotice help is-danger" tabindex="-1">'),
$errorHeading = $('<h3>Error! The form could not be submitted due to invalid entries.</h3><p>Please fix the following fields:</p>'),
$listOfErrors = $('<ol>'),
$usernameError = $('<p id="username-error" class="elementnotice help is-danger">This username is unavailable, please enter new username</p>');
$nameError = $('<p id="name-error" class="elementnotice help is-danger">Please enter your name</p>');
$surnameError = $('<p id="surname-error" class="elementnotice help is-danger">Please enter your surname</p>');
$addressError = $('<p id="address-error" class="elementnotice help is-danger">Please enter your address</p>');
$phoneError = $('<p id="phone-error" class="elementnotice help is-danger">Please enter your phone</p>');
$emailError = $('<p id="email-error" class="elementnotice help is-danger">Please enter your email</p>');
$yearError = $('<p id="year-error" class="elementnotice help is-danger">Please enter your year of birth</p>');

function addDataFromForm(e) {
    e.preventDefault();
    resetFormState();
    checkValidityUsername(); 
    checkValidityName();
    checkValiditySurname();
    checkValidityAddress();
    checkValidityPhone();
    checkValidityEmail();
    checkEqualNameAndSurname();

    if(!document.getElementById('year-of-birth').hasAttribute('disabled')) {
        console.log('Year error');
        checkValidityYear();
    }

    if(errorsAmount) {
        teamMemmbersArray.pop();
        $regionnotice.append($errorHeading);
        $regionnotice.append($listOfErrors);
        errorsArray.forEach( element => {
            $listOfErrors.append(element)
        });
        $('#team-registration-form').prepend($regionnotice);
        $regionnotice.focus();
        return;
    }     

    teamMemmbersArray.push({
        username: document.getElementById('username').value,
        name: document.getElementById('name').value,
        surname: document.getElementById('surname').value,
        phoneNumber: document.getElementById('phone-number').value,
        address: document.getElementById('address').value,
        yearOfBirth: document.getElementById('year-of-birth').value,
        postcode: document.getElementById('postcode').value,
        email: document.getElementById('email').value
    });
  
    console.log(teamMemmbersArray);
    alert('The form is successfully submitted');
}

function checkValidityUsername() {
    $usernameError.remove();

    if(document.getElementById('username').value === "") {
        console.log('username-empty');
        createUsernameError()
    } else {
        document.getElementById('username').setAttribute('aria-invalid','false');
        document.getElementById('username').removeAttribute('aria-describedby');
    }

    teamMemmbersArray.forEach(element => {
        if(element.username === document.getElementById('username').value) {
            createUsernameError();            
        } else {
            document.getElementById('username').setAttribute('aria-invalid','false');
            document.getElementById('username').removeAttribute('aria-describedby');
        }
    });    
}

function checkValidityEmail() {
    $emailError.remove();
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if(!re.test(document.getElementById('email').value)) {
        errorsAmount++;
        document.getElementById('email').setAttribute('aria-describedby','email-error');
        document.getElementById('email').setAttribute('aria-invalid','true');
        $('#email-field').append($emailError);
        errorsArray.push($('<li><a href="#email">Please enter a email</a></li>'));
    }   else {
        document.getElementById('email').setAttribute('aria-invalid','false');
        document.getElementById('email').removeAttribute('aria-describedby');
    }  
}

function checkValidityPhone() {
    $phoneError.remove();

    if(!/^[0-9]+$/.test(document.getElementById('phone-number').value) || document.getElementById('phone-number').value === "") {
        errorsAmount++;
        document.getElementById('phone-number').setAttribute('aria-describedby','username-error');
        document.getElementById('phone-number').setAttribute('aria-invalid','true');
        $('#phone-field').append($phoneError);
        errorsArray.push($('<li><a href="#phone-number">Please enter a phone</a></li>'));
    }   else {
        document.getElementById('phone-number').setAttribute('aria-invalid','false');
        document.getElementById('phone-number').removeAttribute('aria-describedby');
    }     
}

function checkEqualNameAndSurname() {
    $yearError.remove();
    
    teamMemmbersArray.forEach(element => {
        if(element.name === document.getElementById('name').value && element.surname === document.getElementById('surname').value) {
            errorsAmount++;
            document.getElementById('year-of-birth').removeAttribute('disabled');
            document.getElementById('year-of-birth').setAttribute('aria-disabled','false');
        }
    });
}

function checkValidityName() {
    $nameError.remove();
    
    if(document.getElementById('name').value === "") {
        errorsAmount++;
        document.getElementById('name').setAttribute('aria-describedby','username-error');
        document.getElementById('name').setAttribute('aria-invalid','true');
        $('#name-field').append($nameError);
        errorsArray.push($('<li><a href="#name">Please enter a name</a></li>'));
    } else {
        document.getElementById('name').setAttribute('aria-invalid','false');
        document.getElementById('name').removeAttribute('aria-describedby');
    }       
}

function checkValiditySurname() {
    $surnameError.remove();
    
    if(document.getElementById('surname').value === "") {
        errorsAmount++;
        document.getElementById('surname').setAttribute('aria-describedby','surname-error');
        document.getElementById('surname').setAttribute('aria-invalid','true');
        $('#surname-field').append($surnameError);
        errorsArray.push($('<li><a href="#surname">Please enter a surname</a></li>'));
    } else {
        document.getElementById('surname').setAttribute('aria-invalid','false');
        document.getElementById('surname').removeAttribute('aria-describedby');
    }       
}

function checkValidityAddress() {
    $addressError.remove();
    
    if(document.getElementById('address').value === "") {
        errorsAmount++;
        document.getElementById('address').setAttribute('aria-describedby','address-error');
        document.getElementById('address').setAttribute('aria-invalid','true');
        $('#address-field').append($addressError);
        errorsArray.push($('<li><a href="#address">Please enter an address</a></li>'));
    } else {
        document.getElementById('address').setAttribute('aria-invalid','false');
        document.getElementById('address').removeAttribute('aria-describedby');
    }       
}

function checkValidityYear() {
    $yearError.remove();
    
    if(!/^[1-9][0-9]{3}$/.test(document.getElementById('year-of-birth').value) || document.getElementById('year-of-birth').value === "") {
        console.log('checkValidityYear invalid')
        errorsAmount++;
        document.getElementById('year-of-birth').setAttribute('aria-invalid','true');
        document.getElementById('year-of-birth').setAttribute('aria-describedby','year-error');
        $('#year-of-birth-field').append($yearError);
        errorsArray.push($('<li><a href="#year-of-birth">Please enter your year of birth</a></li>'));
    } else {
        document.getElementById('year-of-birth').setAttribute('aria-invalid','false');
        document.getElementById('year-of-birth').removeAttribute('aria-describedby');
    } 
}

function createUsernameError() {
    errorsAmount++;
    document.getElementById('username').setAttribute('aria-describedby','username-error');
    document.getElementById('username').setAttribute('aria-invalid','true');
    $('#username-field').append($usernameError);
    errorsArray.push($('<li><a href="#username">Please enter a unique username</a></li>'));
}

function resetFormState() {
    $regionnotice.remove();
    $listOfErrors.empty();
    errorsAmount = 0;
    errorsArray = [];    
}