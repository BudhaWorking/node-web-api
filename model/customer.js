var mongoose = require("mongoose");

var  customerSchema =mongoose.Schema({
	name : {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	mobile:{
		type: String,
		required: true
	}
});
var Customer= module.exports = mongoose.model("customer", customerSchema, "customer");
// get data from database

module.exports.getCustomers = function(callback){
	return Customer.find(callback)

}
//create data or post the data
module.exports.createCustomer = function(customerObj, callback){
	return Customer.create(customerObj, callback)
}
// updating recorde
module.exports.editCustomer = function(custId, customerObj, callback){
	return Customer.update({_id : custId},
		{$set: {
			name : customerObj.name,
			email : customerObj.email,
			mobile: customerObj.mobile
		}}, callback)
}
module.exports.removeCustomer = function(custId, callback){
	return Customer.remove({_id : custId},callback)
}
module.exports.getCustomerById = function(custId, callback){
	return Customer.findById({_id : custId}, callback)
}
