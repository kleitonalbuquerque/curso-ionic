const variables = {
  Api: {
    port: process.env.port || 3000
  },
  Database: {
    connection: process.env.connection || 'mongodb+srv://admin:abcd1234@cluster0-6wyin.mongodb.net/test?retryWrites=true&w=majority'
  }
}

module.exports = variables