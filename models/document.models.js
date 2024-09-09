const mongoose = require('mongoose')
const {v4:uuidv4} = require("uuid")
const DocumentSchema = mongoose.Schema(
    {   
        _id: {
            type: String,
            required : [true],
            default: () => uuidv4(),
        },
        title : {
            type : String,
            required : [true, "Please enter title of the document"],
        },
        
        desc : {
            type : String,
            
        },

    }, 
    {
        timestamps: true,
    }
);

const Document = mongoose.model("Document", DocumentSchema);

module.exports = Document;