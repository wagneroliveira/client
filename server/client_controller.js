var express = require('express');
var router = express.Router();
var Client = require('./client');

router.post('/', (req, res) => {
    let c = new Client({
        name: req.body.name,
        cpf: req.body.cpf,
        phone: req.body.phone,
        address: req.body.address 
       
    });
    c.save((err, cl) => {
        if(err)
            res.status(500).send(err);
        else    
            res.status(200).send(cl);
    })
})


router.get('/', (req, res) => {
    Client.find().exec((err, cls) => {
        if(err)
            res.status(500).send(err);
        else    
            res.status(200).send(cls);        
    })
})

router.delete('/:id', (req, res) => {
    Client.deleteOne({_id: req.params.id}, (err) => {
        if(err)
            res.status(500).send(err);
        else    
            res.status(200).send({});
    })
})

router.patch('/:id', (req, res) => {
    Client.findById(req.params.id, (err, cl) => {
        if (err)
            res.status(500).send(err);
        else if (!cl)
            res.status(404).send({});
        else {
            cl.name = req.body.name;
            cl.cpf = req.body.cpf;
            cl.phone = req.body.phone;
            cl.address = req.body.address;
            cl.save((err, cl)=>{
                if (err)
                    res.status(500).send(err);                
                else
                    res.status(200).send(cl);
            })
        }
    })
})


module.exports = router;
