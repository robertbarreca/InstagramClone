import M from "materialize-css"

const uploadPicCloud = async (image) => {
    if (!image.type.startsWith('image/')) {
            M.toast({ html: "Please upload a valid image file", classes: "#c62828 red darken-3" })
            return
        }
        // add url to cloud if all fields are filled and image is of type image
        try {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "instaclone")
        data.append("cloud_name", "dgbh16ua3")
        const res = await fetch("https://api.cloudinary.com/v1_1/dgbh16ua3/image/upload", {
            method: "POST",
            body: data,
        })
            // set url upon succesful post
            const json = await res.json()
            return json.secure_url
        } catch (error) {
            console.error(error)
            return ""
        }
}

export default uploadPicCloud