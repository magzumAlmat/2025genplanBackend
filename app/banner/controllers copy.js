
const Banner=require('./Banner')
const Company=require('../auth/models/Company')
const User=require('../auth/models/User')
const jwt = require('jsonwebtoken');
const sharp = require('sharp');

function generateRandom6DigitCode() {
    const min = 100000; // Smallest 6-digit number
    const max = 999999; // Largest 6-digit number
  
    // Generate a random number between min and max (inclusive)
    const randomCode = Math.floor(Math.random() * (max - min + 1)) + min;
  
    // Ensure the generated number is exactly 6 digits
    const formattedCode = String(randomCode).padStart(6, '0');
  
    return formattedCode;
  }
  

  function generateSixDigitCodeFromDate() {
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2); // Получаем последние две цифры года
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Получаем месяц и добавляем ведущий ноль, если нужно
    const day = now.getDate().toString().padStart(2, '0'); // Получаем день и добавляем ведущий ноль, если нужно
  
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

const createBanner = async (req, res) => {
  console.log('Banner from createBanner server', req.body, req.file);

  try {
      // Извлекаем данные из тела запроса

      // Создаем новую запись в базе данных

      // const randomCode = generateRandom6DigitCode();
      const randomCode = generateSixDigitCodeFromDate();
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

      console.log('User.creatorId', user.companyId);

      // Find the user's associated company
      const userCompany = await Company.findOne({ where: { id: user.companyId } });

      if (!userCompany) {
          return res.status(404).json({ message: 'User does not have an associated company.' });
      }

      console.log('1111req.body=', req.body);
      console.log('1111USERCOMPANY=', userCompany);

      // Обработка изображения с использованием библиотеки sharp
      sharp(req.file.path) // Загруженный файл
          .resize(800, 600) // Изменение размера изображения
          .toFormat('webp', { quality: 20 }) // Конвертация в WebP
          .toFile(`./public/banners/${randomCode}.webp`, async (err, info) => {
              if (err) {
                  console.error(err);
                  return res.status(500).json({ error: 'Ошибка при обработке изображения' });
              }

              const Bann = await Banner.create({
                  title: req.body.title,
                  bannerNumber: req.body.bannerNumber,
                  banerAddress: req.body.bannerAddress,
                  imageUrl: `/banners/${randomCode}.webp`,
                  uniqueCode: randomCode,
                  CompanyId: userCompany.id,
                  createdDate: req.body.createdDate,
                  rentDays: req.body.rentDays,
                  expiredDate: req.body.expiredDate,
              });

              // Отправляем успешный ответ с новой записью
              res.status(201).json(Bann);
          });

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


module.exports={createBanner,getAllBanners,getBannerById,getBannerByuniqueCode,getBannerByCompenyId}