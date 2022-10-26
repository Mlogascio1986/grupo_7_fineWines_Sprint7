window.addEventListener("load", function () {
    //Selecciono los elementos con los que voy a trabajar
        const form = document.querySelector("#productEdit-form");
        const name = form.querySelector("#name");
        const description = form.querySelector("#description");
        const image = form.querySelector("#image");
        const nameError = form.querySelector("#nameError");
        const descriptionError = form.querySelector("#descriptionError");
        const imageError = form.querySelector("#imageError");

        // Declaro un objeto para el manejo de errores
    let errors = {};
  
    // Declaro las funciones para validar los campos y reflejar los errores
    // Cargo el objeto errors
    
    //name
    function nameValidation() {
        if (name.value.trim() == "") {
          errors.name = "El nombre del producto no puede estar vacio";
        } else if (name.value.length < 5) {
          errors.name = "El nombre del producto debe contener 5 caracteres como mínimo";
        } else {
            nameError.innerText = "";
          delete errors.name;
        }
        if (errors.name) {
          nameError.innerText = errors.name;
        }
      }

      function descriptionValidation() {
        if (description.value.trim() == "") {
          errors.description = "La descripcion del producto no puede estar vacia";
        } else if (description.value.length < 20) {
          errors.description = "La descripcion del producto debe contener 20 caracteres como mínimo";
        } else {
            descriptionError.innerText = "";
          delete errors.description;
        }
        if (errors.description) {
          descriptionError.innerText = errors.description;
        }
      }

      function imageValidation() {
        let allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
        if (!allowedExtensions.exec(image.value)) {
           errors.image = 'Ingrese una imagen en alguno de los siguientes formatos: .jpg, .jpeg y .png'; 
        } else {
            delete errors.image;
            imageError.innerText = "";
        }
        if (errors.image) {
            imageError.innerText = errors.image;
          }
  }

  // validations when the users submit the form
  form.addEventListener("submit", function (e) {

    nameValidation();
    descriptionValidation();
    imageValidation();
    
    if (Object.keys(errors).length) {
      e.preventDefault();
    }
  });

  // Corremos las validaciones cuando el user sale del campo 
  name.addEventListener("blur", () => nameValidation());
  description.addEventListener("blur", () => descriptionValidation());
  image.addEventListener("change", () => imageValidation());

    });