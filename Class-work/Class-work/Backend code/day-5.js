// Understand the concept of fetch in console
async function test(){
    console.log("this is asynchronous function and we want use fetch()in console ");
    const response = await fetch("./student.json");

    console.log(response.status);
    const stud = await response.json();
    return stud;
    console.log("finally data fetched");
}
test().then((response)=>{
    console.log(response);
}).catch((err)=>{
    console.log(err);
})