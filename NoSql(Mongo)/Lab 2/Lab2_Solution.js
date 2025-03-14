
// Using inventory collection 
db.inventory.find({})


//1.Provide the MongoDB code for enforcing JSON schema validation when creating a collection 
//named "employees" with required fields "name," "age" (min. 18),
// and "department" (limited to ["HR," "Engineering," "Finance"]).
db.createCollection("employees" , 
    { validator : {
        $jsonSchema : {
            bsonType : "object",
            required : ["name","age","department"],
            properties : {
                name : {
                    bsonType : "string",
                    description : "name is required and must be string"
                },
                age : {
                    bsonType : "int",
                    minimum : 18,
                    description : "age is required and must be integer"                 
                },
                department : {
                    bsonType : "string",
                    enum : ["HR", "Engineering", "Finance"],
                    description : "department is required and must be string"
                }
            }
                
        }
    }
        
  }
 ) 
  
  
//  2.Find documents where the "tags" field exists.
db.inventory.find({tags:{$exists:true}})


//3.Find documents where the "status" field has a value in [A, B] using both the
// `$in` , `$or` operators.
db.inventory.find({status : {$in:["A","B"]}})

db.inventory.find({$or : [{status:"A"},{status:"B"}]})



//4.Find documents where the "tags" field does not contain values "ssl" or "security."
db.inventory.find({tags : {$nin:["ssl","security"]}})


//5.Find documents where the "qty" field is equal to 85.
db.inventory.find({qty : 85})


//6.Find documents where the "tags" array contains all of the values [ssl, security]
// using the `$all` operator.
db.inventory.find({tags : {$all:["ssl","security"]}})


//7.Find documents where the "tags" array has a size of 3.
db.inventory.find({tags : {$size:3}})


//8.Find documents where the "tags" field is of type array.
db.inventory.find({tags : {$type:"array"}})


//9.Update the "item" field in the "paper" document, setting "size.uom" to "meter" and using the `$currentDate` operator.
//a.Also, use the upsert option and change filter condition item:”paper”.
//b.Use the `$setOnInsert` operator.
//c.Try `updateOne`, `updateMany`, and `replaceOne`.

//9.Update the "item" field in the "paper" document, setting "size.uom" to "meter" and using the `$currentDate` operator.
db.inventory.updateMany(
  { item: "paper" },
  {
    $set: { "size.uom": "meter" },   // if it doesn't exist >> will make it 
    $currentDate: { lastModified: true }     // if it doesn't exist >> will make it 
  }
);


//a.Also, use the upsert option and change filter condition item:”paper”.
db.inventory.find({item:"iphone"})    // i tried this and there is no document appear because it doesn't match the filter 
//by appling a and making upsert = true >> if the item doesn't exisit it will make a new document 
db.inventory.updateMany({item:"iphone"},
          { $set : { "size.uom": "meter"} ,
            $currentDate : { lastModified: true }},
            {upsert:true}
)

//b.Use the `$setOnInsert` operator.  >>> what i made in this param will be done >>> only when the object doesn't exist it will create it and apply what in setOnInsert
db.inventory.updateMany({item:"mac"},
          { $set : { "size.uom": "meter"} ,
            $currentDate : { lastModified: true },
            $setOnInsert : {message : "Hello from insert"}
            },
            {upsert:true}
)


//c.Try `updateOne`, `updateMany`, and `replaceOne`.
// 1- by using updateOne >>> it will update only the first document matches the condition 
//                               If no document is found, inserts a new document.
db.inventory.updateOne({item:"mac"},
          { $set : { "size.uom": "kilo"} ,
            $currentDate : { lastModified: true },
            $setOnInsert : {message : "Hello from mac"}
            },
            {upsert:true}
)


//2 - using UpdateMany  >>> Updates all matching documents.
                           //If no documents are found, inserts a new document.
db.inventory.updateMany({item:"paper"},
          { $set : { "size.uom": "kilo"} ,
            $currentDate : { lastModified: true },
            $setOnInsert : {message : "Hello from mac"}
            },
            {upsert:true}
)


// 3 - replaceOne:   >>>   Replaces the entire document.
//                    >>>   If no matching document is found, inserts a new one.
// we removed the $  >> ,because replaceOne doesn't take >> atomic operatores
db.inventory.replaceOne({item:"iphone"},
                {
                  item: "iphone", // This is part of the replacement document, and it will overwrite the existing value.
                  size: { uom: "kiloooooo(m)" },
                  lastModified: new Date(), // New value for lastModified field
                },
            {upsert:true}
)




//10.Insert a document with incorrect field names "neme" and "ege," then rename them to "name" and "age."
db.inventory.insertOne({
    neme:"ali",
    age : "22"
})

db.inventory.updateOne({ neme:"ali"},
        {$rename : {neme : "name" , age : "agee"}}
)


//11 -Try to reset any document field using the `$unset` function.
db.inventory.updateOne({ name:"ali"},
        {$unset : { agee : ""}}
)


//11.Try update operators like `$inc`, `$min`, `$max`, and `$mul` to modify document fields.
db.inventory.insertOne({
  "_id": 99,
  "name": "Nada",
  "age": 30,
  "score": 100
}
)
// $inc
db.inventory.updateOne({name : "Nada"},
        {$inc : {age:1,score:20}}
)
//$min  >>> hna bya5od el minimum value bayn el value ely ana hattha we the old value 
db.inventory.updateOne({name : "Nada"},
        {$min : {age:25,score:150}}
)
//$max  >>> hna bya5od el maximum value bayn el value ely ana hattha we the old value 
db.inventory.updateOne({name : "Nada"},
        {$max : {age:24,score:150}}
)
//$mul >>> it multiply the old value >> with the value u will give it to the param
db.inventory.updateOne({name : "Nada"},
        {$mul : {age:2,score:3}}
)


db.inventory.find({name:"Nada"})



 





