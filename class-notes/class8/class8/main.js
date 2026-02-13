// global variable -- variable that when the page loads starts at this value
let angle = 0;

// Q: what is the first function we always run in our javascript files? add it below this comment.
window.onload = () => {
  // Q: inside the function, get the element with the id of "rotate" and store it in a variable.
  let rot = document.getElementById("rotate");

  setInterval(() => {
    // every second it needs to change
    angle++;
    console.log(angle);
    rot.style.transform = `rotate(${angle}deg)`;
    // using ``(backtick) to inject a variable with the ${} syntax
    // "rotate(" + angle + "deg)"
  }, 1000);

  // adding my first event to the webpage body
  // two params inside eventListener
  // 1. name of the event we are using
  // 2. callback / anonymous function
  document.body.addEventListener("click", () => {
    console.log("webpage was clicked");
  });

  let btn = document.getElementById("button");
  btn.addEventListener("click", () => {
    // btn.style.backgroundColor = "skyblue";
    // if (btn.classList.contains("clicked")) {
    //   btn.classList.remove("clicked");
    // } else {
    //   btn.classList.add("clicked");
    // }
    // toggle is shortand for above if-statement
    btn.classList.toggle("hi");
  });
};

// Q: what function do we use to repeat something over time?
// A: setInterval()
// Q: what parameters does it accept?
// A: 1. function to run, 2. time in ms

// setInterval( ()=>{

// }, 1000)

// setInterval(myTime, 1000)
// function myTime(){

// }
