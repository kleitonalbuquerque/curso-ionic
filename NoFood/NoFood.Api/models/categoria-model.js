'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.set('useCreateIndex', true)

const categoriaModel = new Schema({
  titulo: {
    trim: true,
    index: true,
    required: true,
    type: String
  },
  descricao: { type: String },
  foto: {
    type: String,
    required: true
  },
  ativo: {
    type: Boolean,
    required: true
  },
  dataCriacao: {
    type: Date,
    default: Date.now
  }
},{ versionKey: false })

categoriaModel.pre('save', next => {
  let agora = new Date()
  if (!this.dataCriacao)
    this.dataCriacao = agora
  next()
})

module.exports = mongoose.model('Categoria', categoriaModel)