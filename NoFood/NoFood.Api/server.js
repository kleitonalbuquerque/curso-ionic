'use strict'

const app = require('../NoFood.Api/bin/express')
const variables = require('../NoFood.Api/bin/config/variables')

app.listen(variables.Api.port, () => {
  console.log(`API inicializada com sucesso na porta ${variables.Api.port}`)
})