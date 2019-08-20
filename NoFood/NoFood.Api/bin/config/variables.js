const variables = {
  Api: {
    port: process.env.port || 3000
  },
  Database: {
    connection: process.env.connection || 'mongodb+srv://admin:node123456@cluster0-vvcjz.mongodb.net/test?retryWrites=true&w=majority'
  }
}

module.exports = variables