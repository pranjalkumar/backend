'use strict';
const mongoose=require('mongoose');
const fs= require("fs");
const request= require("request");
const http=require("https");
const Schools=require('../models/storage').School;
const GoogleMapsAPI=require('googlemaps');

//public config for connecting to google map
const publicConfig = {
    key: '',//google maps API key
    stagger_time:       1000, // for elevationPath
    encode_polylines:   false,
    secure:             true, // use https
};

const gmAPI = new GoogleMapsAPI(publicConfig);

//searching schools records
exports.getSchool= (req,res)=> {

    //taking search parameter and search value for searching in the database
    //this is a generalised search and can operate over any field value
    //for restricting the usage we can apply a check on the input field value.

    let filter_param=req.body.filter_param;
    let filter_value=req.body.filter_value;

    //creating a dynamic query
    let query={};

    // console.log(filter_param);
    // console.log(filter_value);

    query[filter_param]=filter_value;
    // console.log(query);

    //fetching the mongodb records
    Schools.find(query)
        .exec((err, result) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    message: 'sorry! could not find matching ' + filter_param + " with the value " + filter_value
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: 'Matching record found',
                    data: result
                });
            }
        });
};

//sorting the results based on input parameter and sorting type of the user

exports.getSortedResult=(req,res)=>{

    //taking the required param from the user
    let order_param=req.body.order_param;
    //order type
    let order_type=req.body.order_type;

    let query={};

    //deciding the type of order
    if(order_type=='decending'){
        query[order_param]=-1;
    }else if(order_type=='accending'){
        query[order_param]=1;
    }else{
        res.status(400).json({
            success:false,
            message: 'Invalid order type'
        });
    }

    //returning the sorted results
    Schools.find({})
        .sort(query)
        .exec((err, result) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    message: 'sorry! could not fetch all results'
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: 'Matching record found',
                    data: result
                });
            }
        });
}

//applying filters
//the users will send a filter json array with the specified filter parameter and value

exports.filter=(req,res)=>{
    let filter=req.body.filter;

    //applying the filter

    Schools.find(filter)
        .exec((err, result) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    message: 'sorry! could not find matching ' + filter_param + " with the value " + filter_value
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: 'Matching record found',
                    data: result
                });
            }
        });

}

//getting the latlong of a specified school and making a request too google maps

exports.googleMapIntegration=(req,res)=>{
    let id=req.body._id;

    //finding the school record from id
    Schools.findById(id,function (err,result) {
        if(err){
            res.status(500).json({
                success:false,
                message: 'No data corresponding to the id was found'
            });
        }
        else
        {
            //getting the latitude and longitude

            let location=result.latlong;
            let lat=location.slice(6,22);
            let long=location.slice(23,39);
            let latlang=lat+","+long;


            // console.log(latlang);

            //reverse geocoding from lat and long available

            let reverseGeocodeParams = {
                "latlng":        latlang,
                "result_type":   "postal_code",
                "language":      "en",
                "location_type": "APPROXIMATE"
            };

            gmAPI.reverseGeocode(reverseGeocodeParams, function(err, result){
                console.log(result);
            });
        }

    });
}




