

function updateSelectedDialCode() {
    // Find the selected country element with class "iti__active"
    const selectedCountryElement = document.querySelector('.iti__active');

    if (selectedCountryElement) {
        // Extract the dial code from the selected element
        const dialCodeElement = selectedCountryElement.querySelector('.iti__dial-code');
        const selectedDialCode = dialCodeElement ? dialCodeElement.textContent : null;

        // Display the selected dial code (without plus symbol) in the input
        const inputElement = document.getElementById('mobileNumber');
        if (inputElement) {
            inputElement.value = selectedDialCode.replace('+', ''); // Remove plus symbol and set dial code as the new input value
        }
    }
}

// Initial update when the page loads
updateSelectedDialCode();

// Set up an event listener for changes in the selected country
document.addEventListener('click', function(event) {
    const targetElement = event.target;

    // Check if the clicked element is part of the country list
    if (targetElement.closest('.iti__country')) {
        // Clear the input field and update the selected dial code
        const inputElement = document.getElementById('mobileNumber');
        if (inputElement) {
            inputElement.value = ''; // Clear the input field
            setTimeout(updateSelectedDialCode, 100); // Update the selected dial code after clearing
        }
    }
});


const form = document.getElementById('detailsform');
const fName = document.getElementById('fullName');
const Email = document.getElementById('email');
const ConfirmEmail = document.getElementById('confirmEmail');
const MobileNum = document.getElementById('mobileNumber');
const continueBtn = document.getElementById('continue1');
const gender= document.getElementById('gender');

window.addEventListener("load",load_sumtble);
fName.addEventListener("input",check_fName );
Email.addEventListener ("input",check_email);
ConfirmEmail.addEventListener("input",check_confemail);
MobileNum.addEventListener("input",check_number);


function load_sumtble(){
    let summaryTable = document.getElementById("summary_tbl");
    const storedTableContent = localStorage.getItem("summaryTable");
    summaryTable.innerHTML = storedTableContent;
}

function check_fName(){
    validatefName();
    validateAllFields();
}

function check_email(){
    validateEmail();
    validateAllFields();
}

function check_confemail(){
    validateConfirmEmail();
    validateAllFields();
}

function check_number(){
    validateMobileNum();
    validateAllFields();
}



const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


const validatefName = () => {
    const fNameValue = fName.value.trim();
    const fNameRegex = /^[A-Za-z ]+$/;


    if (fNameValue === '') {
        setError(fName, 'Full Name is required');
    } else if(!fNameRegex.test(fNameValue)) {
        setError(fName, 'Invalid (Use only alphabetic characters)');
    } else {
        setSuccess(fName);
    }
};

const validateEmail = () => {
    const EmailValue = Email.value.trim();

    if (EmailValue === '') {
        setError(Email, 'Email is required');
    } else if (!isValidEmail(EmailValue)) {
        setError(Email, 'Provide a valid email address');
    } else {
        setSuccess(Email);
    }
};

const validateConfirmEmail = () => {
    const ConfirmEmailValue = ConfirmEmail.value.trim();
    const EmailValue = Email.value.trim();

    if (ConfirmEmailValue === '') {
        setError(ConfirmEmail, 'Please confirm your email');
    } else if (ConfirmEmailValue !== EmailValue) {
        setError(ConfirmEmail, 'Emails must match.')
    } else {
        setSuccess(ConfirmEmail);
    }
};

const validateMobileNum = () => {
    const MobileNumValue = MobileNum.value.trim();

    if (MobileNumValue === '') {
        setError(MobileNum, 'Mobile number is required');
    } else if (MobileNumValue.length < 9 || MobileNumValue.length > 15) {
        setError(MobileNum, 'Enter a valid phone number');
    } else {
        setSuccess(MobileNum);
    }
};

const validateAllFields = () => {
    const allFieldsValid = (
        fName.parentElement.classList.contains('success') &&
        Email.parentElement.classList.contains('success') &&
        ConfirmEmail.parentElement.classList.contains('success') &&
        MobileNum.parentElement.classList.contains('success')
    );

    continueBtn.disabled = !allFieldsValid;
};


continueBtn.addEventListener("click", (event) => {
    event.preventDefault();
    localStorage.setItem("fName", fName.value);
    localStorage.setItem("Email", Email.value);
    localStorage.setItem("MobileNum", MobileNum.value);
    localStorage.setItem("gender",gender.value);
    window.location.href = './payment.html';
});



continueBtn.addEventListener("click", () => {
    let summaryTable = document.getElementById("summary_tbl");
    let rows = summaryTable.getElementsByTagName("tr");
    
    // let partialTable = document.createElement("table");
    let tbody = document.createElement("tbody");
    
    for (let i = 4; i < rows.length; i++) { // Start from the 5th row
      let newRow = document.createElement("tr");
      newRow.innerHTML = rows[i].innerHTML;
      tbody.appendChild(newRow);
    }
    
    // partialTable.appendChild(tbody);
    
    localStorage.setItem("newTable", tbody.innerHTML);
    
  });























  

