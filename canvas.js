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
		GROWTH		=	5;
	
	// Get the canvas and context
	var canvas 		=	$(canvas)[0],
		ctx			=	canvas.getContext('2d');

	//other variables
	var snakeBits	=	[],		// Array containing position of bits of snakes
		heading,				// Current heading direction
		bitsToGrow	=	GROWTH,	// bits left to grow in the next iteration
		timer,					//	timer to loop the game
		interval	=	100, 	// interval for the timer
		food;					// current position of food
	

	function startGame(){
		heading		=	EAST;
		snakeBits.unshift(bit(4,4));

		//clear the interval
		clearInterval(timer);
		timer	=	setInterval(gameLoop,interval);
	}

	//function that will take x and y coordinates
	//and will return an object
	function bit(x,y){
		return {x: x, y: y};
	}

	function gameLoop(){
		advanceSnake();
		checkCollision();
		clearCanvas();
		drawSnake();
		drawFood();
	}

	//advance the snake to move
	function advanceSnake(){
		
	}

	//To check collision
	function checkCollision(){
		
	}

	//To clear canvas
	function clearCanvas(){
		
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
	snake.start();
})