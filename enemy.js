var fullCircle = Math.PI * 2;

function makeEnemyShip(x,y) {

	var position = {
		x: x,
		y: y
	};

	// direction the ship is facing
	var orientation = 0;

	var turnSpeed = fullCircle / 50;

	var speed = 2;

	function update(elapsed) {
		var y = target.y - position.y;
		var x = target.x - position.x;
		var d2 = Math.pow(x, 2) + Math.pow(y, 2);

		if (d2 < 16) {
			target = findNewTarget();
		} else {

			var angle = Math.atan2(x,y);
			var delta = angle - orientation;
			var delta_abs = Math.abs(delta);

			// if angle is more than 180, convert to negative value
			if (delta_abs > Math.PI) {
				delta = delta_abs - fullCircle;
			}

			if (delta !== 0) {
				var direction = delta / delta_abs;

				orientation += (direction * Math.min(turnSpeed, delta_abs));
			}

			// so that orientation won't be > a full circle
			orientation %= fullCircle;

			// use orientation and speed to update position
			position.x += Math.cos(orientation) * speed;
			position.y += Math.sin(orientation) * speed;
		}

		function draw(ctx) {

			// save context's state before translation & rotation
			ctx.save();

			// translate the position
			ctx.translate(position.x, position.y);

			ctx.rotation(orientation);

			ctx.fillStyle = 'yellow';

			ctx.fillRect(-3, -1, 6, 2);

			ctx.restore();

			// drawing the actual target
			ctx.beginPath();
			ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
			ctx.arc(target.x, target.y, 2, 0, Math.PI * 2, true);
			ctx.fill();
		}

		//create random x,y within canvas
		function findNewTarget() {
			var target = {
				x: Math.round(Math.random() * 600),
				y: Math.round(Math.random() * 300)
			};

			return target;
		}

		return {
			draw: draw,
			update: update
		}
	}
}