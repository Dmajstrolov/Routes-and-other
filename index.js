const express = require("express");
const app = express();
const fs = require("fs");



app.use(express.urlencoded({
    extended:false
}));

app.get("/",(req,res)=>{
    fs.readFile(__dirname + "/data.json", (error,data)=>{
        
        let arr = JSON.parse(data.toString());

        let html = arr.map((item)=>{
            return `
            <h2>${item.task}</h2>
            <h4>${item.description}</h4>
            <hr>
            `;
        });
        
        res.send(html.join(""));
        
    });
});
app.get("/create",(req,res)=>{
    res.sendFile(__dirname + "/form.html");
   
    
});
app.post("/store",(req,res)=>{
    let task = req.body.task;
    let description = req.body.description;

    let object = {task:task,description:description, id:Date.now()};
    fs.readFile(__dirname + "/data.json",(error,data)=>{
       let arr = JSON.parse(data.toString());
        arr.push(object);
        fs.writeFile(__dirname + "/data.json",JSON.stringify(arr,null,2), (error)=>{
            console.log(error);
        });
    });

    res.redirect("/create");
    
    
});
app.get("/delete/:id",(req,res)=>{
    
    let taskId = req.params.id;

    fs.readFile(__dirname + "/data.json", (error,data)=>{
        let arr = JSON.parse(data.toString());
        
        let newArr = arr.filter((item)=>{
           
            if(item.id != req.params.id)
            {
                return item;
            }
            
        });
        console.log(newArr);
        fs.writeFile(__dirname + "/data.json",JSON.stringify(newArr,null,2), (error)=>{
            console.log(error);
        });
              
    });

    res.redirect("/create");
       
});








app.listen(3777,()=>{

    console.log("Port 3777");

});