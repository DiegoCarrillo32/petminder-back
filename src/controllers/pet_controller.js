const {DYNAMO_CLIENT} = require("../dynamo.config")
const {PET_TABLE_NAME} = require("../helpers/constants")
const { v4: uuidv4 } = require('uuid');

const registerPet = async (user_id, pet_name, pet_feeding_times, pet_feeding_hours_span) => {
    const params = {
       TableName: PET_TABLE_NAME,
       Item: { 
            pet_id: uuidv4(),
            user_id,
            pet_name,
            pet_feeding_times,
            pet_feeding_hours_span
       }
    }
    return await DYNAMO_CLIENT.put(params).promise()
}

const getPets = async (user_id) => {
  const params = {
    TableName: PET_TABLE_NAME,
    FilterExpression: "user_id = :user_id",
    ExpressionAttributeValues: {
        ":user_id":user_id
    },
  }
  return await DYNAMO_CLIENT.scan(params).promise()
}

module.exports = {
    registerPet,
    getPets
}