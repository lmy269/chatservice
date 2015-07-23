/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var uuid = require('uuid');

module.exports = {

  attributes: {
  	id : {
  		type : 'string',
  		unique: true,
  		required: true,
  		primaryKey: true
  	},
  	chatId : {
  		type : 'string',
  		unique: true,
  		required : true
  	},
  	phone : {
  		type : 'string',
  		unique : true,
  		required: true
  	},
  	gender : {
  		type : 'string',
  		in: ['male', 'female'],
        required: true
  	},
  	name : 'string',
  	nickName : 'string',
  	sign : 'string',
  	regionProvinceId : 'int',
  	regionCityId : 'int',
  	homeProvinceId : 'int',
  	homeCityId : 'int'
  },

  getId: function () {
  	return uuid.v4();
  },

  parseBody: function(req) {
  	var user = {};
  	user.name = req.body.name;
	user.nickName = req.body.nickName;
	user.sign = req.body.sign;
	user.regionProvinceId = req.body.regionProvinceId;
	user.regionCityId = req.body.regionCityId;
	user.homeProvinceId = req.body.homeProvinceId;
	user.homeCityId = req.body.homeCityId;
	user.gender = req.body.gender;
	user.phone = req.body.phone;

	return user;
  }
};
