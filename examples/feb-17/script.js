// p5.js
// function mousePressed(){

// }

// parameters:
// 1st: type of event, with "load" we are populating the document variable
// 2nd: callback function, action to happen when the event is fired
// window.addEventListener("load", ()=>{})

// shorthand
window.onload = () => {
  // document.body gets the entire webpage
  // 1st: type of event, with "click" getting the mouse click
  // 2nd: callback function, action to happen when the event is fired
  document.body.addEventListener("click", mousePressed);

  document.body.addEventListener("click", () => {
    console.log("anonymous callback");
  });
};

function mousePressed() {
  console.log("document has been clicked");
}
