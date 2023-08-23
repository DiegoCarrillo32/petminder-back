
const express = require("express");
const { v4: uuidv4 } = require('uuid');
const { addOrUpdateUser, createPetFeeder, getUserByUserAndPassword, getFeederByUserAndPassword } = require("../controllers/user_controller");
const router = express.Router();
// TODO: Agregra middleware para evitar validar por el mismo campo todo el tiempo
/**
 * 
 * user_id
 * username
 * password
 * role (default: owner, feeder)
 */
// Home page route.
router.post("/register", async function (req, res) {

  const {password, username} = req.body
  if(!password || !username ) res.status(404).json({
    msg: "Fields cant be empty",
    success: false
  })
  const user = await addOrUpdateUser({
    user_id: uuidv4(),
    password,
    username,
    role: 'owner'
  })

  console.log(user, " USUARIO");
  res.status(202).json({
    msg:"User created succesfully",
    success: true,
    user
  })
})

router.get("/login", async function(req, res) {
  const {password, username} = req.body
  if(!password || !username ) res.status(404).json({
    msg: "Data is missing",
    success: false
  })
  const result = await getUserByUserAndPassword(password, username)
  
  if(result.success){
    return res.status(201).json(result)
  } else {
    return res.status(404).json(result)
  }
  
})

// About page route.
router.get("/register-feeder", async function (req, res) {
  const {username, password, user_id} = req.body
  await createPetFeeder(password, username, user_id) // crea un pet feeder para el usuario
});

router.get("/login-feeder", async function (req, res) {
  const {username, password} = req.body
  const result = await getFeederByUserAndPassword(password, username) // crea un pet feeder para el usuario
  if(result.success){
    return res.status(201).json(result)
  } else {
    return res.status(404).json(result)
  }
});

module.exports = router;