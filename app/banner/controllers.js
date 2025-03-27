
const Banner=require('./Banner')
const Company=require('../auth/models/Company')
const User=require('../auth/models/User')
const jwt = require('jsonwebtoken');
const sharp = require('sharp');
const express = require('express');
const multer = require('multer');
const Jimp = require('jimp');
const path = require('path');


function generateRandom6DigitCode() {
    const min = 100000; // Smallest 6-digit number
    const max = 999999; // Largest 6-digit number
  
    // Generate a random number between min and max (inclusive)
    const randomCode = Math.floor(Math.random() * (max - min + 1)) + min;
  
    // Ensure the generated number is exactly 6 digits
    const formattedCode = String(randomCode).padStart(6, '0');
  
    return formattedCode;
  }
  

  function generateSixDigitCodeFromDate(date) {
  
    
    const year = date.split('-')[0]; // Получаем последние две цифры года
    const month = date.split('-')[1];
    console.log(' generateSixDiginCodeFromDate started , year =',year,   'month',month)
  
    const min = 100000; // Smallest 6-digit number
    const max = 999999; // Largest 6-digit number
  
    // Generate a random number between min and max (inclusive)
    const randomCode = Math.floor(Math.random() * (max - min + 1)) + min;
  
    // Ensure the generated number is exactly 6 digits
    const formattedCode = String(randomCode).padStart(4, '0');

    const sixDigitCode = `${year}${month}${formattedCode}`;
    return sixDigitCode;
  }
  // Generate a random 6-digit code
 
  

// const createBanner=async(req,res)=>{
//     console.log('Banner from createBanner server',req.body,req.file)
//     try {
//         // Извлекаем данные из тела запроса
      
        
//         // Создаем новую запись в базе данных
        
//         // const randomCode = generateRandom6DigitCode();
//         const randomCode = generateSixDigitCodeFromDate()
//         console.log('сформированный код',randomCode); 

//         const authHeader = req.headers['authorization'];

//         if (!authHeader) {
//             return res.status(401).json({ message: 'Authorization header is missing' });
//         }

//         // Check if the header starts with "Bearer "
//         if (!authHeader.startsWith('Bearer ')) {
//             return res.status(401).json({ message: 'Invalid token format' });
//         }

//         // Extract the token (remove "Bearer " from the header)
//         const token = authHeader.substring(7);

//         // Now you have the JWT token in the 'token' variable
//         // console.log('JWT Token:', token);

//         const UserId=jwt.decode(token)
//         console.log('Айди юзера который соответствует данному токену', UserId.id);

        
//         let user = await User.findOne({where: { id:UserId.id }})

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//           }
          
//         console.log('User.creatorId',user.companyId)

//         // console.log('hisis user=',user)
//         // Find the user's associated company
//         const userCompany = await Company.findOne({ where: { id: user.companyId } });
    
//         if (!userCompany) {
//           return res.status(404).json({ message: 'User does not have an associated company.' });
//         }   

//         console.log('1111req.body=',req.body)
//         console.log('1111USERCOMPANY=',userCompany)


        

//         const Bann = await Banner.create({
//             title:req.body.title, 
//             bannerNumber:req.body.bannerNumber,
//             banerAddress:req.body.bannerAddress,
//             imageUrl:'/banners/' + req.file.filename,
//             uniqueCode: randomCode,
//             CompanyId: userCompany.id,
//             createdDate: req.body.createdDate,
//             rentDays: req.body.rentDays,
//             expiredDate: req.body.expiredDate,
            

//         })
    
       
//         // Отправляем успешный ответ с новой записью
//         res.status(201).json(Bann);

        

//       } catch (error) {
//         // В случае ошибки отправляем статус 500 и сообщение об ошибке
//         console.error(error);
//         res.status(500).json({ error: 'Не удалось создать запись в базе данных' });
//       }
// }

