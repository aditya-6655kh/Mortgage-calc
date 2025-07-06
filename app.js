const clearBtn = document.querySelector('.clear-form');
const form = document.querySelector('form');
const resultDiv = document.querySelector('.result-div');
const resultIllustration = document.querySelector('.result-illustration');
const resultText = document.querySelector('.result-text p');
const resultTitle = document.querySelector('.result-text h2');

clearBtn.addEventListener("click", (e) => {
    e.preventDefault();
    clearForm();
    clearErrors();
    clearResult();
});

form.addEventListener("submit", (e) =>{
    e.preventDefault();
    clearErrors();
    if(isEmpty()){
        showError();
        return;
    }
    calculateMortgage();
});

function isEmpty() {
    const amount = document.querySelector("#mortgage-amt").value.trim();
    const interestRate = document.querySelector("#interest-rate").value.trim();
    const term = document.querySelector("#loan-term").value.trim();
    const isRepayment = document.querySelector("#repayment").checked;
    const isInterestOnly = document.querySelector("#interest-only").checked;

    return !amount || !interestRate || !term || (!isRepayment && !isInterestOnly);
}

function clearErrors() {
    // Remove all error messages from DOM
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    
    // Remove all error classes
    document.querySelectorAll('.input-wrapper, .mortgage-type, .form-group, input')
        .forEach(el => el.classList.remove('error'));
    
    // Reset any error displays
    resultTitle.textContent = "Results shown here";
    resultText.textContent = "Complete the form and click \"calculate repayments\" to see what your monthly repayments would be.";
}

function showError() {
    const amount = document.querySelector("#mortgage-amt").value.trim();
    const interestRate = document.querySelector("#interest-rate").value.trim();
    const term = document.querySelector("#loan-term").value.trim();
    const isRepayment = document.querySelector("#repayment").checked;
    const isInterestOnly = document.querySelector("#interest-only").checked;

    // Add error classes to empty fields
    if(!amount) {
        const wrapper = document.querySelector("#mortgage-amt").parentElement;
        wrapper.classList.add('error');
        createErrorMessage(wrapper, "This field is required");
    }
    if(!interestRate) {
        const wrapper = document.querySelector("#interest-rate").parentElement;
        wrapper.classList.add('error');
        createErrorMessage(wrapper, "This field is required");
    }
    if(!term) {
        const wrapper = document.querySelector("#loan-term").parentElement;
        wrapper.classList.add('error');
        createErrorMessage(wrapper, "This field is required");
    }
    if(!isRepayment && !isInterestOnly) {
        const mortgageTypeContainer = document.querySelectorAll('.mortgage-type');
        mortgageTypeContainer.forEach(el => {
            el.classList.add('error');
        });
        const mortgageTypeLabel = document.querySelector('#mortgage-type-label');
        createErrorMessage(mortgageTypeLabel, "This field is required");
    }

    // Show error message
    resultTitle.textContent = "Error";
    resultText.textContent = "Please fill in all fields before calculating.";
}

function createErrorMessage(wrapper, message){
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';

    errorMessage.textContent = message;
    wrapper.parentNode.insertBefore(errorMessage, wrapper.nextSibling);
}

function clearForm() {
    form.reset();
    document.querySelector("#repayment").checked = false;
    document.querySelector("#interest-only").checked = false;
}

function clearResult() {
    resultDiv.classList.add('hidden');
    resultIllustration.classList.remove('hidden');
    resultTitle.textContent = "Mortgage Repayment Calculator";
    resultText.textContent = "Complete the form and click \“calculate repayments\” to see what your monthly repayments would be.";
}

function calculateMortgage() {
    const amount = parseFloat(document.querySelector("#mortgage-amt").value.replace(/,/g, ''));
    const interestRate = parseFloat(document.querySelector("#interest-rate").value)/100;
    const term = parseFloat(document.querySelector("#loan-term").value)*12;
    const isRepayment = document.querySelector("#repayment").checked;

    let monthlyPayment, totalPayment;
    if(isRepayment){
        const monthlyRate = interestRate/12;

        monthlyPayment = amount * 
                        (monthlyRate * Math.pow(1 + monthlyRate, term)) / 
                        (Math.pow(1 + monthlyRate, term) - 1);
        
        totalPayment = monthlyPayment * term;
    }else{
        monthlyPayment = amount * (interestRate / 12);
        totalPayment = monthlyPayment * term;
    }

    displayResult(monthlyPayment, totalPayment, isRepayment);
}

function displayResult(monthlyPayment, totalPayment, isRepayment){
    resultIllustration.classList.add('hidden');
    resultTitle.textContent = "Your results";
    resultText.textContent = `Your results are shown below based on the information you provided. To adjust the results, edit the form and click \"calculate repayments\" again.`;

    const resultItemHTML = `
        <h3>Your monthly repayments</h3>
        <div class="result-item">
            <p>£${monthlyPayment.toLocaleString('en-GB', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
        </div>
        <hr>
        <div class="result-item">
            <p>Total you'll repay over the term</p>
            <p>£${totalPayment.toLocaleString('en-GB', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
        </div>
    `;
    document.querySelector('.result-div').innerHTML = resultItemHTML;
    resultDiv.classList.remove('hidden');
}

