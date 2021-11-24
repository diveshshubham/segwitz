HOw to run - 
1. Make tables as per the questions
2. Install depencies - npm install express posgres body-parser express-validator --save
3. run index file - node index.js
4. make your localhost db connection


Endpoint:http://localhost:8082/sales
Method : Post
Sample Request Body : 
    {   
        "userName":"Shubham",
        "amount":1123.56,
        "date": "2021-11-2"
    }

res: 
    {
        "message": "sucessfully added with id 1 "
    }


/////////////////////////////////////////

Endpoint:http://localhost:8082/sales?filter=daily
Method : GET


Response: 
 "res":
 {   
     "message":"success",
     "total" : "1123"
 }

 ////////////////////////////////////////

 Endpoint:http://localhost:8082/sales?specific_date=2021-09-24
Method : GET


Response: 
 "res":
  {   
     "message":"success",
     "total" : "1123"
 }

  ////////////////////////////////////////

 Endpoint:http://localhost:8082/sales?filter=weekly
Method : GET


Response: 
 {   
     "message":"success",
 {
    [
        {
            "year": 2021,
            "week": "34",
            "sum": "2021"
        },
        {
            "year": 2021,
            "week": "35",
            "sum": "1124"
        }
    ]
}
}

 ////////////////////////////////////////

 Endpoint:http://localhost:8082/sales?filter=month
Method : GET


Response: 
 {   
     "message":"success",
 {
    [
        {
            "year": 2021,
            "month": "08",
            "sum": "333.21"
        },
        {
            "year": 2021,
            "month": "11",
            "sum": "1124.4"
        }
    ]
}
}