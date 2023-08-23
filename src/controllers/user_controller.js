const {DYNAMO_CLIENT} = require("../dynamo.config")
const {USER_TABLE_NAME, FEEDER_TABLE_NAME} = require("../helpers/constants")
const { v4: uuidv4 } = require('uuid');
const userInformation = async () => {
    const params = {
      TableName: USER_TABLE_NAME,
  
    };
    const characters = await DYNAMO_CLIENT.scan(params).promise()
    console.log(characters);
    return characters;
  }

  const addOrUpdateUser = async (user) => {
    const params = {
        TableName: USER_TABLE_NAME,
        Item: user
    }

    return await DYNAMO_CLIENT.put(params).promise()
  }

  const getUserByUserAndPassword = async (password, username) => {
    const params = {
        TableName: USER_TABLE_NAME,
        FilterExpression: "username = :username",
        ExpressionAttributeValues: {
            ":username":username
        },
        Limit: 1
    } 
    
    const {Items} = await DYNAMO_CLIENT.scan(params).promise()
    if(Items[0].password === password) return {
      msg: "Data is consistent",
      success: true,
      user: Items[0] // TODO: Remove password from return
    }
    else return {
      msg: "Data is not consistent",
      success: true,
      user: null
    }
    
  }

  const createPetFeeder = async (password, username, user_id) => {
    const params = {
      TableName: FEEDER_TABLE_NAME,
      Item: {
        feeder_id:  uuidv4(),
        user_id,
        password,
        username,
        role: 'feeder'
      }
    }

    return await DYNAMO_CLIENT.put(params).promise()
  }
module.exports =  {
    userInformation,
    addOrUpdateUser,
    getUserByUserAndPassword,
    createPetFeeder
}