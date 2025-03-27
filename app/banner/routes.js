const express=require('express')
const router=express.Router()
// const {isEmployee} = require('../auth/middlewares');
const passport = require('passport');
const {createBanner,getAllBanners,getBannerById,getBannerByuniqueCode,getBannerByCompenyId,addUniqueCodeToBannerImage} = require('./controllers')
const {upload} = require('./utils')

// router.post('/api/resume', passport.authenticate('jwt', {session: false}), isEmployee,validateResume, createResume)
router.post('/api/banner/addimagecode', upload.array('images',2),addUniqueCodeToBannerImage)
router.post('/api/banner', passport.authenticate('jwt', {session: false}),upload.array('imageUrl',20),createBanner)
router.get('/api/banner/getall', passport.authenticate('jwt', {session: false}),getAllBanners)
router.get('/api/banner/getbyid/:id', passport.authenticate('jwt', {session: false}),getBannerById)
router.get('/api/banner/getbyuniquecode/:uniqueCode', passport.authenticate('jwt', {session: false}),getBannerByuniqueCode)
router.get('/api/banner/getbycompanyid/:companyId', passport.authenticate('jwt', {session: false}),getBannerByCompenyId)
// router.get('/api/resume', passport.authenticate('jwt', {session: false}), isEmployee, getMyResumes)



module.exports = router;