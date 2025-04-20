const fs = require('fs');
const path = require('path');
const { BadRequestError, NotFoundError } = require('../errors');

class FileService {
  constructor({ fileRepository }) {
    this.fileRepository = fileRepository;
  }

  async createFile(userId, uploadedFile) {
    if (!uploadedFile) {
      throw new BadRequestError('No file uploaded');
    }

    const fileData = {
      name: path.parse(uploadedFile.originalname).name,
      extension: path.extname(uploadedFile.originalname).substring(1),
      mimeType: uploadedFile.mimetype,
      size: uploadedFile.size,
      path: uploadedFile.path,
      userId
    };

    const dbFile = await this.fileRepository.create(fileData);

    if (!fs.existsSync(uploadedFile.path)) {
      throw new Error('File was not saved to storage');
    }

    return dbFile;
  }

  async getList(page, limit) {
    const offset = (page - 1) * limit;
    return await this.fileRepository.getList(limit, offset);
  }

  async getFileForDownload(id) {
    const file = await this.getFileById(id);

    if (!fs.existsSync(file.path)) {
      throw new NotFoundError('File not found on server');
    }

    return file;
  }

  async deleteFile(id, userId) {
    const file = await this.getOwnedFile(id, userId);
    const isDeleted = await this.fileRepository.delete(id);

    if (!isDeleted) {
      throw new Error('Failed to delete file from database');
    }

    try {
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
    } catch (err) {
      console.error(`Failed to delete file ${file.path}:`, err);
    }

    return file;
  }

  async getFileById(id) {
    const file = await this.fileRepository.findById(id);
    if (!file) {
      throw new NotFoundError('File not found');
    }

    return file
  }

  async updateFile(id, userId, newFile) {
    const oldFile = await this.getOwnedFile(id, userId);

    const updateData = {
      name: path.parse(newFile.originalname).name,
      extension: path.extname(newFile.originalname).substring(1),
      mimeType: newFile.mimetype,
      size: newFile.size,
      path: newFile.path
    };

    const updatedFile = await this.fileRepository.update(id, updateData);

    if (fs.existsSync(oldFile.path)) {
      fs.unlinkSync(oldFile.path);
    }

    return updatedFile
  }

  async getOwnedFile(id, userId) {
    const file = await this.fileRepository.findById(id);
    if (!file || file.user_id !== userId) {
      throw new NotFoundError('File not found');
    }

    return file;
  }
}

module.exports = FileService;
