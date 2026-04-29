window.onload = () => {
	// use instance mode instead
	// creating and storing sketch function inside of a variable
	const s = (sketch) => {
		let x = 10;

		sketch.setup = () => {
			sketch.createCanvas(500, 500);
		};

		sketch.draw = () => {
			sketch.background('lightgreen');
			sketch.fill('yellow');
			// noStroke();
			sketch.noStroke();
			sketch.rect(x, sketch.height / 2, 10);
		};
	};
	// using the s variable inside of the params of new p5()
	let mySketch1 = new p5(s, 'sketch1');

	// not declaring a variable, just putting the entire sketch in anonymous function in params
	let mySketch2 = new p5((sketch) => {
		sketch.setup = () => {
			sketch.createCanvas(300, 300);
			sketch.background(0, 200, 200, 100);
		};
	}, 'sketch2');
};
// function setup() {
// 	createCanvas(400, 400);
// }

// function draw() {
// 	background('lightgreen');
// }
