//2. simulate DOM like event handling in node.js using 
// Button: click and mouse over events
const EventEmitter = require("events");
class Button extends EventEmitter{
    click(){
        console.log("call button click event");
        this.emit("click");
    }
    mouseover(){
        console.log("call button mouseover event");
        this.emit("mouseover");
    }
}
const button = new Button();
button.on("click",()=>{
    console.log("click event trigggered");
});
button.on("mouseover",()=>{
    console.log("mouse event trigggered");
});

button.click();
button.mouseover();


