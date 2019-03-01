var teamMemmbersArray = [];
var errorsAmount = 0;
var errorsArray = [];
var $regionnotice = $('<div class="regionnotice help is-danger" tabindex="-1">'),
$errorHeading = $('<h3>Error! The form could not be submitted due to invalid entries.</h3><p>Please fix the following fields:</p>'),
$listOfErrors = $('<ol>'),
$usernameError = $('<p id="username-error" class="elementnotice help is-danger">Please enter a unique username</p>'),
$nameError = $('<p id="name-error" class="elementnotice help is-danger">Please enter your name</p>'),
$surnameError = $('<p id="surname-error" class="elementnotice help is-danger">Please enter your surname</p>'),
$addressError = $('<p id="address-error" class="elementnotice help is-danger">Please enter your address</p>'),
$phoneError = $('<p id="phone-error" class="elementnotice help is-danger">Please enter a phone number (for example, 123456789)</p>'),
$emailError = $('<p id="email-error" class="elementnotice help is-danger">Please enter a email (for example, name@address.com)</p>'),
$yearError = $('<p id="year-error" class="elementnotice help is-danger">Please enter your year of birth (for example, 1999)</p>'),
$emailValidationNotice = $('<p id="email-validation-notice">Email address validation started, please wait</p>'),
$emailValidationSuccess = $('<p id="email-validation-notice">Validation successful</p>'),
$emailValidationFail = $('<p id="email-validation-notice">Validation failed</p>');

document.querySelector('#submit-btn').addEventListener('click', addDataFromForm);
document.querySelector('#email').addEventListener('focusout', checkEmailUniqueness);

function addDataFromForm(e) {
    e.preventDefault();
    resetFormState();
    checkValidityUsername(); 
    checkValidityName();
    checkValiditySurname();
    checkValidityAddress();
    checkValidityPhone();
    checkValidityEmail();
    if(teamMemmbersArray.length !== 0) {
        console.log('unique email');
        checkEqualNameAndSurname();
    }

    if(!document.getElementById('year-of-birth').hasAttribute('disabled')) {
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

    alert('The form is successfully submitted');
}

function checkEmailUniqueness(e) {
    var that = this;
    console.log('focusout email');
    $('#email-field').append($emailValidationNotice);
    $('#email').attr('aria-describedby', 'email-validation-notice');

  $(that).focus();

    setTimeout(() => {
      teamMemmbersArray.forEach(element => {
        if(element.email === document.getElementById('email').value) {
            console.log('yes');
          $emailValidationNotice.remove();
          $('#email-field').append($emailValidationFail);
          $(that).focusout();
        } else {
          $emailValidationNotice.remove();
          $('#email-field').append($emailValidationSuccess);
          console.log('no');
          $(that).focusout();
        }
      });

    }, 3000)
}

function checkValidityUsername() {
    $usernameError.remove();

    if(document.getElementById('username').value === "") {
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
        errorsArray.push($('<li><a href="#email">Email - Please enter a email (for example, name@address.com)</a></li>'));
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
        errorsArray.push($('<li><a href="#phone-number">Phone number - Please enter a phone number (for example, 123456789)</a></li>'));
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
        errorsArray.push($('<li><a href="#name">Name - Please enter a name</a></li>'));
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
        errorsArray.push($('<li><a href="#surname">Surname - Please enter a surname</a></li>'));
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
        errorsArray.push($('<li><a href="#address">Address - Please enter an address</a></li>'));
    } else {
        document.getElementById('address').setAttribute('aria-invalid','false');
        document.getElementById('address').removeAttribute('aria-describedby');
    }       
}

function checkValidityYear() {
    $yearError.remove();
    
    if(!/^[1-9][0-9]{3}$/.test(document.getElementById('year-of-birth').value) || document.getElementById('year-of-birth').value === "") {
        errorsAmount++;
        document.getElementById('year-of-birth').setAttribute('aria-invalid','true');
        document.getElementById('year-of-birth').setAttribute('aria-describedby','year-error');
        $('#year-of-birth-field').append($yearError);
        errorsArray.push($('<li><a href="#year-of-birth">Year of birth - Please enter your year of birth (for example, 1999)</a></li>'));
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
    errorsArray.push($('<li><a href="#username">Username - Please enter a unique username</a></li>'));
}

function resetFormState() {
    $regionnotice.remove();
    $listOfErrors.empty();
    errorsAmount = 0;
    errorsArray = [];    
}


