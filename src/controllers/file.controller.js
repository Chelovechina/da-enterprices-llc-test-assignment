class FileController {
  constructor({ fileService }) {
    this.fileService = fileService;
  }

  async upload(req, res) {
    try {
      const file = await this.fileService.createFile(
        req.userId,
        req.file
      );
      res.status(201).json(file);
    } catch (err) {
      throw err
    }
  }

  async getList(req, res) {
    try {
      const { page = 1, list_size = 10 } = req.query;
      const files = await this.fileService.getList(
        parseInt(page),
        parseInt(list_size)
      );
      res.json(files);
    } catch (err) {
      throw err
    }
  }

  async download(req, res) {
    try {
      const file = await this.fileService.getFileForDownload(req.params.id);
      res.download(file.path, `${file.name}.${file.extension}`);
    } catch (err) {
      throw err
    }
  }

  async delete(req, res) {
    try {
      await this.fileService.deleteFile(req.params.id, req.userId);
      res.sendStatus(204);
    } catch (err) {
      throw err
    }
  }

  async getFileById(req, res) {
    try {
      const file = await this.fileService.getFileById(req.params.id, req.userId);
      res.json(file);
    } catch (err) {
      throw err;
    }
  }

  async update(req, res) {
    try {
      await this.fileService.updateFile(
        req.params.id,
        req.userId,
        req.file
      );
      res.sendStatus(200);
    } catch (err) {
      throw err
    }
  }
}

module.exports = FileController;
