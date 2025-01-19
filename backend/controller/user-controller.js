const cloudinary = require("../config/cloudinary-config");

const updateProfile = async (req,res) => {

    try {
        const {image, ...otherData} = req.body;
        const updateData= otherData;

        if(image){
            if(image.startsWith("data:image")){
                try{
                    const result = await cloudinary.uploader.upload(image);
                    updateData.image = result.secure_url;
                }
                catch(error){
                    res.status(500).json({
                        success:false,
                        message:"error in uploading image"
                    })
                }
            }
        }

        const user = await User.findByIdAndUpdate(req.user._id, updateData, {new: true});

        res.status(200).json({
            success:true,
            message:"profile updated successfully",
            user
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"error in updating profile"
        })
    }   
}



