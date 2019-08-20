const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const variables = require('../bin/config/variables')

// Routers
const categoriaRouter = require('../routes/categoria-router')
const produtoRouter = require('../routes/produto-router')

// Criando/Invocando API/Server Web do Express
const app = express()

// Configuração de Parse do JSON
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Configurando conexão com banco de dados
mongoose.connect(variables.Database.connection, {
  useCreateIndex: true,
  useNewUrlParser: true
})

// Configurando as rotas
app.use('/api/categoria', categoriaRouter)
app.use('/api/produto', produtoRouter)

// Exportando nossa API
module.exports = app