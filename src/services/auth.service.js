require('dotenv').config()
const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')
const { BadRequestError, NotFoundError } = require("../errors");

class AuthService {
  constructor({ userRepository, tokenService }) {
    this.userRepository = userRepository;
    this.tokenService = tokenService;
  }

  async signUp({ id, password }) {
    const existingUser = await this.userRepository.findById(id)
    if (existingUser) {
      throw new BadRequestError('User already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    await this.userRepository.create(id, hashedPassword)

    const deviceId = uuidv4()
    return this.tokenService.generateTokens(id, deviceId)
  }

  async signIn({ id, password }) {
    const user = await this.userRepository.findById(id)
    if (!user) {
      throw new BadRequestError('Invalid credentials')
    }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      throw new BadRequestError('Invalid credentials')
    }

    const deviceId = uuidv4()
    return this.tokenService.generateTokens(id, deviceId)
  }

  async getById(id) {
    const user = await this.userRepository.findById(id)
    if (!user) {
      throw new NotFoundError('User not found')
    }

    return user
  }
}

module.exports = AuthService;
