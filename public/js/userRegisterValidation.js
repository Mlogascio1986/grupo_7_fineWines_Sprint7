window.addEventListener("load", function () {
    //Selecciono los elementos con los que voy a trabajar
        const form = document.querySelector("#register-form");
        const nombres = form.querySelector("#nombres");
        const apellidos = form.querySelector("#apellidos");
        const email = form.querySelector("#email");
        const password = form.querySelector("#password");
        const fotoUsuario = form.querySelector("#fotoUsuario");
        const nombresError = form.querySelector("#nombresErrorFront");
        const apellidosError = form.querySelector("#apellidosErrorFront");
        const emailError = form.querySelector("#emailErrorFront");
        const passwordError = form.querySelector("#passwordErrorFront");
        const fotoUsuarioError = form.querySelector("#fotoUsuarioErrorFront");

    // Declaro un objeto para el manejo de errores
    let errors = {};
  
    // Declaro las funciones para validar los campos y reflejar los errores
    // Cargo el objeto errors
    
    //nombres
    function nombresValidation() {
        if (nombres.value.trim() == "") {
          errors.nombres = "El nombre no puede estar vacio";
        } else if (nombres.value.length < 2) {
          errors.nombres = "El nombre debe contener 2 caracteres como mínimo";
        } else {
            nombresError.innerText = "";
          delete errors.nombres;
        }
        if (errors.nombres) {
          nombresError.innerText = errors.nombres;
        }
      }

    //apellidos - listo

    function apellidosValidation() {
        if (apellidos.value.trim() == "") {
          errors.apellidos = "El apellido no puede estar vacío";
        } else if (apellidos.value.length < 2) {
          errors.apellidos = "El apellido debe contener 2 caracteres como mínimo";
        } else {
            apellidosError.innerText = "";
          delete errors.apellidos;
        }
        if (errors.apellidos) {
          apellidosError.innerText = errors.apellidos;
        }
      }

    //email - listo
    
    function emailValidation() {
      if (email.value.trim() == "") {
        errors.email = "El email no puede estar vacio";
      } else if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email.value)) {
        errors.email = "Debe ingresar un email con formato válido";
      } else {
        emailError.innerText = "";
        delete errors.email;
      }
      //Si hay error, lo muestro en pantalla
      if (errors.email) {
        emailError.innerText = errors.email;
      }
    }

    //password - listo
  
    function passwordValidation() {
        if (password.value.trim() == "") {
          errors.password = "La contraseña no puede estar vacio";
        } else if (password.value.length < 8) {
          errors.password = "La contraseña debe contener 8 caracteres como mínimo";
        } else {
            passwordError.innerText = "";
          delete errors.password;
        }
        if (errors.password) {
          passwordError.innerText = errors.password;
        }
      }

    //fotousuario

    function fotoUsuarioValidation() {
            let allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
            if (!allowedExtensions.exec(fotoUsuario.value)) {
               errors.fotoUsuario = 'Ingrese una imagen en alguno de los siguientes formatos: .jpg, .jpeg y .png'; 
            } else {
                delete errors.fotoUsuario;
                fotoUsuarioError.innerText = "";
            }
            if (errors.fotoUsuario) {
                fotoUsuarioError.innerText = errors.fotoUsuario;
              }
      }

    // validations when the users submit the form
    form.addEventListener("submit", function (e) {

        emailValidation();
        passwordValidation();
        fotoUsuarioValidation();
        nombresValidation();
        apellidosValidation();
        
        //Object.keys() recibe un objeto y devuelve un array con los nombres de todos las propiedades del objeto
        //si hay una o mas propiedades en error el array va a tener una longitud mayor a 0 y por lo tanto el if lo toma como true
        //si es 0 lo toma como false

        if (Object.keys(errors).length) {
          e.preventDefault();
        }
      });
    
      // Corremos las validaciones cuando el user sale del campo 
      nombres.addEventListener("blur", () => nombresValidation());
      apellidos.addEventListener("blur", () => apellidosValidation());
      email.addEventListener("blur", () => emailValidation());
      password.addEventListener("blur", () => passwordValidation());
      fotoUsuario.addEventListener("blur", () => fotoUsuarioValidation());


    });

    