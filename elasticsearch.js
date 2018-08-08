var elasticsearch = require('elasticsearch');
var indexName = "contacts";

var elasticClient = new elasticsearch.Client({
host: 'localhost:9200',
log: 'info'
});



/**
* Delete an existing index
*/
function deleteIndex() {
    return elasticClient.indices.delete({
index: indexName
    });
}
exports.deleteIndex = deleteIndex;

/**
* create the index
*/
function initIndex() {
    return elasticClient.indices.create({
index: indexName
    });
}
exports.initIndex = initIndex;

/**
* check if the index exists
*/
function indexExists() {
    return elasticClient.indices.exists({
index: indexName
    });
}
exports.indexExists = indexExists;

/**
* reset index
*/
function indexReset() {
    indexExists.then(function (exists) {
        if (exists) {
            return deleteIndex();
        }
    }).then(initIndex);
}
exports.indexReset = indexReset;

/**
* Map the index
*/

function initMapping() {
    return elasticClient.indices.putMapping({
index: indexName,
type: "contact",
body: {
properties: {
name: { type: "text" },
email: { type: "text" },
phone_number: { type: "text" },
            }
        }
    });
}
exports.initMapping = initMapping;

/**
* Add contact
*/

function addContact(contact) {
    return elasticClient.index({
index: indexName,
type: "contact",
body: {
name: contact.name,
email: contact.email,
phone_number: contact.phone_number,
        }
    });
}
exports.addContact = addContact;

/**
* Get contacts (takes parameters)
*/
async function getContacts(params) {
    var pageSize = params['pageSize'] || 1000;
    var page = params['page'] || 1;
    var query = params['query'] || '*';
    if (params['name']) query = "name:" + params['name'];
    
    var response = await elasticClient.search({
index: indexName,
q: query,
size: pageSize,
from: (page - 1) * pageSize
    });

    var unparsed_json = response['hits']['hits'];
    var parsed_json = [];
    for (val in unparsed_json)
        parsed_json.push(unparsed_json[val]['_source']);

    return JSON.stringify(parsed_json);

}
exports.getContacts = getContacts;

/**
* Updates contact where name is given
*/

async function updateContact(contact) {

    return elasticClient.update({
index: indexName,
type: "contact",
body: {
name: contact.name,
email: contact.email,
phone_number: contact.phone_number,
        }
    });
}

exports.updateContact = updateContact;

/**
* Deletes the contact by name
*/

async function deleteContact(name) {

    var response = await client.deleteByQuery({
index: indexName,
q: "name:" + name
    });
    return response;
}

exports.deleteContact = deleteContact;