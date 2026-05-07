const FileModel = require("../model/file.model");
const fs = require("fs");
const path = require("path");

const createFile = async (req, res) => {
  try {
    const file = req.file;
    const payload = {
      path: file.destination + file.filename,
      filename: file.filename,
      size: file.size,
      type: file.mimetype.split("/")[0],
    };
    const newFile = await FileModel.create(payload);

    res.status(200).json({ newFile });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const fetchFile = async (req, res) => {
  try {
    const file = await FileModel.find();
    res.status(200).json(file);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteFile = async (req, res) => {
  try {
    const { id } = req.params;

    const file = await FileModel.findByIdAndDelete(id);
    if (!file) return res.status(404).json({ message: "File not found" });

    fs.unlink(file.path, (err) => {
      if (err) console.log(err);
    });
    res.status(200).json({ message: "File deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const downloadFile = async (req, res) => {
  try {
    const { id } = req.params;
    const file = await FileModel.findById(id);
    if (!file) return res.status(404).json({ message: "File not found" });

    const root = process.cwd();
    const filePath = path.join(root, file.path);

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${file.filename}"`,
    );

    res.sendFile(filePath, (err) => {
      if (err) res.status(500).json({ message: "Error downloading file" });
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createFile,
  fetchFile,
  deleteFile,
  downloadFile,
};
