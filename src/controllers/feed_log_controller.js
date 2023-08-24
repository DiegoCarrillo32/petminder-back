const { DYNAMO_CLIENT } = require("../dynamo.config");
const { FEED_LOG_TABLE_NAME } = require("../helpers/constants")
const { v4: uuidv4 } = require('uuid');

const createFeedLog = async (pet_id, user_id) => {
  const params = {
    TableName: FEED_LOG_TABLE_NAME,
    Item: {
        feed_log_id: uuidv4(),
        pet_id,
        last_feed_time: new Date().getTime(),
        fed_by: user_id
    }

    
  }
  const result = await DYNAMO_CLIENT.put(params).promise()
  console.log(result);
  return result;
}
/**
 * 
 *     TableName: 'YourTableName', // Replace with your table name
    IndexName: 'date-index',    // Replace with the index name for your date attribute
    KeyConditionExpression: 'userId = :u',
    ExpressionAttributeValues: {
      ':u': userId
    },
    ScanIndexForward: false,    // Set to true if you want ascending order
    Limit: 1
 */
const getLastFeedByPet = async (pet_id) => {
    const params = {
        TableName: FEED_LOG_TABLE_NAME,
        FilterExpression: "pet_id = :pet_id",
        ExpressionAttributeValues: {
            ":pet_id":pet_id
        },
        Limit:1


      }
      const result = await DYNAMO_CLIENT.scan(params).promise();
      
      return result
}

module.exports = {
    createFeedLog,
    getLastFeedByPet
}