const form = document.getElementById('survey-form')
const nameInput = document.getElementById('name')
const emailInput = document.getElementById('email')
const numberInput = document.getElementById('number')

//funcion para validar el mail con una especie diccionario de condiciones.

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

//funcion para validar el nombre con una especie diccionario de condiciones.

function validateName(name) {
    const regex = /^[A-Za-z\s]+$/; // Asegura que solo se ingresen letras y espacios
    if (name.lenght < 3) {
        return false;
    }
    return regex.test(name);
}

//funcion para el error cuando el input no cumple, agarra el contenedor de cd input, define error diciendo que es el contenedor agarrado.

function showError(input, message) {
    const formGroup = input.closest('.form-group'); // Encontramos el contenedor del campo
    let error = formGroup.querySelector('.error-message');
    let icon = formGroup.querySelector('status-icon')

    if (error) {
        error.remove();
    }

    if (icon) {
        icon.remove();
    }

    error = document.createElement('small');
    error.className = 'error-message';
    error.style.color = 'red';
    error.textContent = 'message';
    formGroup.appendchill(error);

    input.style.borderColor = 'red';
}

// funcion para limpiar el error, agarra el .error-message lo mete adentro de la const = error y despues lo elimina con error.remove 

function clearError(input) {
    const formGroup = input.closest('.form-group');
    const error = formGroup.querySelector('.error-message');
    if (error) {
        error.remove(); // Eliminamos el mensaje de error
    }

    if (icon) {
        icon.textContent = '✅'; // Mostramos el ícono verde
    } else {
        icon.remove()
    }
    
    input.style.borderColor = ''; // Restauramos el borde original
}

// "escucha el evento blur (cuando seleccionas el input)"

form.addEventListener('blur', function(event) {
    const input = event.target;
    if (input.tagName === 'INPUT' || input.tagName === 'TEXTAREA' || input.tagName === 'SELECT') {
        validateField(input);
    }
}, true);


// funcion para validar inputs x separado..

function validateField(input) {

//validador de name.

    if (input.id === 'name') {
        const nameValue = input.value.trim();  // Obtenemos el valor limpio del input
        if (nameValue === '') {
            showError(input, 'Name is required');
        } else if (nameValue.length < 3) {
            showError(input, 'Name must be at least 3 characters');
        } else if (!validateName(nameValue)) {
            showError(input, 'Name cannot contain numbers');
        } else if (/\s{2,}/.test(input.value)) {
            showError(input, 'Name cannot have multiple consecutive spaces')
        } else {
            clearError(input);
        }

//validador de email.

    } else if (input.id === 'email') {
        const emailValue = input.value;
        if (!validateEmail(emailValue)) {
            showError(input, 'Enter a valid email address (example@exmp.com)')
        } if (/\s/.test(emailValue)) {
            showError(input, 'Email cannot have spaces')
        } if (emailValue === '') {
            showError(input, 'Email is required')
        } else {
            clearError(input)
        }

//validador de numero (age).

    } else if (input.id === 'number') {
        const trimmedvalue = input.value.trim();
        const age = Number(trimmedvalue);
        if (trimmedvalue === '') {
            showError(input, 'Age is required');
        } else if (isNaN(age) || age < 18 || age > 99) {
            showError(input, 'Age must be between 18 and 99');
        } else {
            clearError(input)
        }
    }
}

window.addEventListener('load', function() {
    [nameInput, emailInput, numberInput].forEach(input => {
        const storedValue = sessionStorage.getItem(input.id);
        if (storedValue) {
            input.value = storedValue; // Rellena el campo con el valor almacenado
        }

        input.addEventListener('input', function(event) {
            const value = event.target.value;
            sessionStorage.setItem(input.id, value); // Guarda el valor actualizado
        });
    });
});



// funcion para validar el form entero escuchando el submit. 

form.addEventListener('submit', function(event) {
    event.preventDefault(); 
    let hasErrors = false;
    
    [nameInput, emailInput, numberInput].forEach(input => {
        validateField(input);
        if (input.closest('.form-group').querySelector('.error-message')) {
            hasErrors = true;
        }
    });

    if (!hasErrors) {
        alert('Form successfuly submitted, I appreciate it... ');
        form.reset();
    }
});




