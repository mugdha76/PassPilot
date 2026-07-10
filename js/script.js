// Select the elements
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

const strengthFill = document.getElementById("strength-fill");
const scoreText = document.getElementById("score");
const strengthText = document.getElementById("strength-text");

const lengthItem = document.getElementById("length");
const upperItem = document.getElementById("uppercase");
const lowerItem = document.getElementById("lowercase");
const numberItem = document.getElementById("number");
const symbolItem = document.getElementById("symbol");

const analysisList = document.getElementById("analysis-list");
const generateButton = document.getElementById("generatePassword");

// Show / Hide Password
togglePassword.addEventListener("click", () => {

    if(passwordInput.type === "password"){

        passwordInput.type = "text";
        togglePassword.textContent = "Hide";

    }else{

        passwordInput.type = "password";
        togglePassword.textContent = "Show";

    }

});

// Listen for typing/input listener
passwordInput.addEventListener("input", () => {

    const password = passwordInput.value;

    checkRequirements(password);

    const score = calculateScore(password);

    scoreText.textContent = score;

});
// Check Requirements
function checkRequirements(password){

    const hasLength = password.length >= 12;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[^A-Za-z0-9]/.test(password);

    updateRequirement(lengthItem, hasLength);
    updateRequirement(upperItem, hasUpper);
    updateRequirement(lowerItem, hasLower);
    updateRequirement(numberItem, hasNumber);
    updateRequirement(symbolItem, hasSymbol);

}

function calculateScore(password){

    let score = 0;

    if(password.length >= 12)
        score += 25;

    if(/[A-Z]/.test(password))
        score += 15;

    if(/[a-z]/.test(password))
        score += 15;

    if(/[0-9]/.test(password))
        score += 15;

    if(/[^A-Za-z0-9]/.test(password))
        score += 15;

    if(password.length >= 16)
        score += 15;

    return score;

}

// Update the Checklist
function updateRequirement(element, passed){

    const text = element.textContent.substring(2);

    if(passed){

        element.textContent = "✅ " + text;

    }else{

        element.textContent = "❌ " + text;

    }

}


