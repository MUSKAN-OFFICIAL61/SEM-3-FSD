//Synchronous and asynchronous programming 
// console.log("javaScript");
// function hello(){
//     console.log("hello world");
// }
// hello();
// console.log("this is synchronus programming");


// Asynchronous programming : code executed line by line,

// const hello = ()=>{
//     setTimeout(()=>{
//         console.log("hello world!");
//     },2000);
// }
// console.log("this is Asu=ynchronous programming");
// hello();


// callback,promise,async/await
// function add(n1,n2,callback1,callback){
//     console.log(n1+n2);
//     callback1();
//     callback();
// }
// let a=10;
// let b=30;
// add(a,b,sayHi,hello);
// function sayHi(){
//     console.log("this is callback function");
// }
// function hello(){
//     console.log("hello world");
// }


// create a function display(callback) that prints "welcome to abes", then call callback which prints learning "FSD in CSE-21"

// function display(callback){
//     console.log("welcome to abes");
//     callback();
// }
// function print(){
//     console.log("FSD learning in CSE-25");
// }
// display(print);