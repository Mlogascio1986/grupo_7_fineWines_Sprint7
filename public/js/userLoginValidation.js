
window.addEventListener('load', function(){
//this.prompt('como te llamas')
    // Waits until all the dom is loaded to avoid errors. Then the function recieves the DOM as input
    
    //Selecciono los elementos con los que voy a trabajar
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');
    const form = document.querySelector('#login-form');
    const emailError = form.querySelector('#emailError');
    const passwordError = form.querySelector('#passwordError')

    // Declaro un objeto para el manejo de errores
    let errors = {};

    // Declaro las funciones para validar los campos y reflejar los errores
    // Cargo el objeto errors
   
    //email
    
        if (email.value.trim() == "") {
            errors.email = "El email no puede estar vacio";
        } else if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email.value)) {
            errors.email = "Debe ingresar un email con formato válido";
        } else {
            delete errors.email
        }

        function emailValidation () {
        //Si hay error, lo muestro en pantalla
        if (errors.email) {
            emailError.innerText = errors.email;
        } 
    }

    //password
        if (password.value.trim() == "") {
            errors.password = "La contraseña no puede estar vacio";
        } else if (password.value.length < 8 ) {
            errors.password = "La contraseña debe contener 8 caracteres como mínimo";
        } 
        else {delete errors.password
        }
        //Si hay error, lo muestro en pantalla
        function passwordValidation () {
        if (errors.password) {
            passwordError.innerText = errors.password;
        }
    }

    // validations when the users submit the form
    form.addEventListener('submit', function (e) {
        //window.prompt('entre al formulario')
        emailValidation();
        passwordValidation();
        
        if(errors.email || errors.password){
            //window.prompt('tengo error')
        e.preventDefault();

        //e.preventDefault
    }
       //form.submit()
    })

    // Corremos las validaciones cuando el user sale del campo password y email
    //email.addEventListener('blur', emailValidation());
    email.addEventListener('blur', emailValidation());
    password.addEventListener('blur', passwordValidation());

})