// these show up immediately and have no issues because they aren't manipulating anything on our webpage
alert("hello welcome to my webpage");
console.log("this is a console message");

window.onload = () => {
  console.log("the webpage has now fully loaded");

  //   grab a single ID really easily
  document.getElementById("main").innerHTML =
    "<span>update</span> after loading";
  //   document.getElementById("main").textContent = "updated a second time";
  //  getting my html element and adjusting the style property
  // the property that comes after is the css property, instead of - we use camel case
  //   document.getElementById("main").style.backgroundColor = "pink";

  // using a variable to store the document.getElementById because writing that continuously is cumbersome
  let mainContent = document.getElementById("main");
  mainContent.style.color = "#b6c4a2";

  // apply an existing (or non-existing) class to my element
  // any styles applied via js have ultimate priority
  mainContent.classList.add("blue");

  let container = document.getElementById("container");
  // when we add elements with js
  // 3 steps:
  // 1. creating the type of element and storing in a variable
  // the .createElement function takes in the tag name of the element you want to create
  let item = document.createElement("span");
  // 2. modify the content of the new element
  item.textContent = "this has been created with javascript";
  // 3. add the created element to the page via the element it will be added to
  container.appendChild(item);

  // we can retrieve classes as well...
  let blues = document.getElementsByClassName("blue");
  console.log(blues);
  // but this gets multiple elements and we need to index into the specific element in the array to change it
  blues[0].style.color = "#dce2bd";

  // we can also manipulate multiple elements via the class using a loop
  for (let b of blues) {
    b.style.color = "#8e9b90";
  }
};
