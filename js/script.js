// Select the elements
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const copyButton = document.getElementById("copyPassword");
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

    updatePasswordAnalysis(passwordInput.value);

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

    /* ---------- Penalties ---------- */

    if(isCommonPassword(password)){
        score -= 40;
    }

    const warnings = detectPattern(password);

    score -= warnings.length * 20;

    /* Prevent negative score */

    if(score < 0){
        score = 0;
    }

    return score;

}

function updateStrength(score){

    let strength = "";
    let color = "";

    if(score < 30){
        strength = "Very Weak";
        color = "#dc2626";
    }
    else if(score < 50){
        strength = "Weak";
        color = "#ea580c";
    }
    else if(score < 70){
        strength = "Fair";
        color = "#ca8a04";
    }
    else if(score < 90){
        strength = "Strong";
        color = "#16a34a";
    }
    else{
        strength = "Excellent";
        color = "#15803d";
    }

    strengthText.textContent = strength;
    strengthText.style.color = color;

    strengthFill.style.width = score + "%";
    strengthFill.style.backgroundColor = color;

}
function isCommonPassword(password){

    return commonPasswords.includes(password.toLowerCase());

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

function detectPattern(password){

    let warnings = [];

    const repeatedPattern = /(.)\1{2,}/;
    const sequentialPattern = /123|234|345|456|567|678|789|abc|bcd|cde|def|qwerty|asdf|zxcv/i;

    if(repeatedPattern.test(password)){
        warnings.push("Repeated characters detected.");
    }

    if(sequentialPattern.test(password)){
        warnings.push("Predictable sequence detected.");
    }

    return warnings;

}
function updateAnalysis(password){

        analysisList.innerHTML = "";
        if(isCommonPassword(password)){

                const li = document.createElement("li");

                li.textContent =
                "🚨 This is a commonly used password.";

                analysisList.appendChild(li);

            }
        const warnings = detectPattern(password);

        warnings.forEach(warning => {

            const li = document.createElement("li");

            li.textContent = "⚠ " + warning;

            analysisList.appendChild(li);

        });
        if(analysisList.children.length === 0){

        const li = document.createElement("li");

        li.textContent = "✅ No obvious weaknesses detected.";

        analysisList.appendChild(li);

    }
}
function generatePassword(){

    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    const allCharacters =
        uppercase +
        lowercase +
        numbers +
        symbols;

    let password = "";

    // Guarantee one of each
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];

    // Fill the remaining characters
    for(let i = 4; i < 16; i++){

        const randomIndex =
            Math.floor(Math.random() * allCharacters.length);

        password += allCharacters[randomIndex];

    }

    return shufflePassword(password);

}
function shufflePassword(password){

    const array = password.split("");

    for(let i = array.length - 1; i > 0; i--){

        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];

    }

    return array.join("");

}
generateButton.addEventListener("click", () => {

    const password = generatePassword();

    passwordInput.value = password;

    updatePasswordAnalysis(password);

});
function updatePasswordAnalysis(password){

    checkRequirements(password);

    const score = calculateScore(password);

    scoreText.textContent = score;

    updateStrength(score);

    updateAnalysis(password);

}
copyButton.addEventListener("click", async () => {

    if(passwordInput.value === "")
        return;

    await navigator.clipboard.writeText(passwordInput.value);

    copyButton.textContent = "Copied!";

    setTimeout(() => {

        copyButton.textContent = "Copy";

    },1500);

});