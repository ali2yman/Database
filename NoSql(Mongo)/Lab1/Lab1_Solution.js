use Lab1DB

// 1.Create a Collection named "Staff".
db.createCollection("Staff")

// 2.Insert one document into the "Staff" collection: {_id, name, age, gender, department}.
db.Staff.insertOne({"_id":1,"name":"Ali","gender":"male","department":"AI"})

// 3.Insert many documents into the "Staff" collection:
    //Object: {_id, name, age: 20, gender: "male", department}
    //Object: {_id, name, age: 25, gender: "female", managerName, department}
    //Object: {_id, name, age: 15, gender, DOB}
db.Staff.insertMany([{"_id":2, "name":"ayman", "age": 20, "gender": "male", "department":"DS"},
    {"_id":3, "name":"aya", "age": 25, "gender": "female", "managerName": "ahmed","department":"DS"} ,
    {"_id":4, "name":"nada", "age": 15, "gender": "female", "DOB": "20/2/2002"} ])
    
    
//4.Query to find data from the "Staff" collection:
//1) Find all documents.
db.Staff.find({})
//2) Find documents where gender is "male".
db.Staff.find({"gender":"male"})
//3) Find documents with age between 20 and 25.
db.Staff.find({"age":{"$gte":20,"$lte":25}})
//4) Find documents where age is 25 and gender is "female".
db.Staff.find({"gender":"female","age":25})
//5) Find documents where age is 20 or gender is "female".    
db.Staff.find({$or:[{"gender":"female"},{"age":20}]})

    
//5.Update one document in the "Staff" collection where age is 15, set the name to "new student".
db.Staff.updateOne({"age":15},{$set:{"name":"salwa"}})  

//6.Update many documents in the "Staff" collection, setting the department to "AI".
db.Staff.updateMany({},{$set:{"department":"AI"}})

//7.Create a new collection called "test" and insert documents from Question 3.
db.test.insertMany([{"_id":2, "name":"ayman", "age": 20, "gender": "male", "department":"DS"},
    {"_id":3, "name":"aya", "age": 25, "gender": "female", "managerName": "ahmed","department":"DS"} ,
    {"_id":4, "name":"nada", "age": 15, "gender": "female", "DOB": "20/2/2002"} ])

//8.Try to delete one document from the "test" collection where age is 15.
db.test.deleteOne({"age":15})

//9. try to delete all male gender
db.test.deleteMany({"gender":"male"})

//10.Try to delete all documents in the "test" collection.
db.test.deleteMany({})





    
    
    
    