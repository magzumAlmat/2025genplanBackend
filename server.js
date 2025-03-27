
const File = require("./app/models/File");
const multer = require("multer");
const path = require("path");
const express=require('express')
const logger=require('morgan') // для логирования кто к нам по какому запросу стучался
const fileRoutes = require("./app/routers/Filerouter");
const fs = require("fs");
const passport =require('passport')
const app=express();
//middleware 1----
cors = require('cors')

app.use(logger('dev'));
app.use(cors());

app.use(express.urlencoded({ extended: true })); //сериализация   на уровне экспресса для того чтобы бэк понял пост запрос 
app.use(express.json())

// app.use(express.static(__dirname+'/public'))

app.use(express.static(path.join(__dirname)));
// Serve uploaded files

// Routes

  
  


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory where files will be stored
    },
    filename: (req, file, cb) => {
    console.log('1 req.body.name from multer= ', req.body.name); // Теперь req.body.name будет доступен
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
    },
});
  
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/msword"];
    if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
    } else {
    cb(new Error("Invalid file type. Only Word files are allowed."));
    }
};
  // Multer middleware
  const upload = multer({
    storage,
    limits: {
      fileSize: 1024 * 1024 * 5, // Max file size: 5MB
    },
    fileFilter,
  });

  app.use("/api", fileRoutes);
  app.post("/upload", upload.single("file"), async(req, res) => {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
  
    const { originalname, path: filePath } = req.file;
    const correctName = req.body.name.slice(0, -5); 
  
    // Переименовываем файл
    const newFilePath = path.join(
      path.dirname(filePath),
      correctName + path.extname(originalname)
    );
  
    fs.rename(filePath, newFilePath, (err) => {
      if (err) {
        console.error("Error renaming file:", err);
        return res.status(500).send("Error renaming file.");
      }
  
      res.send("File uploaded and renamed successfully.");
    });

    try {
        console.log("Uploaded file:", req.file, 'this is req body-', req.body.name);
    
        const { originalname, mimetype, path: filePath } = req.file;
        console.log('THIS IS FilePath-', filePath);
    
        const correctName = req.body.name.slice(0, -5); 
        
        console.log('!@!!correct name=', correctName);
    
        const file = await File.create({
          name: correctName,
          path: newFilePath,
          originalname: correctName,
          mimetype,
        });
    
        const newFile = {
          ...file.toJSON(), // Копируем все свойства из исходного файла
          originalname: correctName, // Меняем имя файла
        };
    
        console.log('newFile=', newFile.originalname);
    
        res.status(201).json({
          message: "File uploaded successfully!",
          newFile,
        });
      } catch (error) {
        console.error("Error uploading file:", error);
        // res.status(500).json({ message: "File upload failed." });
      }
})
//app.use(upload.any())  парсинг формдаты


// app.get('/',(req,res)=>{
//     res.send('OK!')
// })

// app.post('/api',(req,res)=>{
//     console.log(req.body)
//     res.status(200).send('POST /api works | Success!')
// })
app.use(passport.initialize());

app.use(require('./app/auth/routes'))
app.use(require('./app/banner/routes'))
app.use(require('./app/revise/routes'))

app.use(require('./app/routers/Filerouter'))
// app.use(require('./app/region/routes'))
// app.use(require('./app/skills/routes'))
// app.use(require('./app/employment-type/routes'))
// app.use(require('./app/languages/routes'))
// app.use(require('./app/resume/routes'))
// app.use(require('./app/vacancy/routes'))
// app.use(require('./app/applies/routes'))


app.listen (8000,()=>{
    console.log('Server is listening on port 8000')
})
