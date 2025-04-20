class UserRepository {
  constructor({ pool }) {
    this.pool = pool;
  }

  async findById(id) {
    const [rows] = await this.pool.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0]
  }

  async create(id, password) {
    await this.pool.query('INSERT INTO users (id, password) VALUES (?, ?)', [id, password])
  }
}

module.exports = UserRepository
