require('../models/categoria-model')
const mongoose = require('mongoose')
const CategoriaModel = mongoose.model('Categoria')

class CategoriaRepository {
  constructor() {

  }

  async create(data) {
    let categoria = new CategoriaModel(data)
    let resultado = await categoria.save()
    return resultado
  }

  async update(id, data) {
    await CategoriaModel.findByIdAndUpdate(id, { $set: data })
    let resultado = await CategoriaModel.findById(id)
    return resultado
  }

  async getAll() {
    return await CategoriaModel.find()
  }

  async getById(id) {
    return await CategoriaModel.findById(id)
  }

  async delete(id) {
    return await CategoriaModel.findByIdAndRemove(id)
  }

}

module.exports = CategoriaRepository