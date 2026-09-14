const EventEmitter = require("events");

// Create a custom EventEmitter
const myEmitter = new EventEmitter();

// PART 1: Custom Events - greet and exit

// Create greet event
myEmitter.on("greet", (name) => {
    console.log(`Hello, ${name}!`);
});

// Create exit event
myEmitter.on("exit", () => {
    console.log("Exit event triggered.");
});

// Trigger the events
myEmitter.emit("greet", "Muskan");
myEmitter.emit("exit");

// PART 2: DOM-like Event Handling

const button = new EventEmitter();

// Simulate a click event
button.on("click", () => {
    console.log("Button clicked!");
});

// Simulate a mouseover event
button.on("mouseover", () => {
    console.log("Mouse over button!");
});

// Trigger/run the events
button.emit("click");
button.emit("mouseover");

// PART 3: Node.js Event Loop

console.log("Start");

setTimeout(() => {
    console.log("setTimeout executed");
}, 0);

setImmediate(() => {
    console.log("setImmediate executed");
});

process.nextTick(() => {
    console.log("process.nextTick executed");
});

console.log("End");