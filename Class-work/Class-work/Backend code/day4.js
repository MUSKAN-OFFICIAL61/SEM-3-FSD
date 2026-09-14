//Create one promise that will display user name and password
// using resolve and if data will be rejected its display error
// new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//         let err=true;
//         if(err){
//             resolve("user:Cse-21,password:123");
//             }else{
//                 reject("ERROR...:data fail");
//             }
//     },2000)
// }).then((result)=>{
//     console.log(result);
// }).catch((error)=>{
//     console.log(error)
// })



// async/await
async function test() {
    console.log("1");
    await console.log("2");
    console.log("3");
    console.log("4");
}
test();
console.log("5");