class FileRepository {
  constructor({ pool }) {
    this.pool = pool;
  }

  async create(fileData) {
    const [result] = await this.pool.query(
      `INSERT INTO files (
        user_id,
        name,
        extension,
        mime_type,
        size,
        path
      )
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        fileData.userId,
        fileData.name,
        fileData.extension,
        fileData.mimeType,
        fileData.size,
        fileData.path,
      ]
    );
    return this.findById(result.insertId);
  }

  async getList(limit, offset) {
    const [rows] = await this.pool.query(
      `SELECT 
        id,
        name,
        extension,
        mime_type as mimeType,
        size,
        upload_date as uploadDate
      FROM files 
      ORDER BY upload_date DESC
      LIMIT ? OFFSET ?`,
      [limit, offset]
    );
    return rows;
  }

  async findById(id) {
    const [rows] = await this.pool.query(
      `SELECT 
        id,
        user_id,
        name,
        extension,
        mime_type as mimeType,
        size,
        upload_date as uploadDate,
        path
      FROM files WHERE id = ?`,
      [id]
    );
    return rows[0] || null;
  }

  async delete(id) {
    const [result] = await this.pool.query(
      `DELETE FROM files WHERE id = ?`,
      [id]
    );
    return result.affectedRows > 0;
  }

  async update(id, fileData) {
    const [result] = await this.pool.query(
      `UPDATE files SET 
        name = ?,
        extension = ?,
        mime_type = ?,
        size = ?,
        path = ?,
        upload_date = NOW()
      WHERE id = ?`,
      [
        fileData.name,
        fileData.extension,
        fileData.mimeType,
        fileData.size,
        fileData.path,
        id
      ]
    );
    return result.affectedRows > 0;
  }
}

module.exports = FileRepository;
