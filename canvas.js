/**
	Snake game 
	Author 	: Shameer
	mail 	: me@shameerc.com
**/

var SnakeGame	=	function(canvas){

	// constants used in the game
	var NORTH		=	1, EAST = 2, SOUTH	= 4, WEST	= 8, HEAD = 16, TAIL = 32,
		CELL_SIZE	= 	20, 		// cell sice in pixels
		PI			=	Math.PI,	
		MAX_X		=	30, MAX_Y = 20,
		POINT		=	5;
		GROWTH		=	1;
	
	// where to show the result
	resultField		=	document.getElementById('result');
	pointsField		=	document.getElementById('current-point');
	
	// Get the canvas and context
	var canvas 		=	$(canvas)[0];

	// if the browser supports canvas
	if(canvas.getContext){
		var	ctx			=	canvas.getContext('2d');
	}
	else{
		// else throw an error message
		err	=	"Sorry. Your browser won't support html5";
		resultField.innerHTML	=	err;
		return false;
	}

	//other variables
	var snakeBits	=	[],		// Array containing position of bits of snakes
		heading,				// Current heading direction
		bitsToGrow	=	GROWTH,	// bits left to grow in the next iteration
		timer,					//	timer to loop the game
		interval	=	100, 	// interval for the timer
		lastDir		=	NORTH,	// variable to keep the last direction
		curretPoints=	0,		// current points
		food, stopped = false;	// current position of food
	

	// start the game here
	function startGame(){
		heading		=	EAST;
		snakeBits.unshift(bit(10,4));


		placeFood();
		//clear the interval
		clearInterval(timer);
		timer	=	setInterval(gameLoop,interval);
	}

	//stop the game
	function stopGame(){
		clearInterval(timer);
		stopped		=	true;
	}

	//function that will take x and y coordinates
	//and will return an object
	function bit(x,y){
		return {x: x, y: y};
	}

	function gameLoop(){
		advanceSnake();
		checkCollision();

		// if the game not stopped
		if(!stopped) {
			clearCanvas();
			drawSnake();
			drawFood();
			eatFood();
		}
	}

	// when presses a key 
	document.onkeydown = checkEvents;

	//check for events to set the heading direction
	function checkEvents(evt){
		evt = (evt) ? evt : ((window.event) ? event : null);
	    if (evt) {
			switch(evt.keyCode)    	{
				case 37 :
					heading = (lastDir != EAST) ? WEST :EAST;
					break;
				case 38 :
					heading	= (lastDir != SOUTH)? NORTH : SOUTH;
					break;
				case 39 :
					heading	= (lastDir != WEST) ? EAST : WEST;
					break;
				case 40 :
					heading	= (lastDir != NORTH) ? SOUTH : NORTH;
					break;
			}
	    }
	}


	//advance the snake to move
	function advanceSnake(){
		var head	=	snakeBits[0];
		switch(heading){
			case NORTH : 
				snakeBits.unshift(bit(head.x ,head.y - 1));
				break;
			case SOUTH : 
				snakeBits.unshift(bit(head.x ,head.y + 1));
				break;
			case EAST : 
				snakeBits.unshift(bit(head.x + 1 ,head.y));
				break;
			case WEST : 
				snakeBits.unshift(bit(head.x - 1 ,head.y));
				break;
		}
		if(0===bitsToGrow) {
			snakeBits.pop();
		}
		else{
			bitsToGrow-- ;
		}
		lastDir = heading;
	}

	//To check collision
	function checkCollision(){
		var head	=	snakeBits[0];
		if(head.x+1 > MAX_X || head.y+1 > MAX_Y
			|| head.x+ 1 == 0 || head.y+1 ==0){
			stopGame();
			document.getElementById('result').innerHTML = 'Game finished. Points : ' + curretPoints;
		}
	}

	function eatFood(){
		var head = snakeBits[0];
		if(food.x == head.x && food.y== head.y){
			refreshFood();
			bitsToGrow = GROWTH;
			updatePoint();
		}
	}


	function refreshFood(){
		ctx.clearRect(food.x,food.y,CELL_SIZE,CELL_SIZE);
		placeFood();
		drawFood();
	}

	// Update the current point
	function updatePoint(){
		curretPoints	=	curretPoints + POINT;
		pointsField.innerHTML	=	curretPoints;
	}


	//To clear canvas
	function clearCanvas(){
		canvas.width = canvas.width;
	}

	// draw the snake
	function drawSnake(){
		var i,length	=	snakeBits.length;
		for(i=0;i<length;i++){
			drawBit(snakeBits[i]);
		}
	}

	//Draw each segment of the snake
	function drawBit(bit){
		drawInCell(bit.x,bit.y,function(){
			ctx.beginPath();
			ctx.fillStyle = '#1f4500';
			ctx.rect(0,0,CELL_SIZE,CELL_SIZE);
			ctx.fill();
		})
	}

	// Draw a cell of the grid
	function drawInCell(cx,cy,fn){
		var x	=	cx	* CELL_SIZE,
			y	=	cy	* CELL_SIZE;
		ctx.save();
		ctx.translate(x,y);
		fn();
		ctx.restore();
	}

	//function that will draw the food
	function drawFood(){
		drawInCell(food.x,food.y,function(){
			ctx.fillStyle	=	'orange';
			ctx.beginPath();
			ctx.arc(CELL_SIZE/2,CELL_SIZE/2,
					CELL_SIZE/2,0,2*PI,true);
			ctx.fill();
		})	
	}

	// place the food on the canvas
	function placeFood(){
		var	x	=	Math.round(Math.random() * (MAX_X - 1)),
			y	=	Math.round(Math.random() * (MAX_Y - 1));
		
		if(inSnake(x,y,true)) return placeFood();

		food 	= {x: x, y: y};
	}

	//Check if the food is on snake
	function inSnake(x,y,includeHead){
		var length	= 	snakeBits.length,
			i		=	includeHead ? 0 : 1	;
		for(;i<length;i++){
			if(x==snakeBits[i].x && y == snakeBits[i].y)
				return true;
		}
		return false;
	}

	// return an object with
	// correspondin properties
	return {
		start	: startGame
	};
}

$(function(){
	window.snake	=	SnakeGame('#canvas');
	// start the game
	if(snake){
		snake.start();
	}
})