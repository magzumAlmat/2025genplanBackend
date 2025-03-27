
// const Banner=require('./Banner')
const Company=require('../auth/models/Company')
const User=require('../auth/models/User')
const jwt = require('jsonwebtoken');
const Revise=require('./Revise')
  

// Add a new Revise
const createRevise2 = async (req, res) => {
  console.log('req.params.bannerid=',req.params.bannerid)
  try {
    // Extract data from the request body
    const { status, expiredDate, image, description } = req.body;
   
    const {id}=req.user
    console.log('ID=',id)
    // Create a new Revise instance and set its properties
    const newRevise = await Revise.create({
      status,
      expiredDate,
      image:'/revises/' + req.file.filename,
      description,
      UserId:id,
      BannerId:req.params.bannerid,
      moderatorStatus:'',
      moderatorAnswer:''

    });

    // You may associate this Revise with a Company, Banner, and User as needed.
    // Example: newRevise.setCompany(companyInstance);
    // Example: newRevise.setBanner(bannerInstance);
    // Example: newRevise.setUser(userInstance);

    // Return a success response with the created Revise data
    return res.status(201).json({ message: 'Revise added successfully', revise: newRevise });
  } catch (error) {
    // Handle any errors and return an error response
    console.error(error);
    return res.status(500).json({ message: 'Failed to add Revise', error: error.message });
  }
};

const createRevise = async (req, res) => {
  console.log('req.params.bannerid=',req.params.bannerid)
  try {
    // Extract data from the request body
    const { status, expiredDate, image, description } = req.body;
   
    const {id}=req.user
    console.log('ID=',id)
    // Create a new Revise instance and set its properties
    const newRevise = await Revise.create({
      status,
      expiredDate,
      image:'/revises/' + req.file.filename,
      description,
      UserId:id,
      BannerId:req.params.bannerid,
      moderatorStatus:'',
      moderatorAnswer:''

    });

    // You may associate this Revise with a Company, Banner, and User as needed.
    // Example: newRevise.setCompany(companyInstance);
    // Example: newRevise.setBanner(bannerInstance);
    // Example: newRevise.setUser(userInstance);

    // Return a success response with the created Revise data
    return res.status(201).json({ message: 'Revise added successfully', revise: newRevise });
  } catch (error) {
    // Handle any errors and return an error response
    console.error(error);
    return res.status(500).json({ message: 'Failed to add Revise', error: error.message });
  }
};


const getAllRevises=async(req,res)=>{
  try {
    // Fetch all banners from the database
    const revises = await Revise.findAll();
    // Send the banners as a JSON response
    res.json(revises);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to retrieve banners' });
  }
}


// const getBannerById=async(req,res)=>{
//   try {
//     const { id } = req.params; // Extract the banner ID from the request parameters

//     // Find the banner by its ID in the database
//     const banner = await Banner.findByPk(id);

//     if (!banner) {
//       return res.status(404).json({ message: 'Banner not found' });
//     }

//     // Send the banner as a JSON response
//     res.json(banner);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Failed to retrieve the banner' });
//   }
// };



// const getBannerByuniqueCode=async(req,res)=>{

//   try {
//     const { uniqueCode } = req.params; // Extract the unique code from the request parameters

//     // Find the banner by its unique code in the database
//     const banner = await Banner.findOne({ where: { uniqueCode } });

//     if (!banner) {
//       return res.status(404).json({ message: 'Banner not found' });
//     }

//     // Send the banner as a JSON response
//     res.json(banner);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Failed to retrieve the banner' });
//   }

// }


module.exports={createRevise,getAllRevises}