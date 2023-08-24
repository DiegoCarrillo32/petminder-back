
const express = require("express");
const { registerPet, getPets  } = require("../controllers/pet_controller");
const router = express.Router();
/**
 * 
 * user_id (user_id)
 * pet_name ( Jango, Enzo )
 * pet_feeding_times ( 1, 2, 3)
 * pet_feeding_hours_span (8 / 12 / 24)
 * pet_first_food_time ( 6am, 8am, etc) ???
 */
// Home page route.
router.post("/register-pet", async function (req, res) {
  const {user_id, pet_name, pet_feeding_times, pet_feeding_hours_span} = req.body
  // TODO: validar campos
  await registerPet(user_id, pet_name, pet_feeding_times, pet_feeding_hours_span)
});

router.get("/get-pets", async function(req, res) {
  const { user_id } = req.body
  const result =  await getPets(user_id)
  console.log(result);
  res.status(200).json(result)
})


// About page route.
router.get("/about", function (req, res) {
  res.send("About this pet");
});

module.exports = router;