const addUniqueCodeToBannerImage=async(req,res)=>{
// Настройка хранилища для загруженных файлов с помощью Multer
console.log('addUniqueCodeToBannerImage STARTED')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/banners/');
  },
  filename: function (req, file, cb) {
    // Генерация уникального имени файла
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Создание экземпляра Multer с настройками хранилища
const upload = multer({ storage: storage });


const JPEG = require('jpeg-js')
Jimp.decoders['image/jpeg'] = (data) => JPEG.decode(data, {
	maxMemoryUsageInMB: 9144,
	maxResolutionInMP: 60000
})
// Маршрут для загрузки изображения и добавления водяного знака

  try {
    // const imagePath = req.file[0].path;
    // console.log('req.file.path;',req.file.path)

    // const watermarkUrl = req.file[1].path;
    const imagess = req.files;
     console.log('images= ',imagess) 
   
      const imagePath = imagess[0].path;
      const watermarkUrl = imagess[1].path;
      // Process each image as needed
      // ...
  


    // Загрузка изображения и водяного знака
    Jimp.RESOLUTION_LIMIT = 1000000; // Set it to your de
    
    const image = await Jimp.read(imagePath);
    if (image.getWidth() * image.getHeight() > Jimp.RESOLUTION_LIMIT) {
      // Resize the image to fit within the limit
       image.resize(2048, Jimp.AUTO); // Resize the image to fit within the limit

    }


    const watermark = await Jimp.read(watermarkUrl);

    // Рассчитываем размеры водяного знака
    const imageWidth = image.getWidth();
    const watermarkWidth = 0.1 * imageWidth; // 10% от ширины
    const watermarkHeight = (watermarkWidth / watermark.getWidth()) * watermark.getHeight();

    // Рассчитываем позицию водяного знака (правый нижний угол)
    const watermarkX = imageWidth - watermarkWidth - 10; // 10 пикселей от правого края
    const watermarkY = image.getHeight() - watermarkHeight - 10; // 10 пикселей от нижнего края

    // Наложение водяного знака на изображение
    image.composite(watermark.resize(watermarkWidth, watermarkHeight), watermarkX, watermarkY, {
      mode: Jimp.BLEND_SOURCE_OVER,
      opacityDest: 1,
      opacitySource: 1,
    });

    // Сохранение результата на диск
    const outputFilePath = imagePath.replace('uploads', './public/banners/');
    await image.writeAsync(outputFilePath);

    // Отправка сообщения об успешной обработке

  
    res.json({ message: 'Водяной знак успешно добавлен.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Произошла ошибка при обработке изображения.' });
  }


  }

  

