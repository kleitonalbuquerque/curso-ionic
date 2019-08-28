'use strict'

const repository = require('../repositories/usuario-repository')
const validation = require('../bin/helpers/validation')
const ctrlBase = require('../bin/base/controller-base')
const _repo = new repository()
const md5 = require('md5')

function usuarioController() {
  
}

usuarioController.prototype.post = async (req, res) => {
  let _validationContract = new validation()

  _validationContract.isRequired(req.body.nome, 'Informe seu nome')
  _validationContract.isRequired(req.body.email, 'Informe seu e-mail')
  _validationContract.isEmail(req.body.senha, 'O e-mail informado é inválido')
  _validationContract.isRequired(req.body.senha, 'A senha é obrigatória')
  _validationContract.isRequired(req.body.senhaConfirmacao, 'A senha de confirmação é obrigatória')
  _validationContract.isTrue(req.body.senha != req.body.senhaConfirmacao, 'A senha e a confirmação não são iguais')

  let usuarioIsEmailExiste = await this._repo.isEmailExiste(req.body.email)
  if(usuarioIsEmailExiste) {
    _validationContract.isTrue((usuarioIsEmailExiste.nome != undefined), `${req.body.email} já existe!`) 
  }

  // Criptografa a senha do usuárioreq.body
  req.body.senha = md5(req.body.senha)

  ctrlBase.post(_repo, _validationContract, req, res)
}

usuarioController.prototype.put = async (req, res) => {
  let _validationContract = new validation()
  
  _validationContract.isRequired(req.body.nome, 'Informe seu nome')
  _validationContract.isRequired(req.body.email, 'Informe seu e-mail')
  _validationContract.isEmail(req.body.senha, 'O e-mail informado é inválido')
  _validationContract.isEmail(req.params.id, 'Informe o Id do usuário que será editado')

  let usuarioIsEmailExiste = await this._repo.isEmailExiste(req.body.email)
  if(usuarioIsEmailExiste) {
    _validationContract.isTrue((usuarioIsEmailExiste.nome != undefined) && 
    (usuarioIsEmailExiste._id != req.params.id), 
    `${req.body.email} já existe!`) 
  }
  ctrlBase.put(_repo, _validationContract, req, res)
}

usuarioController.prototype.get = async (req, res) => {
  ctrlBase.get(_repo, req, res)
}

usuarioController.prototype.getById = async (req, res) => {
  ctrlBase.getById(_repo, req, res)
}

usuarioController.prototype.delete = async (req, res) => {
  ctrlBase.delete(_repo, req, res)
}

module.exports = usuarioController