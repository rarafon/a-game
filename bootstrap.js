var canvas,			// the visible canvas element
	surface,		// the 2d context of canvas
	currentScreen;	// current rendered screen

function beginLoop() {
  var frameId = 0;
  var lastFrame = Date.now();

  function loop() {
  	var thisFrame = Date.now();

  	var elapsed = thisFrame - lastFrame;

  	// will be used to halt loop later
  	frameId = window.requestAnimationFrame(loop);

  	// separate elapsed & surface because elapsed is critical to always being run,
  	// but surface can be throttled or skipped at times when calculation heavy

  	currentScreen.update(elapsed); // execute game logic for the frame for elapsed time
  	  // update will take time elapsed and will update state of game
  	currentScreen.draw(surface); // draw out that execution
  	  // will take drawing context from canvas and render the current state of game

  	lastFrame = thisFrame;
  }

  loop();
}

canvas = document.querySelector('canvas#board');
canvas.setAttribute('width', 800);
canvas.setAttribute('height', 600);

surface = canvas.getContext('2d');

currentScreen = startScreen;
beginLoop();