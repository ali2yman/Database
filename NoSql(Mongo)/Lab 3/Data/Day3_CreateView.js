//db.department.find({})
//
//db.emp.find({})

db.department_emp_view.find({})

db.createView("department_emp_view", "department", [
    {
        $lookup: {
            from: "emp",
            localField: "_id",
            foreignField: "dep_id",
            as: "employees"
        }
    },
    {
        $project: {
            _id: 1,
            name: 1,
            code: 1,
            employees: {
                $map: {
                    input: "$employees",
                    as: "employee",
                    in: {
                        _id: "$$employee._id",
                        name: "$$employee.name"
                    }
                }
            }
        }
    }
])