const createBanner = async (req, res) => {
  console.log('0 Banner - ', req.body);
  console.log('1 Banner req.body.imageUrl- ',req.body.imageUrl)

  const files = req.files;

    // Process other data and create banner record...

    // Save file paths to the Banner table
  const filePaths = files.map(file => file.path);
  console.log('2 Banner filePATHSS - ', filePaths);

  req.files.forEach(async (file) => {
    // await BannerFile.create({
    //     bannerId: Bann.id,
    //     filename: file.filename,
    //     originalname: file.originalname,
    //     mimetype: file.mimetype,
    //     size: file.size,
    // });
    console.log('3 Banner FILE=',file)
});
  try {
      // Извлекаем данные из тела запроса

      // Создаем новую запись в базе данных

      // const randomCode = generateRandom6DigitCode();
      console.log('req.body.createdDate', req.body.createdDate);

      const randomCode = generateSixDigitCodeFromDate(req.body.createdDate);
      console.log('сформированный код', randomCode);

      const authHeader = req.headers['authorization'];

      if (!authHeader) {
          return res.status(401).json({ message: 'Authorization header is missing' });
      }

      // Check if the header starts with "Bearer "
      if (!authHeader.startsWith('Bearer ')) {
          return res.status(401).json({ message: 'Invalid token format' });
      }

      // Extract the token (remove "Bearer " from the header)
      const token = authHeader.substring(7);

      // Now you have the JWT token in the 'token' variable
      // console.log('JWT Token:', token);

      const UserId = jwt.decode(token);
      console.log('Айди юзера, который соответствует данному токену', UserId.id);

      let user = await User.findOne({where: { id:UserId.id }})

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // console.log('User.creatorId', user.companyId);

      // Find the user's associated company
      // const userCompany = await Company.findOne({ where: { id: user.companyId } });

      // if (!userCompany) {
      //     return res.status(404).json({ message: 'User does not have an associated company.' });
      // }

      // console.log('1111req.body=', req.body);
      console.log('АЙДИ компании которая приходит=', req.body.companyId);
      console.log('Тариф компании которая приходит=', req.body.tariff);
      // console.log('1111USERCOMPANY=', userCompany);

     
      const Bann = await Banner.create({
        // title: req.body.title,
        bannerNumber: req.body.bannerNumber,
        bannerAddress: req.body.bannerAddress,
        // imageUrl: `/banners/${randomCode}.webp`,
        uniqueCode: randomCode,
        CompanyId: req.body.companyId,
        createdDate: req.body.createdDate,
        // rentDays: req.body.rentDays,
        expiredDate: req.body.expiredDate,
        bannerLongitude:req.body.bannerLongitude,
        bannerLatitude:req.body.bannerLatitude,
        isContainProhibitedAD:req.body.isContainProhibitedAD,
        excludeFromReport:req.body. excludeFromReport,
       
        isAdRemoved:req.body.isAdRemoved,
        isOnListOfDismantling:req.body. isOnListOfDismantling,
        
        categoryOfStreet:req.body.categoryOfStreet,
        typeOfAdObject:req.body.selectedType,
        viewOfAd:req.body.selectedViewOfAd,
        tariff:req.body.tariff,
        countOfSides:req.body.countOfSides,
    });



    // const filePaths = files.map(file => ({
    //   bannerId: Bann.id, // Adjust to your Banner model's primary key
    //   path: file.path,
    // }));


    // await Banner.update({
    //   imageUrl: filePaths.map(file => file.path).join(','), // Combine paths into a comma-separated string
    // });
  
    const filePaths = files.map(file => ({
      bannerId: Bann.id, // Adjust to your Banner model's primary key
      path: file.path,
    }));
   
    const existingFilePaths = Bann.imageUrl || [];

    // Combine the existing and new file paths
    const allFilePaths = [...existingFilePaths, ...filePaths.map(file => file.path)];

    // Update the banner with the combined file paths
   
    console.log('allfieldPaths===',allFilePaths,typeof(allFilePaths))
    // const filePaths1 = [
    //   'public/banners/1700202550244.png',
    //   'public/banners/1700202550250.jpg',
    //   'public/banners/1700202550251.jpeg',
    //   'public/banners/1700202550253.jpg',
    // ];
    // Update the banner with the combined file paths


    const images = [];
    for (let i = 0; i < filePaths.length; i++) {
      images.push({ imageUrl: filePaths[i].path });
    }
    
    console.log('Finished images array', images, typeof(images));
    
    // Update the banner with the combined file paths
    await Bann.update({
      imageUrl: images.map(image => image.imageUrl).join(','), // Combine paths into a comma-separated string
    });
    console.log('updated imageUrl')

    res.status(201).json(Bann);

      
      // // Обработка изображения с использованием библиотеки sharp
      // sharp(req.file.path) // Загруженный файл
      //     .resize(800, 600) // Изменение размера изображения
      //     .toFormat('webp', { quality: 20 }) // Конвертация в WebP
      //     .toFile(`./public/banners/${randomCode}.webp`, async (err, info) => {
      //         if (err) {
      //             console.error(err);
      //             return res.status(500).json({ error: 'Ошибка при обработке изображения' });
      //         }

      //         const Bann = await Banner.create({
      //             title: req.body.title,
      //             bannerNumber: req.body.bannerNumber,
      //             banerAddress: req.body.bannerAddress,
      //             imageUrl: `/banners/${randomCode}.webp`,
      //             uniqueCode: randomCode,
      //             CompanyId: userCompany.id,
      //             createdDate: req.body.createdDate,
      //             rentDays: req.body.rentDays,
      //             expiredDate: req.body.expiredDate,
      //             bannerLongitude:req.body.bannerLongitude,
      //             bannerLatitude:req.body. bannerLatitude,
      //         });

      //         // Отправляем успешный ответ с новой записью
      //         res.status(201).json(Bann);
      //     });

  } catch (error) {
      // В случае ошибки отправляем статус 500 и сообщение об ошибке
      console.error(error);
      res.status(500).json({ error: 'Не удалось создать запись в базе данных' });
  }
};




const getAllBanners=async(req,res)=>{
  try {
    // Fetch all banners from the database
    const banners = await Banner.findAll();

    // Send the banners as a JSON response
    res.json(banners);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to retrieve banners' });
  }
}


const getBannerById=async(req,res)=>{
  try {
    const { id } = req.params; // Extract the banner ID from the request parameters

    // Find the banner by its ID in the database
    const banner = await Banner.findByPk(id);

    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }

    // Send the banner as a JSON response
    res.json(banner);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to retrieve the banner' });
  }
};

const getBannerByCompenyId=async(req,res)=>{
  try {
    console.log('req.params',req.params)
    const CompanyId  = req.params.companyId; // Extract the banner ID from the request parameters
    console.log('CompanyID',CompanyId)
    // Find the banner by its ID in the database
    const banner = await Banner.findAll({ where: { CompanyId } });
    console.log('BANERS=',banner)
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }

    // Send the banner as a JSON response
    res.json(banner);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to retrieve the banner' });
  }
};


const getBannerByuniqueCode=async(req,res)=>{

  try {
    const { uniqueCode } = req.params; // Extract the unique code from the request parameters

    // Find the banner by its unique code in the database
    const banner = await Banner.findOne({ where: { uniqueCode } });

    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }

    // Send the banner as a JSON response
    res.json(banner);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to retrieve the banner' });
  }

}


module.exports={createBanner,getAllBanners,getBannerById,getBannerByuniqueCode,getBannerByCompenyId,addUniqueCodeToBannerImage}