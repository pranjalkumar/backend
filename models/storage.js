const mongoose=require('mongoose');

//schema for storing the record
const storageSchema= mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    district:{type:String},
    block:{type:String},
    cluster:{type:String},
    schoolid:{type:Number},
    schoolname:{type:String},
    category:{type:String},
    gender:{type:String},
    medium_of_inst:{type:String},
    address:{type:String},
    area:{type:String},
    pincode:{type:String},
    landmark:{type:String},
    identification1:{type:String},
    busroutes:{type:String},
    identification2:{type:String},
    latlong:{type:String}
});


const file_data=mongoose.model('file_data',storageSchema);

module.exports={
    School:file_data,
}
// module.exports=mongoose.model('Product',productSchema);