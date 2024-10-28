import { v2 as cloudinary } from "cloudinary"
import albumModel from "../models/albumModel.js"

const addAlbum = async (req, res) => {
    try {
        const { name, desc, bgColor } = req.body
        const imageFile = req.file
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })

        const albumData = {
            name,
            desc,
            bgColor,
            image: imageUpload.secure_url
        }

        const album = albumModel(albumData)
        await album.save()

        res.status(201).json({ success: true, message: "Album addded" })

    } catch (error) {
        res.status(400).json({ success: false })
    }
}

const listAlbum = async (req, res) => {
    try {
        const allAlbums = await albumModel.find()
        res.status(200).json({ success: true, albums: allAlbums })

    } catch (error) {
        res.status(400).json({ success: false })
    }
}

const removeAlbum = async (req, res) => {
    try {

        await albumModel.findByIdAndDelete(req.body.id)
        res.status(200).json({ success: true, message: "Album remove" })

    } catch (error) {
        res.status(400).json({ success: false })
    }
}

export {
    addAlbum, listAlbum, removeAlbum
}