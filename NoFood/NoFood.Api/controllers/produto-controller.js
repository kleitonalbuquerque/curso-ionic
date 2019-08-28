'use strict'

const repository = require('../repositories/produto-repository')
const ctrlBase = require('../bin/base/controller-base')
const validation = require('../bin/helpers/validation')
const _repo = new repository()


function produtoController() {

}

produtoController.prototype.post = async (req, res) => {
  
  let _validationContract = new validation()

  _validationContract.isRequired(req.body.nome, 'O nome é obrigatório')
  _validationContract.isRequired(req.body.descricao, 'A descrição é obrigatória')
  _validationContract.isRequired(req.body.preco, 'O preço é obrigatório')
  _validationContract.isRequired(req.body.foto, 'A foto é obrigatória')

  if(req.body.preco)
  _validationContract.isTrue(req.body.preco == 0, 'O preço do produto dever ser maior que ZERO')

  ctrlBase.post(_repo, _validationContract, req, res)
}

produtoController.prototype.put = async (req, res) => {
  let _validationContract = new validation()

  _validationContract.isRequired(req.body.nome, 'O nome é obrigatório')
  _validationContract.isRequired(req.body.descricao, 'A descrição é obrigatória')
  _validationContract.isRequired(req.body.preco, 'O preço é obrigatório')
  _validationContract.isRequired(req.body.foto, 'A foto é obrigatória')
  
  if(req.body.preco)
  _validationContract.isTrue(req.body.preco == 0, 'O preço do produto dever ser maior que ZERO')

  ctrlBase.put(_repo, _validationContract, req, res)
}

produtoController.prototype.get = async (req, res) => {
  ctrlBase.get(_repo, req, res)
}

produtoController.prototype.getById = async (req, res) => {
  ctrlBase.getById(_repo, req, res)
}

produtoController.prototype.delete = async (req, res) => {
  ctrlBase.delete(_repo, req, res)
}

module.exports = produtoController