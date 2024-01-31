const albumSchema = require("../../models/album");

const createAlbum = async (req, res) => {
    const userId = req.userId;
    const {title, privacy} = req.body
};
const getAlbum = async (req, res) => {};
const getAllAlbum = async (req, res) => {};
const updateAlbum = async (req, res) => {};
const deleteAlbum = async (req, res) => {};

module.exports = {createAlbum};
