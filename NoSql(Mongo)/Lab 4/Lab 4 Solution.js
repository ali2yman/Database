//1.Create new 
//a.Database named Demo
//b.collections named trainningCenter1 , trainningCenter2 

use Demo

db.createCollection("trainningCenter1")
db.createCollection("trainningCenter2")



//2.Insert documents into trainningCenter1 collection contains _id , name as firstName lastName ,
// age , address as array , status Using Variable (Array Data) and insert ONE
var ArrayData = [{
  _id: 1,
  fname: "ali" ,
  lname:"ayman",
  age: 22,
  address: ["Tanta","Gharbia","Egypt"],
  status: "goodd"
},
{
    _id: 2,
   fname: "nada" ,
  lname:"anwar", 
  age: 22,
  address: ["smanoud","Gharbia","Egypt"],
  status: "bad"
},
{
_id: 3,
    fname: "omar" ,
  lname:"ahmed",
  age: 32,
  address: ["madinaty","cairo","Egypt"],
  status: "Excellent"
}
]
// when i used insertone it took all data too but puted them in a dictionary with one id
db.trainningCenter1.insertOne(ArrayData)



//3.Insert documents into trainningCenter2 collection 
//Using Same Variable (Array Data) with same data and insert MANY
db.trainningCenter2.insertMany(ArrayData)
// when i used this it insert all objects each one with it's id sepreatly 



//4.Use find. explain function (find by age field) and mention scanning type
// it is with  >> "stage" : "COLLSCAN",
db.trainningCenter2.find({ age: 22 }).explain()




//5.Create index on created collection named it “IX_age” on age field 
db.trainningCenter2.createIndex({ age: 1 }, { name: "IX_age" });
// 1 for an ascending index on the 'age' field and name it 'IX_age'




//6.Use find. explain view winning plan for index created (find by age field) 
//and mention scanning type
db.trainningCenter2.find({ age: 22 }).explain()
//                "stage" : "IXSCAN",




//7.Create index on created collection named it “compound” on firstNsme and lastName
//a.Try find().explain before create index and mention scanning type
//b.Try find().explain after create index and mention scanning type
db.trainningCenter2.find({fname:"Ali",lname:"Ayman"}).explain()
//            "stage" : "COLLSCAN",
db.trainningCenter2.createIndex({ fname: 1, lname: 1 }, { name: "compound" });

db.trainningCenter2.find({fname:"Ali",lname:"Ayman"}).explain()
//                "stage" : "IXSCAN",



//8.Try to delete from your collection where _id = 5 [insert it if not exists]
db.trainningCenter2.insertOne({
    _id: 5,
    fname: "abdo",
    lname: "ali",
    age: 25,
    address: ["Mansoura","Egypt"],
    status: "Active"
  })
  
db.trainningCenter2.deleteOne({ _id: 5 })



//9.Delete all documents from the trainingCenter collection.
db.trainningCenter2.deleteMany({})




//10.Drop the database and confirm its removal. Which command do you use to ensure the deletion?
db.dropDatabase()
//to ensure
show databases






