var mainGameScreen (function() {

	// set of entities being updated and rendered
	var entities = [];
	// how many enemy ships want to start with
	var numOfEnemyShips = 12;

	// initialize the screen, expected to be called
	// once transition to the screen
	function start() {
		for (var i = 0; i < numOfEnemyShips; i++) {
			entities.push(makeEnemyShip(i * 10, i));
		}
	}

	function draw(ctx) {

		ctx.fillStyle = 'black';
		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

		// delegate drawing of entitye to itself
		var entityIndex = entities.length - 1;

		for ( ; entityIndex != 0; entityIndex--) {
			entities[entityIndex].draw(ctx);		
		}
	}

	function update(elapsed) {
		var entityIndex = entities.length - 1;
		for ( ; entityIndex != 0; entityIndex--) {
			entities[entityIndex].update(elapsed);
		}
	}

	return {
		draw: draw,
		update: update,
		start: start
	};
})