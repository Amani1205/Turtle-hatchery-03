
//getting references to interactive elements 
const Cardnum = document.getElementById("cardNum");
const expiry = document.getElementById("expiry");
const CVV = document.getElementById("CVV");
const Cardname = document.getElementById("name");
const form = document.getElementById("payment");
const btnPay = document.getElementById("pay");


//add eventlisteners 
window.addEventListener("load",load_sumtble);
Cardnum.addEventListener ("input",check_number);
expiry.addEventListener("input",check_expiry);
CVV.addEventListener("input",check_CVV);
Cardname.addEventListener("input", check_Cardname);
btnPay.addEventListener("click",redirect);



function load_sumtble(){
    let summaryTable = document.getElementById("summary_tbl");
    const storedTableContent = localStorage.getItem("summaryTable");
    summaryTable.innerHTML = storedTableContent;
}

function check_number(){
    // console.log("hi");
    validateCardNumber();
    validateForm();
}

function check_expiry(){
    validateExpiryDate();
    validateForm();
}
function check_CVV (){
    // console.log("CVV");
    validateCVV();
    validateForm();
}

function check_Cardname(){
    // console.log("check")
    validateCardName();
    validateForm();
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

const validateCardNumber = () => {
    const value = Cardnum.value.trim();
    const cardNumRegex = /^[0-9]+$/;


    if (value === '') {
        setError(Cardnum, 'Card Number is required');
    } else if (!cardNumRegex.test(value)) {
        setError(Cardnum, 'Invalid Card Number');
    } else if (value.length !== 16) {
        setError(Cardnum, 'Invalid Card Number');
    } else {
        setSuccess(Cardnum);
    }
};

const validateExpiryDate = () => {
    const value = expiry.value.trim();
    // Expiry date validation rule: Check if the date is in the future and matches MM/YY format
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const currentDate = new Date();
    const [enteredMonth, enteredYear] = value.split('/').map(item => parseInt(item, 10));
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    if (value === '') {
        setError(expiry, 'Expiry Date is required');
    } else if (!expiryDateRegex.test(value)) {
        setError(expiry, 'Invalid Expiry Date (use MM/YY format)');
    } else if (enteredYear < currentYear || (enteredYear === currentYear && enteredMonth < currentMonth)) {
        setError(expiry, 'Card has expired');
    } else {
        setSuccess(expiry);
    }
};

const validateCVV = () => {
    const value = CVV.value.trim();
    const cvvRegex = /^[0-9]+$/;


    if (value === '') {
        setError(CVV, 'CVV is required');
    } else if (!cvvRegex.test(value)) {
        setError(CVV, 'Invalid CVV');
    } else if (value.length !== 3) {
        setError(CVV, 'Invalid CVV');
    } else {
        setSuccess(CVV);
    }
};

const validateCardName = () => {
    const value = Cardname.value.trim();
    // Card name validation rule: Only alphabetic characters and spaces
    const cardNameRegex = /^[A-Za-z ]+$/;

    if (value === '') {
        setError(Cardname, 'Card Name is required');
    } else if (!cardNameRegex.test(value)) {
        setError(Cardname, 'Invalid Card Name (use only alphabetic characters)');
    } else {
        setSuccess(Cardname);
    }
};

const validateForm = () => {
    const allFieldsValid = (
        Cardnum.parentElement.classList.contains('success') &&
        expiry.parentElement.classList.contains('success') &&
        CVV.parentElement.classList.contains('success') &&
        Cardname.parentElement.classList.contains('success')
    );

    btnPay.disabled = !allFieldsValid;
};


//read payable amount
const payable= document.getElementById("payable_amount");
payable.innerText= localStorage.getItem("totalPayable");



function redirect(event){
    event.preventDefault();
    window.location.href= './confirmation.html'
}

 