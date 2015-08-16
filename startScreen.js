var startScreen = (function(input) {
  
  // red component of rgb
  var hue = 0;

  // direction towards red or black
  var direction = 1;
  var transitioning = false;

  // record last input state from last frame to compare
  // to current
  var wasButtonDown = false;

  // helper function to draw text into the
  // center of the canvas with respect to x coord
  function centerText(ctx, text, y) {
  	var measurement = ctx.measureText(text);
  	var x = (ctx.canvas.width - measurement.width) / 2;
  	ctx.fillText(text, x, y);
  }

  // draw main menu to canvas
  function draw(ctx, elapsed) {

  	// draw text in middle of canvas.
  	// inefficient, take out later
  	var y = ctx.canvas.height / 2;

  	// css color from 'hue'
  	var color = 'rgb(' + hue + ',0,0)';

  	// clear entire canvas, not really necessary
  	ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);

  	// draw title of game, static
  	ctx.fillStyle = 'white';
  	ctx.font = '48px monospace';
  	centerText(ctx, 'My Awesome Game', y);

  	// draw instructions to player
  	ctx.fillStyle = color;
  	ctx.font = '24px monospace';
  	centerText(ctx, 'click to begin', y + 30);
  }

  var rate = 0.128; // R/ms

  // update color & check for input from user
  function update(elapsed) {
  	var amount = rate * elapsed;
  	// want hue to oscillate betw 0 & 255
  	hue += 1 * direction;
  	if (hue > 255) {
  		direction = -1;
  	} else if (hue < 0) {
  		direction = 1;
  	}

  	rounted_hue = Math.round(hue);

  	// magically capturing state of game &
  	// not dealing with events inside game loop
  	// will come back to it later(?)
  	var isButtonDown = input.isButtonDown();

  	// want to know if input (mouse click) just happened
  	// want to transition from menu to game if there was
  	// input from last frame but none on current one.
  	var mouseJustClicked = !isButtonDown && wasButtonDown;

  	// want to check value of transition so transition logic
  	// won't be inititated more than once (ex. player clicking mouse
  	// mouse repeatedly)
	if (mouseJustClicked && !transitioning) {
		transitioning = true;
		// do something here to transition game
	}

	// record state of input for use in the next frame
	wasButtonDown = isButtonDown;

	// this is the obj that will be 'startScreen'
	return {
		draw: draw,
		update: update
	};
  }
}());