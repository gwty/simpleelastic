var assert = require('assert');

var elastic = require('../elasticsearch');  

// need to debug this. deleting and recreating index causes the tests to fail (they run before the index is created)

// elastic.indexExists().then(function (exists) {  
//   if (exists) {  
//     return elastic.deleteIndex();
//   }
// }).then(function () {
//   return elastic.initIndex().then(elastic.initMapping).then(function () {
//     //Add a few titles for the autocomplete
//     //elasticsearch offers a bulk functionality as well, but this is for a different time
//     var promises = [
//       'Gowtham',
//       'Ashok',
//       'Smith',
//       'John',
//       'Jane'
//     ].map(function (contact) {
//       return elastic.addContact({
//         name: contact,
//         email: contact + " @gmail.com",
//         metadata: {
//           contactLength: contact.length
//         }
//       });
//     });
//     return Promise.all(promises);
//   });
// }); 



params_0 = {};
params_1 = {"pageSize": 2};
params_2 = {"pageSize": 2, "page":2};
params_3 = {name:"John"};

// params = {"pageSize": 10,"page":req.query.page,"query":req.query.query,"name":req.params.name};

describe('GetContact variations', async () => {
  describe('Display all contacts', async () => {
    it('should return all created contacts',  async () =>  {
            
    const response = await elastic.getContacts(params_0).then( (result) => {
        return result;
    });
    var expected_response = [{"name":"John","email":"John @gmail.com"},{"name":"Smith","email":"Smith @gmail.com"},{"name":"Jane","email":"Jane @gmail.com"},{"name":"Gowtham","email":"Gowtham @gmail.com"},{"name":"Ashok","email":"Ashok @gmail.com"}]  ;
    
    expected_response = JSON.stringify(expected_response);
    assert.equal(response, expected_response);

    });
  });
  
  describe('Display 2 contacts in a page', async () => {
    it('should return 2 created contacts',  async () =>  {
            
    const response = await elastic.getContacts(params_1).then( (result) => {
        return result;
    });
    var expected_response = [{"name":"John","email":"John @gmail.com"},{"name":"Smith","email":"Smith @gmail.com"}];
    expected_response = JSON.stringify(expected_response);
    
    assert.equal(response, expected_response);

    });
  });
  

  describe('Display 2 contacts in 2nd page', async () => {
    it('should return 2 created contacts in 2nd page',  async () =>  {
            
    const response = await elastic.getContacts(params_2).then( (result) => {
        return result;
    });
    var expected_response = [{"name":"Jane","email":"Jane @gmail.com"},{"name":"Gowtham","email":"Gowtham @gmail.com"}]
;
    expected_response = JSON.stringify(expected_response);
    
    assert.equal(response, expected_response);

    });
  });
  
  describe('Display contact John', async () => {
    it('should return details of John',  async () =>  {
            
    const response = await elastic.getContacts(params_3).then( (result) => {
        return result;
    });
    var expected_response = [{"name":"John","email":"John @gmail.com"}];
    expected_response = JSON.stringify(expected_response);
    assert.equal(response, expected_response);

    });
  });  
  
});

// var params_4 = {name:"Cow", email:"cow@gow.com", phone_number:"12345678"};
// var params_5 = {name:"Cow"};
// 
// describe('AddContact', async () => {
//   describe('Add contact Mr.Cow', async () => {
//     it('should successfully add cow',  async () =>  {
//             
//     const response = await elastic.addContact(params_4).then( (result) => {
//         return result;
//     });
//     var expected_response = [{"name":"Cow","email":"cow@gow.com","phone_number":"12345678"}];
//     
//     expected_response = JSON.stringify(expected_response);
//     assert.equal(response, expected_response);
// 
//     });
//   });
//   
//   describe('Display cow', async () => {
//     it('should return Cow',  async () =>  {
//             
//     const response = await elastic.getContacts(params_5).then( (result) => {
//         return result;
//     });
//     var expected_response = [{"name":"Cow","email":"cow@gow.com","phone_number":"12345678"}];
//     expected_response = JSON.stringify(expected_response);
//     
//     assert.equal(response, expected_response);
// 
//     });
//   });
//   
//   
// });


// var params_6 = {name:"Cow", email:"cow@gow.com", phone_number:"123456789"};
// var params_7 = {name:"Cow"};
// 
// describe('UpdateContact', async () => {
//   describe('Update contact Mr.Cow', async () => {
//     it('should successfully add cow',  async () =>  {
//             
//     const response = await elastic.updateContact(params_6).then( (result) => {
//         return result;
//     });
//     var expected_response = [{"name":"Cow","email":"cow@gow.com","phone_number":"123456789"}];
//     
//     expected_response = JSON.stringify(expected_response);
//     assert.equal(response, expected_response);
// 
//     });
//   });
//   
//   describe('Display cow', async () => {
//     it('should return updated Cow',  async () =>  {
//             
//     const response = await elastic.getContacts(params_7).then( (result) => {
//         return result;
//     });
//     var expected_response = [{"name":"Cow","email":"cow@gow.com","phone_number":"123456789"}];
//     expected_response = JSON.stringify(expected_response);
//     
//     assert.equal(response, expected_response);
// 
//     });
//   });
//   
//   
// });

// var params_8 = "Cow";
// var params_9 = {name:"Cow"};
// 
// describe('DeleteContact', async () => {
//   describe('Deleted contact Mr.Cow', async () => {
//     it('should successfully add cow',  async () =>  {
//             
//     const response = await elastic.updateContact(params_8).then( (result) => {
//         return result;
//     });
//     var expected_response = [{"name":"Cow","email":"cow@gow.com","phone_number":"123456789"}];
//     
//     expected_response = JSON.stringify(expected_response);
//     assert.equal(response, expected_response);
// 
//     });
//   });
//   
//   describe('Try to display deleted cow', async () => {
//     it('should return nothing',  async () =>  {
//             
//     const response = await elastic.getContacts(params_9).then( (result) => {
//         return result;
//     });
//     var expected_response = [];
//     expected_response = JSON.stringify(expected_response);
//     
//     assert.equal(response, expected_response);
// 
//     });
//   });
//   
//   
// });