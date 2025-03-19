//----------employees Collection
//1.employess Total Salary for "Sales" Department 
use AI

db.employees.find({})

//Match :filter Dep : Sales
//Group : Sum Salary
db.employees.aggregate([
{$match:{department:"Sales"}}
,{$group:{
    _id:"$department",
    totoalSal:{$sum:"$salary"}
}}
])


//2.Avg Salaries for "each Department" "sorted Desc"
//Group
//Sort
db.employees.aggregate([{
    $group:{
        _id:"$department",
        avg:{$avg:"$salary"}
    }
},
{
        $sort:{avg:-1}
}])

//$group : _id (Object) =>department name , Date
db.employees.aggregate([{
    $group:{

    _id:{dep:"$department",date:"$hireDate"},
        avg:{$avg:"$salary"}
    }
},
{
        $sort:{avg:-1}
}])
//----------------------------orders collection
db.orders.find({})
//3.total quantity Pizza order for "medium" Pizza grouped by name with "asc order" 
//match medium
//group : sum
//sort qty
db.orders.aggregate([
{$match:{size:"medium"}},
{$group:{_id:"$name", Total:{$sum:"$quantity"}}},
{$sort:{Total:1}}])



//Here
//4.Calculate Avg Pizza order for "medium" within dates 
//From 2020 to 2022
//grouped dy "date" ,"Sorted by Date Desc" 
// and insert result to new Collection 
db.orders.find({})

db.orders.aggregate([
  // Stage 1: Match orders for "medium" pizzas within the date range
  {
    $match: {
      size: "medium",
      date: { $gte: ISODate("2020-01-01"), $lte: ISODate("2022-12-31") }
    }
  },
  // Stage 2: Group by date and calculate the average quantity
  {
    $group: {
      _id: "$date", // Group by the date field
      avgQuantity: { $avg: "$quantity" } // Calculate average quantity
    }
  },
  // Stage 3: Sort by date in descending order
  {
    $sort: { _id: -1 }
  },
  // Stage 4: Output the results to a new collection
  {
    $out: "medium_pizza_avg_orders"
  }
]);


db.medium_pizza_avg_orders.find({})

//-- Based on final Avg > 20

//match : size , date
//group :{_id :date , avg: quantity}
//match on Group = Having
// sort
// out

//--------------- products Collection
db.products.find({})

//5. Total Sales Amount Per Product:
//Query: Calculate the total sales amount for each product.
// Total Sales = Sum of quantity * price
db.products.aggregate([
  // Stage 1: Add a computed field for "salesAmount" (quantity * price)
  {
    $addFields: {
      salesAmount: { $multiply: ["$quantity", "$price"] }
    }
  },
  // Stage 2: Group by product name (or product ID) to sum the salesAmount
  {
    $group: {
      _id: "$product", // Group by product name (or change to "$productId" if needed)
      totalSales: { $sum: "$salesAmount" } ,// Sum the computed sales amount //Using the computed
      total:{ $sum:{$multiply: ["$quantity", "$price"] }} //or this
    }
  }
])

db.products.find({})

//6. Yearly Sales Trends:
//Query: Get the "Laptop" total sales amount for "each year"
// over a given time period from 2020 to 2024
db.products.aggregate([
  // Stage 1: Match only "Laptop" sales within the specified date range
  {
    $match: {
      product: "Laptop",
      date: {
        $gte: ISODate("2020-01-01"),
        $lte: ISODate("2024-12-31")
      }
    }
  },
  // Stage 2: Add a computed field for "salesAmount" (quantity * price)
 // {
    //$addFields: {
     // salesAmount: { $multiply: ["$quantity", "$price"] }
   // }
 // },
  // Stage 3: Group by year and calculate the total sales amount
  {
    $group: {
      _id: { $year: "$date" }, // Extract year from saleDate
     // totalSales: { $sum: "$salesAmount" } ,// Sum the computed sales amount
       totalSales: { $sum: { $multiply: ["$quantity", "$price"] }} // Or
    }
  },
  // Stage 4: Sort the results by year in ascending order
  {
    $sort: { _id: 1 }
  }
])

db.products.find({})

//7. Top 1 Customer by Total Spending:
//Query: Find the top 1 customers who spent the most.
db.orders.aggregate([
  // Stage 1: Group by customer to calculate their total spending
  {
    $group: {
      _id: "$_id", // Group by customer ID
      totalSpent: { $sum: { $multiply: ["$quantity", "$price"] } } 
    }
  },
  // Stage 2: Sort by total spending in descending order
  {
    $sort: { totalSpent: -1 }
  },
  // Stage 3: Limit to the top 1 customer
  {
    $limit: 1
  }
])

db.likes.find({})

//---------likes Collection
//8.total likes foreach title
db.likes.aggregate([
  // Stage 1: Group by title and calculate total likes
  {
    $group: {
      _id: "$title", // Group by the "title" field
      totalLikes: { $sum: "$likes" } // Sum up the "likes" field
    }
  },
  // Stage 2: Sort by total likes (optional, for readability)
  {
    $sort: { totalLikes: -1 } // Sort in descending order of total likes
  }
])

//9. Avg likes foreach title 
db.likes.aggregate([
  // Stage 1: Group by title and calculate total likes
  {
    $group: {
      _id: "$title", // Group by the "title" field
      avgLikes: { $avg: "$likes" } // Avg up the "likes" field
    }
  },
  // Stage 2: Sort by total likes (optional, for readability)
  {
    $sort: { avgLikes: -1 } // Sort in descending order of total likes
  }
])
