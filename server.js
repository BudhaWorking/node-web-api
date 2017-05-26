var express = require("express");
var app = express();
var router = express.Router();
var mongoose = require("mongoose");
var Customer = require("./model/customer");
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

mongoose.connect("mongodb://localhost/techminds", function(){
	console.log("Successfully connected to databsae")
})

router.get('/', function(request, response){
	response.send({name: 'Abhi'})
})
router.get("/custmors", function(request, response){
		Customer.getCustomers(function(err, customerData){
				if(err){
					throw err;
				}
				response.json(customerData);
		})
})
router.post('/customer', function(request, response){
	var customerObj = request.body;
	Customer.createCustomer(customerObj,function(err, data){
		if(err){
			throw err
		}
		response.json(data);
	})
})
router.put('/customer/:id', function(request, response){
	var custId= request.params.id;
	var customerObj = request.body;

	Customer.editCustomer(custId, customerObj, function(err, data){
		if(err){
			throw err;
		}
		response.json(data)
	})
})

router.delete('/delcust/:id', function(request,response){
	var custId = request.params.id;
	//var customerObj = request.body;

	Customer.removeCustomer(custId, function(err,data){
		if(err){
			throw err;
		}
		response.json(data)
	})
})

router.get('/getById/:id', function(request, response){
		var custId = request.params.id;
	Customer.getCustomerById(custId,function(err, customerData){
			if(err){
				throw err;
			}
			response.json(customerData)
	})
})

router.put('/editCustomerById/:id', function(request, response){
		var custId = request.params.id;
		var dataFromPostman = request.body;
	Customer.getCustomerById(custId,function(err, DataFromDb){
			if(err){
				throw err;
			}
			console.log(DataFromDb)

		var bodyObject ={
			name : dataFromPostman.name || DataFromDb.name,
			email : dataFromPostman.email || DataFromDb.email,
			mobile : dataFromPostman.mobile || DataFromDb.mobile
		} 
		Customer.editCustomer(custId, bodyObject, function(err, data){
				if(err){
					throw err;
		}
		response.json(data)
		})
	})
})
app.use("/api", router);

var PORT = process.env.PORT || 8002;

app.listen(PORT, function(){
	console.log("Server Listening to PORT:-"+PORT)
})