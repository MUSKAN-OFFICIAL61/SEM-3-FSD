// function add (num1 ,num2){
//     return num1+num2;
// }
// add(2,1);

// function mul(num1,num2){
//     console.log(num1*num2);
// }
// mul(2,6)

// const add=() => {
//     console.log("arrow function")
// }
// add();
// const add = (num1,num2) => {
//     return num1 + num2;

// }
// console.log (add(2,1));

function addNum(){
    console.log(arguments);
}
addNum(1,2,3,4,5);