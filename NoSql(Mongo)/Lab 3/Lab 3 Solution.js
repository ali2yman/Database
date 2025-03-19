//1.Try Export any Collection and import it into new Collection using Robo 3T 
// do it in lab

//2.Calculate the total revenue for product from sales collection documents within the date range
// '01-01-2020' to '01-01-2023' and then sort them in descending order by total revenue.
//a.Total Revenue=  Sum (Quantity * Price)
db.sales.aggregate([
// applying match 
    {
     $match:{
         date:{
             $gte: new ISODate("2020-01-01T00:00:00Z"),
             $lte: new ISODate("2023-01-01T23:59:59Z")
              }
           }   
        },
    
    {
     $project : {
            product : true,
            Revenue : {$multiply:['$quantity','$price']}
        }
    },
    {
     $group:{
         _id:"$product",
         totalRevenue:{$sum: "$Revenue"}
     }   
    },
    {
        $sort: { totalRevenue: -1 }
    }   
    
    ])
    
//   3.Try Query 2 using Robo 3T using aggregate wizard and insert result
//   into new collection named “newColl” 

  db.createCollection("newColl")
  db.newColl.insertMany([
    {
        "_id": "Widget",
        "totalRevenue": NumberInt(560)
    },
    {
        "_id": "Gadget",
        "totalRevenue": NumberInt(150)
    },
    {
        "_id": "Accessory",
        "totalRevenue": NumberInt(150)
    }
])

db.newColl.find({})


//4.Calculate the average salary for employees for each department from the employee’s collection.

db.employees.aggregate([
    {
        $group: {
            _id: "$department",  
            averageSalary: { $avg: "$salary" }  
        }
    },
    {
        $sort: { averageSalary: -1 }  
    }
])


//5.Use likes Collection to calculate max and min likes per title

db.likes.aggregate([
{
    $group : {
        _id : "$title",
        maxLikes: { $max: "$likes" },  
        minLikes: { $min: "$likes" } 
    }
}
])
 


// 6.Get inventory collection Count , countDocuments
db.inventory.countDocuments()
// it gives me DeprecationWarning
db.inventory.count()
//or 
db.inventory.find().count()
//or i can use aggregation
db.inventory.aggregate([
    {
        $match: { "_id": { $exists: true } }  
    },
    {
        $count: "The count of the documents"  
    }
])


//7.Display 5 documents only from inventory collection
db.inventory.find().limit(5)



//8.Count numbers of large Pizza size from orders collection  [using $count inside aggregate function]
db.orders.aggregate([
    { $match: { size: "large" } },  
    { $count: "Count is " }         
])
