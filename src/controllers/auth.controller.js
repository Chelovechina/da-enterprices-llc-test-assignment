class AuthController {
  constructor({ authService, tokenService }) {
    this.authService = authService;
    this.tokenService = tokenService;
  }

  async signUp(req, res) {
    try {
      const tokens = await this.authService.signUp(req.body)
      res.status(201).json(tokens)
    } catch (err) {
      throw err
    }
  }

  async signIn(req, res) {
    try {
      const tokens = await this.authService.signIn(req.body)
      res.json(tokens)
    } catch (err) {
      throw err
    }
  }

  async refresh(req, res) {
    try {
      const tokens = await this.tokenService.refreshTokens(req.body.refreshToken)
      res.json(tokens)
    } catch (err) {
      throw err
    }
  }

  async info(req, res) {
    try {
      const user = await this.authService.getById(req.userId);
      res.json({ id: user.id });
    } catch (err) {
      throw err
    }
  }

  async logout(req, res) {
    try {
      await this.tokenService.invalidate(req.token);
      res.sendStatus(200);
    } catch (err) {
      throw err
    }
  }
}

module.exports = AuthController;
