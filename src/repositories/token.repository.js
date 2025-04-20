class TokenRepository {
  constructor({ pool }) {
    this.pool = pool
  }

  async save(token, refreshToken, userId, deviceId) {
    await this.pool.query(
      'INSERT INTO tokens (user_id, token, refresh_token, device_id) VALUES (?, ?, ?, ?)',
      [userId, token, refreshToken, deviceId]
    );
  }

  async invalidate(token) {
    await this.pool.query(
      'UPDATE tokens SET is_active = FALSE WHERE token = ? OR refresh_token = ?',
      [token, token]
    );
  }

  async isValid(token) {
    const [rows] = await this.pool.query(
      'SELECT 1 FROM tokens WHERE (token = ? OR refresh_token = ?) AND is_active = TRUE',
      [token, token]
    );
    return rows.length > 0;
  }
}

module.exports = TokenRepository
