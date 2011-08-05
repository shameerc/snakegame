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
	var snakeBits	=	[],	// Array containing position of bits of snakes
		heading,			// Current heading direction
		bitsToGrow	=	GROWTH,	// bits left to grow in the next iteration
		timer,				//	timer to loop the game
		food;				// current position of food
	
	// return an object with
	// correspondin properties
	return {
		start	: function(){
			
		}
	};
}

$(function(){
	window.snake	=	SnakeGame('#canvas');
	// start the game
	snake.start();
})