// first thing we always do is use window.onload
window.onload = () => {
  console.log("page has loaded");

  for (let i = 0; i < 50; i++) {
    // creating the new span
    let newSpan = document.createElement("span");
    // adding class to the new span
    newSpan.classList.add("text-body");
    // adding text
    newSpan.innerHTML = "this is a new span";
    // appendChild adds the new element to the page
    // document refers to the body / entire document of the html
    document.body.appendChild(newSpan);
  }

  // this is how we refer to the current time incl seconds
  //   date.toLocaleTimeString();
  let oneSpan = document.getElementsByClassName("text-body");

  // setInterval()
  // 1 param: function/action to be done
  // 2 param: how much time in ms
  setInterval(() => {
    // this is how we get the date for right this moment
    let date = new Date();
    oneSpan[0].innerHTML = date.toLocaleTimeString();
    console.log("happens");
  }, 1000);
};
