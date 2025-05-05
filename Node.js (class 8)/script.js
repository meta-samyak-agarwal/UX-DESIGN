// Main Data Object
const userData = {
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
        currency: 'INR'   // by default INR hai 
    }
};

// Pricing in USD (base currency)
const pricing = {
    Cycle: {
        daily: 0.06, // 5 INR
        monthly: 1.2, // 100 INR
        yearly: 6 // 500 INR
    },
    MotorCycle: {
        daily: 0.12, // 10 INR
        monthly: 2.4, // 200 INR
        yearly: 12 // 1000 INR
    },
    FourWheeler: {
        daily: 0.24, // 20 INR
        monthly: 6, // 500 INR
        yearly: 42 // 3500 INR
    }
};

// Exchange rates
const exchangeRates = {
    USD: 1,
    INR: 83.5,
    YEN: 152
};

// Validate Name Field
const nameField = document.getElementById('fullName');
const nameError = document.getElementById('nameError');

// yeh enter pr next hona
nameField.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        e.preventDefault();    // enter ki default property hatana 
        validateName();
    }
});

// length should greater than 2 and does not have digit
const validateName = () => {
    const name = nameField.value.trim();
    const nameRegex = /^[a-zA-Z\s]{2,}$/;
   
    if (!name) {
        nameError.textContent = 'Name is required';
        return false;
    } else if (!nameRegex.test(name)) {
        nameError.textContent = 'Name must be at least 2 characters and should not contain numbers';
        return false;
    } else {
        nameError.textContent = '';
        userData.employee.fullName = name;    // name save krna 
       
        // Hide name field and show gender field
        document.getElementById('nameField').classList.add('hidden');
        document.getElementById('genderField').classList.remove('hidden');
       
        // Update gender label with user's name
        document.getElementById('genderLabel').textContent = `Hi ${name.split(' ')[0]}! Can I know your gender?`;
       
        return true;
    }
};

// Handle Gender Selection
const genderOptions = document.querySelectorAll('input[name="gender"]');   // all three options came here m , f , o 

genderOptions.forEach(option => {
    option.addEventListener('change', function() {     // without enter ke 'change'
        userData.employee.gender = this.value;
       
        // Hide gender field and show email field
        document.getElementById('genderField').classList.add('hidden');
        document.getElementById('emailField').classList.remove('hidden');
    });
});

// Validate Email Field
const emailField = document.getElementById('email');
const emailError = document.getElementById('emailError');

emailField.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        e.preventDefault();
        validateEmail();
    }
});

const validateEmail = () => {
    const email = emailField.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   
    if (!email) {
        emailError.textContent = 'Email is required';
        return false;
    } else if (!emailRegex.test(email)) {
        emailError.textContent = 'Please enter a valid email address';
        return false;
    } else {
        emailError.textContent = '';
        userData.employee.email = email;
       
        // Hide email field and show password field
        document.getElementById('emailField').classList.add('hidden');
        document.getElementById('passwordField').classList.remove('hidden');
       
        return true;
    }
};

// Validate Password Field
const passwordField = document.getElementById('password');
const passwordError = document.getElementById('passwordError');
const passwordStrength = document.getElementById('passwordStrength');

passwordField.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        e.preventDefault();
        validatePassword();
    }
});

passwordField.addEventListener('input', function() {
    checkPasswordStrength(this.value);
});

const checkPasswordStrength = password => {
    // Change border color based on password strength
    let strength = 0;
   
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
   
    const strengthStyles = {
        weak: { color: '#dc3545', text: 'Weak password' },
        medium: { color: '#fd7e14', text: 'Medium password' },
        strong: { color: '#28a745', text: 'Strong password' }
    };
    
    let strengthLevel;
    
    if (strength < 3) {
        strengthLevel = 'weak';
    } else if (strength < 5) {
        strengthLevel = 'medium';
    } else {
        strengthLevel = 'strong';
    }
    
    const { color, text } = strengthStyles[strengthLevel];
    
    passwordField.style.borderColor = color;
    passwordStrength.textContent = text;
    passwordStrength.style.color = color;
};

const validatePassword = () => {
    const password = passwordField.value;
    
    const passwordChecks = [
        { condition: !password, message: 'Password is required' },
        { condition: password.length < 8, message: 'Password must be at least 8 characters long' },
        { condition: !/[A-Z]/.test(password), message: 'Password must contain at least one uppercase letter' },
        { condition: !/[a-z]/.test(password), message: 'Password must contain at least one lowercase letter' },
        { condition: !/[0-9]/.test(password), message: 'Password must contain at least one number' },
        { condition: !/[^A-Za-z0-9]/.test(password), message: 'Password must contain at least one special character' }
    ];
    
    const failedCheck = passwordChecks.find(check => check.condition);
    
    if (failedCheck) {
        passwordError.textContent = failedCheck.message;
        return false;
    } else {
        passwordError.textContent = '';
        userData.employee.password = password;
       
        // Hide password field and show confirm password field
        document.getElementById('passwordField').classList.add('hidden');
        document.getElementById('confirmPasswordField').classList.remove('hidden');
       
        return true;
    }
};

