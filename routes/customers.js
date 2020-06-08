const mongoose = require('mongoose');
const express = require('express');
const router = new express.Router();

//const auth = require('../middleware/auth.js')

const Customer = require('../models/customer_model'); 


// Creating a customer 

router.post('/customers', async (req, res) => {
    const customer= new Customer(req.body);
    try {
      await customer.save();
      res.status(201).send(customer);  
    } catch (error){
      res.status(400).send(error);
    }
  });
  
// getting a list of customers TERMINAR ESTE CODIGO 

router.get('/customers/', async (req, res) => {
  
  
  
    res.send(req.customer);
  });
  
// getting an specific customer by id

router.get('/customers/:_id', async (req, res) => {
    const {_id} = req.params;
    if (mongoose.Types.ObjectId.isValid(_id)) {
      try {
        const customer = await Customer.findById(_id);
        if (!customer) {
          // The gotcha here is that this will only trigger if the
                  // _id param sent is 12 bits (12 character string)
          return res.status(404).send();
        }
        res.send(customer);
      } catch (e) {
        res.status(500).send();
      }
    } else {
      res.status(400).send('Not a valid id');
    } 
  });
  
//updating data's customer

router.patch('/customers/:id', async (req, res) => {
    //object.keys  will return a list of keys in an array
    const updates = Object.keys(req.body);
    const allowedUpdates = ['email', 'phone', 'address', 'zipcode'];
  
    //for every element in the updates, if the update element match with some 
    //of the allowedUpdates, so return true valid operation.
    const isValidOperation = updates.every(update =>
      allowedUpdates.includes(update)
    );
    if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' });
    }
    try {
        const customer = await Customer.findById(req.params.id);

        updates.forEach(update => (customer[update] = req.body[update]));
        await customer.save();
        if (!customer) {
        return res.status(404).send();
        }
        res.send(customer);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
// Deleting customer

router.delete('/companies/:id', async (req, res) => {
    try {
      const customer = await Customer.findByIdAndDelete(req.params.id);
      if (!customer) {
        res.status(404).send();
      }
  
      res.send(customer);
    } catch (error) {
      res.status(500).send();
    }
  });


module.exports = router;