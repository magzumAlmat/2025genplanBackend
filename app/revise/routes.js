const express=require('express')
const router=express.Router()
// const {isEmployee} = require('../auth/middlewares');
const passport = require('passport');
const {createRevise,getAllRevises} = require('./controllers');
const {isInspector,isAdmin} = require('./middlewares');

const {upload} = require('./utils')
// router.post('/api/resume', passport.authenticate('jwt', {session: false}), isEmployee,validateResume, createResume)
router.post('/api/revise/:bannerid', passport.authenticate('jwt', {session: false}),upload.single('image'),isInspector,createRevise)
router.post('/api/revise/:bannerid', passport.authenticate('jwt', {session: false}),upload.single('image'),isAdmin,createRevise)
router.get('/api/revise/getallrevises', passport.authenticate('jwt', {session: false}),upload.single('image'),isInspector,getAllRevises)
// router.get('/api/banner/getall', passport.authenticate('jwt', {session: false}),getAllBanners)
// router.get('/api/banner/getbyid/:id', passport.authenticate('jwt', {session: false}),getBannerById)
// router.get('/api/banner/getbyuniquecode/:uniqueCode', passport.authenticate('jwt', {session: false}),getBannerByuniqueCode)
// router.get('/api/resume', passport.authenticate('jwt', {session: false}), isEmployee, getMyResumes)



module.exports = router;