// Validate Confirm Password Field
const confirmPasswordField = document.getElementById('confirmPassword');
const confirmPasswordError = document.getElementById('confirmPasswordError');

confirmPasswordField.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        e.preventDefault();
        validateConfirmPassword();
    }
});

const validateConfirmPassword = () => {
    const confirmPassword = confirmPasswordField.value;
   
    if (!confirmPassword) {
        confirmPasswordError.textContent = 'Please confirm your password';
        return false;
    } else if (confirmPassword !== userData.employee.password) {
        confirmPasswordError.textContent = 'Passwords do not match';
        return false;
    } else {
        confirmPasswordError.textContent = '';
       
        // Hide confirm password field and show contact field
        document.getElementById('confirmPasswordField').classList.add('hidden');
        document.getElementById('contactField').classList.remove('hidden');
       
        return true;
    }
};

// Validate Contact Number Field
const contactField = document.getElementById('contactNumber');
const contactError = document.getElementById('contactError');

contactField.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        e.preventDefault();
        validateContact();
    }
});

const validateContact = () => {
    const contact = contactField.value.trim();
    const contactRegex = /^\d{8,}$/;
   
    if (!contact) {
        contactError.textContent = 'Contact number is required';
        return false;
    } else if (!contactRegex.test(contact)) {
        contactError.textContent = 'Contact number must be at least 8 digits';
        return false;
    } else {
        contactError.textContent = '';
        userData.employee.contactNumber = contact;
       
        // Complete employee registration
        completeEmployeeRegistration();
       
        return true;
    }
};

const completeEmployeeRegistration = () => {
    // Generate a random employee ID
    const id = 'EMP' + Math.floor(10000 + Math.random() * 90000);
    userData.employee.id = id;
   
    // Hide employee registration and show success message
    document.getElementById('employeeRegistration').classList.add('hidden');
    document.getElementById('registrationSuccess').classList.remove('hidden');
   
    // Display employee ID
    document.getElementById('employeeId').textContent = id;
   
    // After a short delay, show vehicle registration
    setTimeout(() => {
        document.getElementById('registrationSuccess').classList.add('hidden');
        document.getElementById('vehicleRegistration').classList.remove('hidden');
    }, 3000);
};

// Validate Vehicle Name Field
const vehicleNameField = document.getElementById('vehicleName');
const vehicleNameError = document.getElementById('vehicleNameError');

vehicleNameField.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        e.preventDefault();   // enter ka effect cancel krne ke liye
        validateVehicleName();
    }
});

const validateVehicleName = () => {
    const name = vehicleNameField.value.trim();
   
    if (!name) {
        vehicleNameError.textContent = 'Vehicle name is required';
        return false;
    } else {
        vehicleNameError.textContent = '';
        userData.vehicle.name = name;
       
        // Hide vehicle name field and show vehicle type field
        document.getElementById('vehicleNameField').classList.add('hidden');
        document.getElementById('vehicleTypeField').classList.remove('hidden');
       
        return true;
    }
};

// Handle Vehicle Type Selection
const vehicleTypeField = document.getElementById('vehicleType');
const vehicleTypeError = document.getElementById('vehicleTypeError');

vehicleTypeField.addEventListener('change', function() {
    if (this.value) {
        vehicleTypeError.textContent = '';
        userData.vehicle.type = this.value;
       
        // Hide vehicle type field and show vehicle number field
        document.getElementById('vehicleTypeField').classList.add('hidden');
        document.getElementById('vehicleNumberField').classList.remove('hidden');
    } else {
        vehicleTypeError.textContent = 'Please select a vehicle type';
    }
});

// Validate Vehicle Number Field
const vehicleNumberField = document.getElementById('vehicleNumber');
const vehicleNumberError = document.getElementById('vehicleNumberError');

vehicleNumberField.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        e.preventDefault();
        validateVehicleNumber();
    }
});

