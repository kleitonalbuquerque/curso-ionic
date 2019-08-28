const variables = {
  Api: {
    port: process.env.port || 3000
  },
  Database: {
    connection: process.env.connection || 'mongodb+srv://admin:abcd1234@cluster0-6wyin.mongodb.net/nofood'
  },
  Security: {
    secretKey: 'd41d8cd98f00b204e9800998ecf8427e|ad49ed070ac42a479e78600215917b6c'
  }
}

module.exports = variables