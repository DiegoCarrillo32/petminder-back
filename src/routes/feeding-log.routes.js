
const express = require("express");
const { createFeedLog, getLastFeedByPet } = require("../controllers/feed_log_controller");
const router = express.Router();
/**
 * feed_log
 * pet_id 
 * last_feed_time (date)
 * fed_by ( user_id )
 * 
 * 
 */
router.post("/feed-pet", async function(req,res){
  const {pet_id, user_id} = req.body
  // Save a feed log to certai n pet
  await createFeedLog(pet_id, user_id)
  
})
router.get("/last-feed", async function(req,res){
  const {pet_id} = req.body
  const result = await getLastFeedByPet(pet_id)
  res.json(result.Items);
})

module.exports = router;