const AWS = require("aws-sdk");
require("dotenv").config()

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_DEFAULT_REGION
})

const DYNAMO_CLIENT = new AWS.DynamoDB.DocumentClient()
module.exports = {
    DYNAMO_CLIENT
}
