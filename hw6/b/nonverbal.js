// Coded by Linne S.
// Forked from Copyright 2011 William Malone (www.williammalone.com)
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var canvas;
var context;
var images = {};
var totalResources = 3;
var numResourcesLoaded = 0;
var fps = 30;
var breathInc = 0.1;
var breathDir = 1;
var breathAmt = 0;
var breathMax = 2;
var breathInterval = setInterval(updateBreath, 1000 / fps);
var maxEyeHeight = 14;
var curEyeHeight = maxEyeHeight;
var curEyeColor = "black"
var eyeOpenTime = 0;
var timeBtwBlinks = 4000;
var blinkUpdateTime = 200;                    
var blinkTimer = setInterval(updateBlink, blinkUpdateTime);
var fpsInterval = setInterval(updateFPS, 1000);
var numFramesDrawn = 0;
var curFPS = 0;
var jumping = false;

var lip = 630;


function updateFPS() {
	curFPS = numFramesDrawn;
	numFramesDrawn = 0;
}

function prepareCanvas(canvasDiv, canvasWidth, canvasHeight) {
	// Create the canvas 
	// (Neccessary for IE because it doesn't know what a canvas element is)
	canvas = document.createElement('canvas');
	canvas.setAttribute('width', canvasWidth);
	canvas.setAttribute('height', canvasHeight);
	canvas.setAttribute('id', 'canvas');
	canvasDiv.appendChild(canvas);
	
	if(typeof G_vmlCanvasManager != 'undefined') {
		canvas = G_vmlCanvasManager.initElement(canvas);
	}

	context = canvas.getContext("2d"); // Grab the 2d canvas context
	// Note: The above code is a workaround for IE 8and lower. 
	// Otherwise we could have used:
	//     context = document.getElementById('canvas').getContext("2d");
	
	canvas.width = canvas.width; // clears the canvas 
	context.fillText("Loading... :)", 40, 140);
	
	// load the images
	// [!] change resouces and then change [totalResources]

	loadImage("pbody");
	loadImage("parmleft");
	loadImage("parmright");

}


function loadImage(name) {

  images[name] = new Image();
  images[name].onload = function() { 
	  resourceLoaded();
  }
  images[name].src = "images/" + name + ".png";
}


function resourceLoaded() {

  numResourcesLoaded += 1;
  if(numResourcesLoaded === totalResources) {
	setInterval(redraw, 1000 / fps);
  }
}


function redraw() {

  var x = 0;
  var y = 0;
  var jumpHeight = 45;
  
  // clears the canvas
  canvas.width = canvas.width; 

  context.drawImage(images["pbody"], x , y);


  // Left Eye
  drawEllipse(x + 360, y + 600 - breathAmt, 10, curEyeHeight, curEyeColor); 

  // Right Eye
  drawEllipse(x + 380, y + 600 - breathAmt, 10, curEyeHeight, curEyeColor); 


  context.beginPath();
  context.moveTo(360, 620);
  context.bezierCurveTo(360, lip, 380, lip, 380, 620);
  context.lineWidth = 2;
  context.stroke();
  

  // noticed the y is changing here.
  if (jumping) {
	y -= jumpHeight;
  }

  if (jumping) {
	context.drawImage(images["parmleft"], x + 250, y + 600 - breathAmt);
  } else {
	context.drawImage(images["parmleft"], x + 255, y + 600 - breathAmt);
  }

  if (jumping) {
	context.drawImage(images["parmright"], x + 400, y + 550 - breathAmt);
  } else {
	context.drawImage(images["parmright"], x + 400, y + 550 - breathAmt);
  } 


}



function drawEllipse(centerX, centerY, width, height, color) {

  context.beginPath();
  
  context.moveTo(centerX, centerY - height/2);
  
  context.bezierCurveTo(
	centerX + width/2, centerY - height/2,
	centerX + width/2, centerY + height/2,
	centerX, centerY + height/2);

  context.bezierCurveTo(
	centerX - width/2, centerY + height/2,
	centerX - width/2, centerY - height/2,
	centerX, centerY - height/2);
 
  context.fillStyle = color;
  context.fill();
  context.lineWidth = 2;
  context.stroke();

  context.closePath();	
}

// ---- ? Why assign curEyeColor instead of [color = curEyeColor]?
// set argument as color
function setEyeColor(color) {
    curEyeColor = color; 
}



function updateBreath() { 
				
  if (breathDir === 1) {  // breath in
	breathAmt -= breathInc;
	if (breathAmt < -breathMax) {
	  breathDir = -1;
	}
  } else {  // breath out
	breathAmt += breathInc;
	if(breathAmt > breathMax) {
	  breathDir = 1;
	}
  }
}

function setBreathInc(inc) {
    breathInc = inc;
}

function updateBlink() { 
				
  eyeOpenTime += blinkUpdateTime;
	
  if(eyeOpenTime >= timeBtwBlinks){
	blink();
  }
}

function setTimeBetweenBlinks(duration) {
    timeBtwBlinks = duration
}

function blink() {

  curEyeHeight -= 1;
  if (curEyeHeight <= 0) {
	eyeOpenTime = 0;
	curEyeHeight = maxEyeHeight;
  } else {
	setTimeout(blink, 10);
  }
}

function jump() {
	
  if (!jumping) {
	jumping = true;
	setTimeout(land, 2000); //15000
  }

}

function land() {
	
  jumping = false;

}