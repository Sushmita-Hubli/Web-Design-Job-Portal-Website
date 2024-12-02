const mongoose=require('mongoose')
const bcrypt = require('bcrypt');

const companySchema=mongoose.Schema(
{
    
       companyname: {
        type: String,
        required : [true, "Please Enter Company Name"],
        minlength: [3, "Company name must be at least 3 characters long"]
       },
    jobrole: {
        type: String,
        required: [true,"Please enter job role"],
        
    },
    description: {
        type:String,
        required:[true,"Plase Enter job description"],
    },
    applylink: {
        type:String,
        required:[true,"Plase Enter link"],
    },

    salary: {
        type: String,
        required: [true, "Please specify the salary"],
       
    },

    profileImage: {
        type: String, // Add this field to store the file path of the uploaded image
    }
    
},
{
    timestamps:true
}
);





const Company= mongoose.model('Company',companySchema);

module.exports=Company;