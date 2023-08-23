const {DYNAMO_CLIENT} = require("../dynamo.config")
const {USER_TABLE_NAME} = require("../helpers/constants")

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
    if(Items[0].password === password) return true
    else return false
    
  }
module.exports =  {
    userInformation,
    addOrUpdateUser,
    getUserByUserAndPassword
}