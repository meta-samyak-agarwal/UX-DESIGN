// Define Data Object
var userData = {
    employee: {
        fullName: '',
        gender: '',
        email: '',
        password: '',
        contactNumber: '',
        id: ''
    },
    vehicle: {
        name: '',
        type: '',
        number: '',
        employeeId: '',
        identification: ''
    },
    pass: {
        type: '',
        price: 0,
        currency: 'INR'
    }
};
// Pricing in USD (base currency)
var pricing = {
    Cycle: { daily: 0.06, monthly: 1.2, yearly: 6 },
    MotorCycle: { daily: 0.12, monthly: 2.4, yearly: 12 },
    FourWheeler: { daily: 0.24, monthly: 6, yearly: 42 }
};
// Exchange rates
var exchangeRates = {
    USD: 1,
    INR: 83.5,
    YEN: 152
};
// Validate Name Field
var nameField = document.getElementById('fullName');
var nameError = document.getElementById('nameError');
nameField.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        validateName();
    }
});
function validateName() {
    var _a, _b;
    var name = nameField.value.trim();
    var nameRegex = /^[a-zA-Z\s]{2,}$/;
    if (!name) {
        nameError.textContent = 'Name is required';
        return false;
    }
    else if (!nameRegex.test(name)) {
        nameError.textContent = 'Name must be at least 2 characters and should not contain numbers';
        return false;
    }
    else {
        nameError.textContent = '';
        userData.employee.fullName = name;
        (_a = document.getElementById('nameField')) === null || _a === void 0 ? void 0 : _a.classList.add('hidden');
        (_b = document.getElementById('genderField')) === null || _b === void 0 ? void 0 : _b.classList.remove('hidden');
        var genderLabel = document.getElementById('genderLabel');
        if (genderLabel) {
            genderLabel.textContent = "Hi ".concat(name.split(' ')[0], "! Can I know your gender?");
        }
        return true;
    }
}
// Gender Selection Handling
var genderOptions = document.querySelectorAll('input[name="gender"]');
genderOptions.forEach(function (option) {
    option.addEventListener('change', function () {
        var _a, _b;
        userData.employee.gender = this.value;
        (_a = document.getElementById('genderField')) === null || _a === void 0 ? void 0 : _a.classList.add('hidden');
        (_b = document.getElementById('emailField')) === null || _b === void 0 ? void 0 : _b.classList.remove('hidden');
    });
});
// Validate Email Field
var emailField = document.getElementById('email');
var emailError = document.getElementById('emailError');
emailField.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        validateEmail();
    }
});
function validateEmail() {
    var _a, _b;
    var email = emailField.value.trim();
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        emailError.textContent = 'Email is required';
        return false;
    }
    else if (!emailRegex.test(email)) {
        emailError.textContent = 'Please enter a valid email address';
        return false;
    }
    else {
        emailError.textContent = '';
        userData.employee.email = email;
        (_a = document.getElementById('emailField')) === null || _a === void 0 ? void 0 : _a.classList.add('hidden');
        (_b = document.getElementById('passwordField')) === null || _b === void 0 ? void 0 : _b.classList.remove('hidden');
        return true;
    }
}
// validte the password field 
// Validate Password Field
var passwordField = document.getElementById('password');
var passwordError = document.getElementById('passwordError');
var passwordStrength = document.getElementById('passwordStrength');
passwordField.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        validatePassword();
    }
});
passwordField.addEventListener('input', function () {
    checkPasswordStrength(this.value);
});
function checkPasswordStrength(password) {
    var strength = 0;
    if (password.length >= 8)
        strength += 1;
    if (/[A-Z]/.test(password))
        strength += 1;
    if (/[a-z]/.test(password))
        strength += 1;
    if (/[0-9]/.test(password))
        strength += 1;
    if (/[^A-Za-z0-9]/.test(password))
        strength += 1;
    if (strength < 3) {
        passwordField.style.borderColor = '#dc3545'; // Red - Weak
        passwordStrength.textContent = 'Weak password';
        passwordStrength.style.color = '#dc3545';
    }
    else if (strength < 5) {
        passwordField.style.borderColor = '#fd7e14'; // Orange - Normal
        passwordStrength.textContent = 'Medium password';
        passwordStrength.style.color = '#fd7e14';
    }
    else {
        passwordField.style.borderColor = '#28a745'; // Green - Strong
        passwordStrength.textContent = 'Strong password';
        passwordStrength.style.color = '#28a745';
    }
}
function validatePassword() {
    var _a, _b;
    var password = passwordField.value;
    if (!password) {
        passwordError.textContent = 'Password is required';
        return false;
    }
    else if (password.length < 8) {
        passwordError.textContent = 'Password must be at least 8 characters long';
        return false;
    }
    else if (!/[A-Z]/.test(password)) {
        passwordError.textContent = 'Password must contain at least one uppercase letter';
        return false;
    }
    else if (!/[a-z]/.test(password)) {
        passwordError.textContent = 'Password must contain at least one lowercase letter';
        return false;
    }
    else if (!/[0-9]/.test(password)) {
        passwordError.textContent = 'Password must contain at least one number';
        return false;
    }
    else if (!/[^A-Za-z0-9]/.test(password)) {
        passwordError.textContent = 'Password must contain at least one special character';
        return false;
    }
    else {
        passwordError.textContent = '';
        userData.employee.password = password;
        (_a = document.getElementById('passwordField')) === null || _a === void 0 ? void 0 : _a.classList.add('hidden');
        (_b = document.getElementById('confirmPasswordField')) === null || _b === void 0 ? void 0 : _b.classList.remove('hidden');
        return true;
    }
}
// Validate Confirm Password Field
var confirmPasswordField = document.getElementById('confirmPassword');
var confirmPasswordError = document.getElementById('confirmPasswordError');
confirmPasswordField.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        validateConfirmPassword();
    }
});
function validateConfirmPassword() {
    var _a, _b;
    var confirmPassword = confirmPasswordField.value;
    if (!confirmPassword) {
        confirmPasswordError.textContent = 'Please confirm your password';
        return false;
    }
    else if (confirmPassword !== userData.employee.password) {
        confirmPasswordError.textContent = 'Passwords do not match';
        return false;
    }
    else {
        confirmPasswordError.textContent = '';
        (_a = document.getElementById('confirmPasswordField')) === null || _a === void 0 ? void 0 : _a.classList.add('hidden');
        (_b = document.getElementById('contactField')) === null || _b === void 0 ? void 0 : _b.classList.remove('hidden');
        return true;
    }
}
// Validate Contact Number Field
var contactField = document.getElementById('contactNumber');
var contactError = document.getElementById('contactError');
contactField.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        validateContact();
    }
});
function validateContact() {
    var contact = contactField.value.trim();
    var contactRegex = /^\d{8,}$/;
    if (!contact) {
        contactError.textContent = 'Contact number is required';
        return false;
    }
    else if (!contactRegex.test(contact)) {
        contactError.textContent = 'Contact number must be at least 8 digits';
        return false;
    }
    else {
        contactError.textContent = '';
        userData.employee.contactNumber = contact;
        completeEmployeeRegistration();
        return true;
    }
}
function completeEmployeeRegistration() {
    var _a, _b;
    var id = 'EMP' + Math.floor(10000 + Math.random() * 90000);
    userData.employee.id = id;
    (_a = document.getElementById('employeeRegistration')) === null || _a === void 0 ? void 0 : _a.classList.add('hidden');
    (_b = document.getElementById('registrationSuccess')) === null || _b === void 0 ? void 0 : _b.classList.remove('hidden');
    var employeeIdElement = document.getElementById('employeeId');
    if (employeeIdElement) {
        employeeIdElement.textContent = id;
    }
    setTimeout(function () {
        var _a, _b;
        (_a = document.getElementById('registrationSuccess')) === null || _a === void 0 ? void 0 : _a.classList.add('hidden');
        (_b = document.getElementById('vehicleRegistration')) === null || _b === void 0 ? void 0 : _b.classList.remove('hidden');
    }, 3000);
}
// Validate Vehicle Name Field
var vehicleNameField = document.getElementById('vehicleName');
var vehicleNameError = document.getElementById('vehicleNameError');
vehicleNameField.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        validateVehicleName();
    }
});
function validateVehicleName() {
    var _a, _b;
    var name = vehicleNameField.value.trim();
    if (!name) {
        vehicleNameError.textContent = 'Vehicle name is required';
        return false;
    }
    else {
        vehicleNameError.textContent = '';
        userData.vehicle.name = name;
        (_a = document.getElementById('vehicleNameField')) === null || _a === void 0 ? void 0 : _a.classList.add('hidden');
        (_b = document.getElementById('vehicleTypeField')) === null || _b === void 0 ? void 0 : _b.classList.remove('hidden');
        return true;
    }
}
// Handle Vehicle Type Selection
var vehicleTypeField = document.getElementById('vehicleType');
var vehicleTypeError = document.getElementById('vehicleTypeError');
vehicleTypeField.addEventListener('change', function () {
    var _a, _b;
    if (this.value) {
        vehicleTypeError.textContent = '';
        userData.vehicle.type = this.value;
        (_a = document.getElementById('vehicleTypeField')) === null || _a === void 0 ? void 0 : _a.classList.add('hidden');
        (_b = document.getElementById('vehicleNumberField')) === null || _b === void 0 ? void 0 : _b.classList.remove('hidden');
    }
    else {
        vehicleTypeError.textContent = 'Please select a vehicle type';
    }
});
// Validate Vehicle Number Field
var vehicleNumberField = document.getElementById('vehicleNumber');
var vehicleNumberError = document.getElementById('vehicleNumberError');
vehicleNumberField.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        validateVehicleNumber();
    }
});
function validateVehicleNumber() {
    var _a, _b;
    var number = vehicleNumberField.value.trim();
    if (!number) {
        vehicleNumberError.textContent = 'Vehicle number is required';
        return false;
    }
    else {
        vehicleNumberError.textContent = '';
        userData.vehicle.number = number;
        (_a = document.getElementById('vehicleNumberField')) === null || _a === void 0 ? void 0 : _a.classList.add('hidden');
        (_b = document.getElementById('empIdField')) === null || _b === void 0 ? void 0 : _b.classList.remove('hidden');
        var empIdElement = document.getElementById('empId');
        if (empIdElement) {
            empIdElement.value = userData.employee.id;
        }
        userData.vehicle.employeeId = userData.employee.id;
        setTimeout(function () {
            var _a, _b;
            (_a = document.getElementById('empIdField')) === null || _a === void 0 ? void 0 : _a.classList.add('hidden');
            (_b = document.getElementById('identificationField')) === null || _b === void 0 ? void 0 : _b.classList.remove('hidden');
        }, 1000);
        return true;
    }
}
// Validate Identification Field
var identificationField = document.getElementById('identification');
var identificationError = document.getElementById('identificationError');
identificationField.addEventListener('keypress', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        validateIdentification();
    }
});
function validateIdentification() {
    var identification = identificationField.value.trim();
    if (!identification) {
        identificationError.textContent = 'Identification details are required';
        return false;
    }
    else {
        identificationError.textContent = '';
        userData.vehicle.identification = identification;
        completeVehicleRegistration();
        return true;
    }
}
function completeVehicleRegistration() {
    var _a, _b;
    (_a = document.getElementById('vehicleRegistration')) === null || _a === void 0 ? void 0 : _a.classList.add('hidden');
    (_b = document.getElementById('vehicleSuccess')) === null || _b === void 0 ? void 0 : _b.classList.remove('hidden');
    setTimeout(function () {
        var _a, _b;
        (_a = document.getElementById('vehicleSuccess')) === null || _a === void 0 ? void 0 : _a.classList.add('hidden');
        (_b = document.getElementById('passSelection')) === null || _b === void 0 ? void 0 : _b.classList.remove('hidden');
        updatePricing();
    }, 2000);
}
// Currency Selector
var currencySelector = document.getElementById('currencySelector');
currencySelector.addEventListener('change', function () {
    userData.pass.currency = this.value; // Type assertion
    updatePricing();
});
// Update Pricing Display
function updatePricing() {
    if (!userData.vehicle.type)
        return;
    var selectedCurrency = userData.pass.currency;
    var vehicleType = userData.vehicle.type;
    var dailyPrice = pricing[vehicleType].daily * exchangeRates[selectedCurrency];
    var monthlyPrice = pricing[vehicleType].monthly * exchangeRates[selectedCurrency];
    var yearlyPrice = pricing[vehicleType].yearly * exchangeRates[selectedCurrency];
    var currencySymbols = {
        INR: '₹',
        USD: '$',
        YEN: '¥'
    };
    var currencySymbol = currencySymbols[selectedCurrency] || '';
    document.getElementById('dailyPrice').textContent = "".concat(currencySymbol).concat(dailyPrice.toFixed(2));
    document.getElementById('monthlyPrice').textContent = "".concat(currencySymbol).concat(monthlyPrice.toFixed(2));
    document.getElementById('yearlyPrice').textContent = "".concat(currencySymbol).concat(yearlyPrice.toFixed(2));
}
// Handle Pass Selection
var passOptions = document.querySelectorAll('.pass-option');
var getPassBtn = document.getElementById('getPassBtn');
passOptions.forEach(function (option) {
    option.addEventListener('click', function () {
        passOptions.forEach(function (opt) { return opt.classList.remove('selected'); });
        this.classList.add('selected');
        var passType = this.getAttribute('data-pass-type') || '';
        userData.pass.type = passType;
        userData.pass.price = pricing[userData.vehicle.type][passType];
        getPassBtn.disabled = false;
    });
});
// Handle Get Pass Button
getPassBtn.addEventListener('click', function () {
    showPassSummary();
});
// Show Pass Summary
function showPassSummary() {
    var _a, _b;
    (_a = document.getElementById('passSelection')) === null || _a === void 0 ? void 0 : _a.classList.add('hidden');
    (_b = document.getElementById('passSummary')) === null || _b === void 0 ? void 0 : _b.classList.remove('hidden');
    document.getElementById('summaryName').textContent = userData.employee.fullName;
    document.getElementById('summaryVehicle').textContent = "".concat(userData.vehicle.name, " (").concat(userData.vehicle.type, ")");
    document.getElementById('summaryPassType').textContent = userData.pass.type.charAt(0).toUpperCase() + userData.pass.type.slice(1);
    var selectedCurrency = userData.pass.currency;
    var price = userData.pass.price * exchangeRates[selectedCurrency];
    var currencySymbols = {
        INR: '₹',
        USD: '$',
        YEN: '¥'
    };
    document.getElementById('summaryPrice').textContent = "".concat(currencySymbols[selectedCurrency]).concat(price.toFixed(2));
    document.getElementById('summaryCurrency').textContent = selectedCurrency;
}