const validateVehicleNumber = () => {
    const number = vehicleNumberField.value.trim();
   
    if (!number) {
        vehicleNumberError.textContent = 'Vehicle number is required';
        return false;
    } else {
        vehicleNumberError.textContent = '';
        userData.vehicle.number = number;
       
        // Hide vehicle number field and show employee ID field
        document.getElementById('vehicleNumberField').classList.add('hidden');
        document.getElementById('empIdField').classList.remove('hidden');
       
        // Set employee ID
        document.getElementById('empId').value = userData.employee.id;
        userData.vehicle.employeeId = userData.employee.id;
       
        // After a short delay, show identification field
        setTimeout(() => {
            document.getElementById('empIdField').classList.add('hidden');
            document.getElementById('identificationField').classList.remove('hidden');
        }, 1000);
       
        return true;
    }
};

// Validate Identification Field
const identificationField = document.getElementById('identification');
const identificationError = document.getElementById('identificationError');

identificationField.addEventListener('keypress', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        validateIdentification();
    }
});

const validateIdentification = () => {
    const identification = identificationField.value.trim();
   
    if (!identification) {
        identificationError.textContent = 'Identification details are required';
        return false;
    } else {
        identificationError.textContent = '';
        userData.vehicle.identification = identification;
       
        // Complete vehicle registration
        completeVehicleRegistration();
       
        return true;
    }
};

const completeVehicleRegistration = () => {
    // Hide vehicle registration and show success message
    document.getElementById('vehicleRegistration').classList.add('hidden');
    document.getElementById('vehicleSuccess').classList.remove('hidden');
   
    // After a short delay, show pass selection
    setTimeout(() => {
        document.getElementById('vehicleSuccess').classList.add('hidden');
        document.getElementById('passSelection').classList.remove('hidden');
       
        // Update pricing based on vehicle type
        updatePricing();
    }, 3000);
};

// Currency Selector
const currencySelector = document.getElementById('currencySelector');

currencySelector.addEventListener('change', function() {
    userData.pass.currency = this.value;
    updatePricing();
});

// Update Pricing Display
const updatePricing = () => {
    if (!userData.vehicle.type) return;
   
    const selectedCurrency = userData.pass.currency;
    const vehicleType = userData.vehicle.type;
   
    // updating according to the vehicle type selected
    const dailyPrice = pricing[vehicleType].daily * exchangeRates[selectedCurrency];
    const monthlyPrice = pricing[vehicleType].monthly * exchangeRates[selectedCurrency];
    const yearlyPrice = pricing[vehicleType].yearly * exchangeRates[selectedCurrency];
   
    const currencySymbols = {
        INR: '₹',
        USD: '$',
        YEN: '¥'
    };
    
    const currencySymbol = currencySymbols[selectedCurrency];
   
    // here updating manually , upto the 2 decimal point
    document.getElementById('dailyPrice').textContent = `${currencySymbol}${dailyPrice.toFixed(2)}`;
    document.getElementById('monthlyPrice').textContent = `${currencySymbol}${monthlyPrice.toFixed(2)}`;
    document.getElementById('yearlyPrice').textContent = `${currencySymbol}${yearlyPrice.toFixed(2)}`;
};

// Handle Pass Selection
const passOptions = document.querySelectorAll('.pass-option');
const getPassBtn = document.getElementById('getPassBtn');

passOptions.forEach(option => {
    option.addEventListener('click', function() {
        // Remove selected class from all options
        passOptions.forEach(opt => opt.classList.remove('selected'));
       
        // Add selected class to clicked option
        this.classList.add('selected');
       
        // Get pass type
        const passType = this.getAttribute('data-pass-type');
        userData.pass.type = passType;
       
        // Calculate price
        const vehicleType = userData.vehicle.type;
        userData.pass.price = pricing[vehicleType][passType];
       
        // Enable Get Pass button
        getPassBtn.disabled = false;
    });
});

// Handle Get Pass Button
getPassBtn.addEventListener('click', () => {
    showPassSummary();
});

// Show Pass Summary
const showPassSummary = () => {
    // Hide pass selection and show summary
    document.getElementById('passSelection').classList.add('hidden');
    document.getElementById('passSummary').classList.remove('hidden');
   
    // Update summary information
    document.getElementById('summaryName').textContent = userData.employee.fullName;
    document.getElementById('summaryVehicle').textContent = `${userData.vehicle.name} (${userData.vehicle.type})`;
    document.getElementById('summaryPassType').textContent = userData.pass.type.charAt(0).toUpperCase() + userData.pass.type.slice(1);
   
    const selectedCurrency = userData.pass.currency;
    const price = userData.pass.price * exchangeRates[selectedCurrency];
   
    const currencySymbols = {
        INR: '₹',
        USD: '$',
        YEN: '¥'
    };
    
    const currencySymbol = currencySymbols[selectedCurrency];
   
    document.getElementById('summaryPrice').textContent = `${currencySymbol}${price.toFixed(2)}`;
    document.getElementById('summaryCurrency').textContent = selectedCurrency;
};