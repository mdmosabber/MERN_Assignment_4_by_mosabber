const multer = require('multer');
const path = require('path');

// URL Query Method
exports.urlQuery = (req, res)=> {

   const {name, email, phone} = req.query;
   res.status(200).json({ name, email, phone })

};


// Body Raw Request Method
exports.bodyRequest = (req, res)=> {

   const {name, email, phone} = req.body;
   res.status(200).json({ name, email, phone })

}


// Header Request Method
exports.headerRequest = (req, res)=> {

   const name  = req.header('name');
   const email = req.header('email');
   const phone = req.header('phone');
   res.status(200).json({ name, email, phone })

}


// File Upload Methods
const storage = multer.diskStorage({
    destination: (req, file, callback)=>{
        callback(null, './public/images');
    },
    filename: (req, file, callback)=> { 
        const imageName = Date.now() +'_image'+ path.extname(file.originalname);
        callback(null, imageName);
        
        // if(file.mimetype === "image/jpeg" || file.mimetype === "image/png"){
        //     const imageName = Date.now() +'_image'+ path.extname(file.originalname);
        //     callback(null, imageName);
        // }else{  
        //     callback( new Error("Please upload .jpg, .png or .jpeg format image"))
        // }
    }
})


const upload = multer({
    storage:storage,
    fileFilter: (req, file, callback)=>{
        if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' ){
            callback(null, true)
        }
        else {
            callback(new Error('Please upload .jpg, .png or .jpeg format image'))
        }
    } 
}).single('image');



exports.fileUpload = (req, res)=> {
    upload(req, res, (err)=> {      
        if(!err){
            res.status(200).json({ message: `Your ${req.file.originalname} image upload successfully`})
        }else{
            res.json({ message: err.message}) 
        }
    })  
    
}



// File Download Methods
exports.fileDownload = (req, res)=> {
    res.download('public/images/1670468256555_image.jpg')
}