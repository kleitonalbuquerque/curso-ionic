'use strict'

const repository = require('../repositories/usuario-repository')
const validation = require('../bin/helpers/validation')
const ctrlBase = require('../bin/base/controller-base')
const _repo = new repository()
const md5 = require('md5')
const jwt = require('jsonwebtoken')
const variables = require('../bin/config/variables')

function usuarioController() {
  
}

usuarioController.prototype.post = async (req, res) => {

  let _validationContract = new validation()

  _validationContract.isRequired(req.body.nome, 'Informe seu nome')
  _validationContract.isRequired(req.body.email, 'Informe seu e-mail')
  _validationContract.isEmail(req.body.email, 'O e-mail informado é inválido')
  _validationContract.isRequired(req.body.senha, 'A senha é obrigatória')
  _validationContract.isRequired(req.body.senhaConfirmacao, 'A senha de confirmação é obrigatória')
  _validationContract.isTrue(req.body.senha != req.body.senhaConfirmacao, 'A senha e a confirmação não são iguais')

  let usuarioIsEmailExiste = await _repo.isEmailExiste(req.body.email)
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
  _validationContract.isEmail(req.body.email, 'O e-mail informado é inválido')
  _validationContract.isRequired(req.params.id, 'Informe o Id do usuário que será editado')

  let usuarioIsEmailExiste = await _repo.isEmailExiste(req.body.email)
  if(usuarioIsEmailExiste) {
    _validationContract.isTrue(
    (usuarioIsEmailExiste.nome != undefined) && 
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

usuarioController.prototype.autenticar = async (req, res) => {
  let _validationContract = new validation()

  _validationContract.isRequired(req.body.email, 'Informe seu email')
  _validationContract.isEmail(req.body.email, 'Email inválido')
  _validationContract.isRequired(req.body.senha, 'Informe sua senha')

  if(!_validationContract.isValid()) {
    res.status(400).send({ message: 'Não foi possível fazer o login', validation: _validationContract.errors() })
    return
  }

  let usuarioEncontrado = await _repo.authenticate(req.body.email, req.body.senha)

  if(usuarioEncontrado) {
    res.status(200).send({
      usuario: usuarioEncontrado,
      token: jwt.sign({ user: usuarioEncontrado }, variables.Security.secretKey)
    })
  }else{
    res.status(404).send({ message: 'Usuário e senha inválidos' })
  }

}

module.exports = usuarioController