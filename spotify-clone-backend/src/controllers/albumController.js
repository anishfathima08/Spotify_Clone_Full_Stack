import { v2 as cloudinary } from "cloudinary"
import albumModel from '../models/albumModel.js'

const addAlbum = async (req, res) => {
    try {

        const { name, desc, bgColour } = req.body
        const imageFile = req.file
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const albumData = {
            name,
            desc,
            bgColour,
            image: imageUpload.secure_url,
        }
        const album = albumModel(albumData)
        await album.save()

        res.json({ success: true, message: "Album Added" })

    }
    catch (error) {

        res.json({ success: false, message: "Album Add Failed" })

    }

}

const listAlbum = async (req, res) => {
    try {

        const allAlbums = await albumModel.find({})
        res.json({ success: true, albums: allAlbums })

    } 
    catch (error) {

        res.json({ success: false, message: "Album List Failed" })

    }
}

const removeAlbum = async (req, res) => {
    try {

        await albumModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Album removed success" })

    } 
    catch (error) {

        res.json({ success: false, message: "Album removed Failed" })

    }
}

export { addAlbum, listAlbum, removeAlbum }