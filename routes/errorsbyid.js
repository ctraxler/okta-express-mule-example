require('dotenv').config();

const express = require('express');
const router = express.Router();
const got = require('got');

console.log('setting up errorsbyid');


router.get('/',  async (req, res) => {
  
  let id = req.query.id; 	
  console.log(id);	
  var options = {
  	hostname : process.env.HOST,
  	path : process.env.SYSUTILPATH + id, 
  	protocol: process.env.PROTOCOL,
    port: process.env.REQUEST_PORT,
    method: 'GET',
    headers: {
    	client_id : process.env.CLIENT_ID,
    	client_secret: process.env.CLIENT_SECRET
    }
  }

  console.log(options);

  try {
		const response = await got(options);

		var rows = JSON.parse(response.body);

		console.log('Response body has ' + rows.length + ' rows');

		console.log(rows);
		//=> '<!doctype html> ...'
	  	res.render('errorsbyid', {userContext : req.userContext, id : id, rows : rows});
	} catch (error) {
		console.log(error.response.body);
		//=> 'Internal server error ...'
		res.redirect('/login');
	}



});

module.exports = router;
