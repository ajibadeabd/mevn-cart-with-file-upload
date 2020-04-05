var express = require('express');
var router = express.Router();
let fs = require('fs')
let path = require('path')
const User = require('../../models/users');
const Image = require('../../models/images');
const multer= require('multer');
// const sharp= require('sharp');
// const sdk= require('aws-sdk');
const Product = require('../../models/Product');
// const Details = require('../../models/Details');
const cors =require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const passport = require("passport")
const mongoose = require('mongoose');
const app = express();
// aws.config.update({
//     accessKeyId:'',
//     secretAccessKey:''
// })

// const fileFilter=(req,file,cb)=>{
//     const allowatypes=
//     ['image/jpeg','image/jpg','image/gif','image/png']
//     if(!allowatypes.includes(file.mimetype)){
//         const error= new Error("wrong file type")
//     error.code='LIMIT_FILE_TYPES';
//     return cb(error,false)
//     }
//     cb(null,true)
  
// }

// const MAX_SIZE= 2000000;

// const upload=multer({
//     destination:"./public/uploads/",
//    limits:{
//       fileSize: MAX_SIZE
//    },
//     fileFilter

// })


const storage = multer.diskStorage(
    {destination:"./public/uploads/",
    filename:(req,file,cb)=>{
        cb(null,file.fieldname + "-"+ Date.now()+
        path.extname(file.originalname))
    }}
)

//init uload
const upload=multer({
    storage:storage,
    limits:{fileSize:100000000000000000000000},
    fileFilter:(req,file,cb)=>{
        checkFileType(file,cb)

    }
}).single("file")
 
//check file type
checkFileType=(file,cb)=>{
    //allowe exit
    const filetypes = /jpeg|jpg|png|gif/;
    // check ext
    const extname= filetypes.test(path.extname(file.originalname)
    .toLowerCase())

    //check mime
    const mimetype = filetypes.test(file.mimetype) 

    if(mimetype && extname){
        return cb(null,true)
    }else{
        cb('Error:Images only!')
    }
}








process.env.SECRET_KEY='secure'
router.use(cors())


// @route

router.post('/register', function(req, res, next) {
 let {
    userName,
     name,
     email,
     password,
     conpassword,
     role
 }=req.body
 if(req.body.password!==req.body.conpassword){
  res.status(400).json({
      msg:"password in correct" 
  });return 
 }
 //check for a unique user
 User.findOne({
     name:name
 }).then((user)=>{
    if(user){
        res.status(400).json({
            msg:"username already taken" 
        })
      
 User.findOne({
    email:email
}).then((email)=>{
   if(email){
       res.status(400).json({
           msg:"email  already been registerd. did you forget your password" 
       })
      };return 
})  }
else{

    let newUser= new User({
        userName,
        name,
        email,
        password,
        address:'',
        number:"",
        country:"",
        postal_code:""
        
    
    })
    // hash password
    bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(newUser.password,salt,(err,hash)=>{
        if(err) throw err
        newUser.password=hash;
        
        newUser.save()
        .then((user)=>{
            
          
            res.status(200).json({
                success:true,
                msg:`i am please to inform you that ${req.body.name} is registed`
            })
           
          
    
        }
        )
        // .catch(err=>{
        //     return err
        // })
    })
    })
}
})

});
router.post('/login', function(req, res, next) {
    User.findOne({
      name:req.body.name
    })
    .then((user)=>{
               if(!user){
                 return  res.status(404).json({
                      msg:'user  not found',
                      success:false
                  }) 
               }
        bcrypt.compare(req.body.password,user.password)
        .then(ismatch=>{
            if(ismatch){ 
                const payload={
                  _id:user._id,
                 name:user.name,
                 userName:user.userName,
                  pasword:user.password,
                  email:user.email,
        
                }
                jwt.sign(payload,process.env.SECRET_KEY, {
                    expiresIn:6092342
        
                  },(err,token)=>{
                      res.status(200).json({
                            success:true,
                         token:`Bearer ${token}`   , 
                         user:user,
                          msg:"you are now logged in"
                      });
                    })
            }else{
               return res.status(400).json({
                    success:false,
                      
                     msg:"incorrect password"
                })
            }
        })
      
})

  });


 // update your details
  router.put('/addDetail/:id', function(req, res, next) {
    console.log(req.params.id)
            User.findOneAndUpdate(
                {_id:req.params.id} 
                ,req.body,
    
                {new:true},
                (err,id)=>{
                        if(err) res.send(err);
                        res.json(
                        id
                         ) 
                });
          
          
              });

//get profile
  router.get('/profile', passport.authenticate('jwt',{
  session:false
  }),function(req, res, next) {
    
  return res.json({
      user:req.user})
  });


  //upload profile

  router.post('/uploadFile',upload, (req, res, next) =>{
      console.log(req.file)
      console.log(req.body)
    //   let incomingfile = `/uploads/${req.file.filename}`
    let fileName={file: `../../../public/uploads/${req.file.filename}`,
        originalname:req.file.originalname
    }
    
    Image.findOne({
        originalname:req.file.originalname

    }).then(user=>{
        if(!user){
            
            Image(fileName).save()
            .then(image=>{
                res.json({
                    image,
                    msg:'Image successfully uploaded'
                })
            })
           
        }else{
            // console.log(req.file.filename)
            return res.status(400).json({
                msg:'Image already uploaded earlier'
              
            })


          
        }
       
    })
   
   
    });
  
    
    router.get('/getFile',(req, res, next)=> {
        Image.find()
        .then(image=>{
 res.status(200).json({
     image:image
 })
        })   
    }) 
  /// delete all images from database  
    router.delete('/images',(req, res, next)=> {
        Image.deleteMany()


        .then(image=>{
 res.status(200).json({
     image:image,
     msg:'All images have been successfully deleted'
 })
        })   
    }) 
   
    router.delete('/images/:id', function(req, res, next) {
        Image.findByIdAndDelete(req.params.id, req.body, function (err, image) {
          if (err) return next(err);
          res.status(200).json({
            image:image,
            msg:'image successfully deleted'
        })
        });
      });
      
   
router.get('/aaaaaa', function(req, res, next) {
    //   Category.find().then(cat=>{
    // res.json({cat})
    // //   })
    // Category.find(function (err, categories) {
    //     if (err) return console.log(err);
    //     res.status(200).json(categories);
    // });
      console.log('edfe')
       
     });    
module.exports = router;
