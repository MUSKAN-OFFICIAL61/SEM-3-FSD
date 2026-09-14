const fs = require("fs");

//create
fs.writeFile("student.txt" , "Name : Rahul \n Roll No: 101");
console.log("File created successfully");

// Read - Read the file
let data = fs.readFile("student.txt","utf8");

console.log("\nFile Content: ");
console.log(data);

//Update - Add new data to the file
fs.appendFile("student.txt","\n Course : B.Tech CSE");