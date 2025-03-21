use Demo

//find filed has No Index explain ::
db.employee.find({age:15}).explain()

db.employee.find({fName:"eman"}).explain()

//Creaye Index ::
db.employee.createIndex({age:1})

//Find explain Created Index ::
db.employee.find({age:15}).explain()

//getIndexes
db.employee.getIndexes()

//dropIndex
db.employee.dropIndex("age_1")

//Index more than One field
//Find before ::
db.employee.find({fName:"noha",lName:"mohamed"}).explain()

//Create Compound Index ::
db.employee.createIndex({fName:1,lName:-1},{name:"IX_Name"})

//Find explain One Field ::
db.employee.find({fName:"noha"}).explain()

//Find explain Other Field ::
db.employee.find({lName:"mohamed"}).explain()

//Delete :: One
db.employee.deleteOne({fName:"eman"})

//Delete :: All
db.employee.deleteMany({})

//Different
db.employee.deleteOne({fName:"eman"})
db.employee.findOneAndDelete({fName:"eman"})


show collections

db.employee.drop()

show dbs

db.dropDatabase()

//Delete vs Drop

db.employee.find({})

var names=[{
    "_id" : 3,
    "fName" : "noha",
    "lName" : "mohamed",
    "age" : 20
},
{
    "_id" : 4,
    "fName" : "malak",
    "lName" : "mohamed",
    "age" : 15
}] 

db.staff.find({})

db.staff.insertMany(names)

db.staff.find({}).forEach(function(name){print ("First Name "+name.fName)})
