const {Product, Bodegas, Varietal, Imagesproduct} = require('../database/models');

const  {validationResult} = require('express-validator');
const path = require('path');
const fs = require('fs');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {

	// Create - Form to create
	create: async (req, res) => {
        try {
            const bodegas = await Bodegas.findAll()
            const varietales = await Varietal.findAll()
            res.render("product-create-form", {bodegas,varietales})

        } catch (error) {
            res.json(error.message)
        } 
		//res.render('product-create-form')
	},

	// Create -  Method to store
	store: async (req, res) => {
        try {
           
        // const files = req.files;
        const { files } = req;
        
        // Esto es más que nada informativo para nosotros no es indispensable
        console.log("-----LLEGO/ARON ESTA/S FOTO/S --------")
        files.forEach( file => {
            console.log(file.filename);
        })        
        

        // Comienzo a validar//Guardo los resultados de la validacion en una variable
        const resultadosValidaciones = validationResult(req);//viene de express validator linea 6
       
        // Con este if preguntamos si hay errores de validación
        if (!resultadosValidaciones.isEmpty()){
            console.log("----- ojo HAY ERRORES -----------------")
            
            // Si hay errores borramos los archivos que cargó multer
            files.forEach( file => {
                const filePath = path.join(__dirname, `../../public/images/products/${file.filename}`);
                fs.unlinkSync(filePath);
            })
            
            console.log("-------- my body -------------------")
            console.log(req.body);  

            console.log("-------- resultadosValidaciones.mapped() -------------------")
            console.log(resultadosValidaciones.mapped());  
            
            console.log(req.body);
            const bodegas = await Bodegas.findAll()
            const varietales = await Varietal.findAll()
            return res.render('product-create-form', {
                errors: resultadosValidaciones.mapped(),
                // oldData son los datos recién cargados es decir el req.body
                oldData: req.body,
                bodegas,
                varietales
              
            })
            
        }

        console.log("--Muy bien, no hay errores ---------------------------");

        // Creamos un array vacío para ir almacenado los nombres de los archivos
        let imagenes = [];

        //  Leo de manera secuencial  el array files del request y cargo los nombres en el array de imágenes
        //  puede ser que venga una sola foto
        files.forEach( imagen => {
            imagenes.push(imagen.filename);
        })

        // Atrapo todos los campos del formulario
        const newProduct = {
            ...req.body,
            visitado: false,
            // Si no mando imágenes pongo una por defecto
            image: req.files.length >= 1 ? imagenes : ["default-image.png"]
        }
        //Grabo Product con spreadOperator en Db Sql 
        const { body } = req;
            const newbie = await Product.create({
                ...body
            });
        let Images= []
            //pusheo files al array de imagenes con el id del product creado
            for(let i = 0 ; i<req.files.length;i++) {
                Images.push({
                    nameImage: req.files[i].filename,
                    productId: newbie.id
                })
            }   
         //Reviso imagenes, si hay uso bulkCreate   
         if (Images.length > 0) {
                await Imagesproduct.bulkCreate(Images)
                res.redirect('/')
            } else {
                //si no hay subo default
                await Imagesproduct.create([{
                    nameImage: 'default-product-image.png',
                    productId: newbie.id,
                }])}    
        console.log('cree un nuevo producto')
        res.render('/')
        } catch (error) {
        res.json(error.message)
        }
    },
	
	// Update - Form to edit


	edit: async (req, res) => {
		//console.log('ESTOY USANDO EL EDIT DEL GENERICO')
        try {
            const { id } = req.params
            const bodegas = await Bodegas.findAll()
            const varietales = await Varietal.findAll()
            const productToEdit = await Product.findByPk(id, {
                include: [Bodegas,Varietal,Imagesproduct]
            });
            return res.render('product-edit-form', {productToEdit, bodegas, varietales});
            
        }catch (error) {
            res.json(error.message)
        }
		/*let productToEdit = productModel.find(req.params.id)
		console.log(productToEdit)
		res.render('product-edit-form', { productToEdit })*/
	},

	// Update - Method to update

    update: async (req, res) => {
        try {
        // const files = req.files;
        const { files } = req;
        // const id = req.params.id;
        const { id } = req.params;
        const bodegas = await Bodegas.findAll()
        const varietales = await Varietal.findAll()
        const productToEdit2 = await Product.findByPk(id, {
            include: [Bodegas,Varietal,Imagesproduct]
        });
      
        
        console.log("-----LLEGO/ARON ESTA/S FOTO/S --------")
        files.forEach( file => {
            console.log(file.filename);
        })        
        
        // Comienzo a validar
        const resultadosValidaciones = validationResult(req);
       
        // Con este if preguntamos si hay errores de validación
        if (!resultadosValidaciones.isEmpty()){
            console.log("----- ojo HAY ERRORES -----------------")
            
            // Si hay errores borramos los archivos que cargó multer
            files.forEach( file => {
                const filePath = path.join(__dirname, `../../public/images/products/${file.filename}`);
                fs.unlinkSync(filePath);
            })
            
            console.log("-------- my body -------------------")
            console.log(req.body);  

            //const productToEdit = productModel.find(id);
            const productToEdit = productToEdit2
            return res.render('product-edit-form.ejs', {
                bodegas,
                varietales,
                productToEdit2,
                productToEdit,
                errors: resultadosValidaciones.mapped(),
                // oldData son los datos recién cargados es decir el req.body
                oldData: req.body
            })
        }

        console.log("--Muy bien, no hay errores ---------------------------");
        let dataUpdate = req.body;
                let imagenes= []
                const product = await Product.update({
                    ...dataUpdate,
                }, {
                    where: {
                        id: id
                    }
                });
                for(let i = 0 ; i<req.files.length;i++) {
                    imagenes.push({
                        nameImage: req.files[i].filename,
                        productId: id
                    })
                }
                if (imagenes.length > 0) {
                    await Imagesproduct.bulkCreate(imagenes)
                }
                res.redirect('/')
        // Creamos un array vacío para ir almacenado los nombres de los archivos
        /*let imagenes = [];

        //  Leo de manera secuencial  el array files del request y cargo los nombres en el array de imágenes
        //  puede ser que venga una sola foto
        files.forEach( imagen => {
            imagenes.push(imagen.filename);
        })

        // si enviaron imagenes nuevas vamos a borrar del file system las anteriores
        if(imagenes.length > 0){
            const imagenesAnteriores = productToEdit.image;
            imagenesAnteriores.forEach( imagen => {
                const filePath = path.join(__dirname, `../../public/images/products/${imagen}`);
                fs.unlinkSync(filePath);
            })
        productToEdit = {
            id: productToEdit.id,
            ...req.body,
            // Si se suben imagenes se pone como valor el array imagenes y sino se queda el que ya estaba antes
            image: req.files.length >= 1 ? imagenes : productToEdit.image
        }
        productModel.update(productToEdit)
        res.redirect("/");*/
    }catch (error) {
        res.json(error.message)
    }
    },

	


    destroy: async (req, res) => {
        try {
            const { id } = req.params;
            let imagenDel = await Imagesproduct.findAll({
                where: {productId: id}
            });
            console.log(imagenDel)
            console.log(imagenDel[0].nameImage)
            if (imagenDel.nameImage != 'default-product-image.png') {
                fs.unlinkSync(path.resolve(__dirname, '../../public/images/products/'+imagenDel[0].nameImage))
            }
            
            await Imagesproduct.destroy({
                where: {
                productId: id
                }
            }, {
                force: true
            });
            await Product.destroy({
                where: {
                    id: id
                }
            }, {
                force: true
            })
            res.redirect("/");
            } catch (error) {
            res.json(error.message)
            }
    }


};

module.exports = controller;