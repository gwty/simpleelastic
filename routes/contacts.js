var express = require('express');
var router = express.Router();

var elastic = require('../elasticsearch');

/* GET Contacts (all) */
router.get('/', function (req, res, next) {

    params = {"pageSize": req.query.pageSize,"page":req.query.page,"query":req.query.query,"name":req.params.name};
    elastic.getContacts(params).then(function (result) {
        return res.send(result);
    });
});

/* GET Contacts (by name) */
router.get('/:name', function (req, res, next) {
    params = {"name":req.params.name};
    elastic.getContacts(params).then(function (result) {
        return res.send(result);
    });
});



/* POST contact to the DB */
router.post('/', function (req, res, next) {

    var name = req.body.name;
    params = {'name':body};
    
// see if contact already exists, if so send error message to client
    elastic.getContacts(params).then(function (result) {
        var unparsed_json = result['hits']['hits'];
        var parsed_json = [];
        for (val in unparsed_json)
            parsed_json.push(unparsed_json[val]['_source']);
        if (parsed_json.size()>0)
            return res.send("Duplicate name");
    });

    if (params.body.phone_number.length > 20 || params.body.phone_number.length < 4)
        return res.send("Invalid phone number");
    
    if (params.body.email.length > 20 || params.body.email.length < 4)
        return res.send("Invalid Email
        
// if not duplicate, then add contact
    elastic.addContact(req.body).then(function (result) {
        res.send("Successfully added contact")
    });
});

/* Update contact to be indexed via PUT */
router.put('/:name', function (req, res, next) {

    var name = req.params.name;
    var params = req.body;
    params['name']=name;

    elastic.updateContact(params).then(function (result) {
        res.json(result)
    });
});

/* Delete contact in DB */
router.delete('/:name', function (req, res, next) {
    var name = req.params.name;
    elastic.deleteContact(name).then(function (result) {
        res.json(result)
    });
});

module.exports = router;
