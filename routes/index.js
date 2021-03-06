const express = require('express');
const router  = express.Router();
const passport = require("../config/passport")

const {signup, signUpView, login, loginView, logout} = require("../controllers/authControllers")
const {createProjectView,projectsView,projectPost,detailProject,detailProjectPost,deleteProject}=require("../controllers/projectsControllers")
const {isAuthenticated,checkRole}=require("../middlewares")
/* GET home page */
router.get('/', (req, res, next) => {

  res.render('index');
});
router.get('/signup',signUpView);
router.post('/signup',signup)
router.get("/login", loginView)
router.post("/login",
            passport.authenticate("local",{
              successRedirect:"/projects",
              failureRedirect:"/login",
              failureFlash:true,
              failureMessage:"The input data is incorrect"
              
            }))

            //Aqui va facebook
router.get('/auth/facebook', passport.authenticate('facebook'));
 router.get('/auth/facebook/callback',
   passport.authenticate('facebook', { successRedirect: '/create',
  failureRedirect: '/login' }, ));



router.get('/create',isAuthenticated,createProjectView)
 // router.get('/create',createPlaceView)

  router.get("/logout",logout)
  
  
  //router.get("/create",placesView)
  router.post("/create",projectPost)
  router.get("/projects",projectsView)
  router.get('/projects/:id', isAuthenticated, detailProject)
  router.post('/projects/:id', isAuthenticated, detailProjectPost)
  router.get('/delete/:id', isAuthenticated, deleteProject)

module.exports = router;
