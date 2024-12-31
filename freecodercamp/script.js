const form = document.getElementById('survey-form')
const nameInput = document.getElementById('name')
const emailInput = document.getElementById('email')
const numberInput = document.getElementById('number')

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validateName(name) {
    const regex = /^[A-Za-z\s]+$/; // Asegura que solo se ingresen letras y espacios
    return regex.test(name);
}

function showError(input, message) {
    const formGroup = input.closest('.form-group'); // Encontramos el contenedor del campo
    let error = formGroup.querySelector('.error-message');
    
    // Si no existe el mensaje de error, lo creamos
    if (!error) {
        error = document.createElement('small');
        error.className = 'error-message';
        error.style.color = 'red';
        formGroup.appendChild(error);
    }
    
    error.textContent = message; // Mostramos el mensaje de error
    input.style.borderColor = 'red'; // Cambiamos el borde del campo a rojo
}

function clearError(input) {
    const formGroup = input.closest('.form-group');
    const error = formGroup.querySelector('.error-message');
    if (error) {
        error.remove(); // Eliminamos el mensaje de error
    }
    
    input.style.borderColor = ''; // Restauramos el borde original
}

form.addEventListener('input', function(event) {
    event.preventDefault();
    validateForm();
});

function validateForm() {
    let  isValid = true;

    if (nameInput.value.trim() === '') {
        showError(nameInput, 'Name is required');
        isValid = false
    } else if (!validateName(nameInput.value)){
        showError(nameInput, 'Name cannot contain numbers');
        isValid = false;
    } else {
        clearError(nameInput);
    }

    if (!validateEmail(emailInput.value)) {
        showError(emailInput, 'Enter a valid email address');
        isValid = false
    } else {
        clearError(emailInput);
    }

    if (numberInput.value.trim() === '') {
        showError(numberInput, 'Age is required');
        isValid = false
    } else if (numberInput.value.trim() < 18 || numberInput.value > 99) {
        showError(numberInput, 'Age must be between 18 and 99');
        isValid = false
    } else {
        clearError(numberInput)
    }

    if (isValid) {
        alert('Form submitted succesfully');
        form.reset();
    }
}

