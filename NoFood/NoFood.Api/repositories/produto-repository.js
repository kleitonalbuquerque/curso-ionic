require('../models/produto-model')
const mongoose = require('mongoose')
const ProdutoModel = mongoose.model('Produto')

class ProdutoRepository {
  constructor() {

  }

  async create(data) {
    let produto = new ProdutoModel(data)
    let resultado = await produto.save()
    return resultado
  }

  async update(id, data) {
    await ProdutoModel.findByIdAndUpdate(id, { $set: data })
    let resultado = await ProdutoModel.findById(id)
    return resultado
  }

  async getAll() {
    return await ProdutoModel.find()
  }

  async getById(id) {
    return await ProdutoModel.findById(id)
  }

  async delete(id) {
    return await ProdutoModel.findByIdAndRemove(id)
  }

}

module.exports = ProdutoRepository