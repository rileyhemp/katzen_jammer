"use strict";

var canvas = document.querySelector('#canvas');
var ctx = canvas.getContext('2d');
var width = window.innerWidth * .99;
var height = window.innerHeight * .99;
canvas.width = width;
canvas.height = height;
var background = {
  x: 10,
  y: 10,
  w: width,
  h: height,
  fill: "black"
};
var logos = [{
  x: 160,
  y: 160,
  r: 150,
  vx: 5,
  vy: 4,
  fill: "red"
}, {
  x: 500,
  y: 500,
  r: 150,
  vx: -3,
  vy: 4,
  fill: "white"
}];

function draw() {
  Rectangle(background);

  for (var i = 0; i < logos.length; i++) {
    Circle(logos[i]); //Detects if the circle is touching the X or Y axis and reverses their direction

    if (logos[i].y + logos[i].r > background.y + background.h || logos[i].y - logos[i].r < background.y) {
      logos[i].vy = -logos[i].vy;
    }

    if (logos[i].x + logos[i].r > background.x + background.w || logos[i].x - logos[i].r < background.x) {
      logos[i].vx = -logos[i].vx;
    }

    logos[i].x += logos[i].vx;
    logos[i].y += logos[i].vy;
  }

  for (var _i = 0; _i < logos.length; _i++) {
    //Uses the distance formula to determine if the circles are touching.
    if (Math.sqrt(Math.pow(logos[1].x - logos[0].x, 2) + Math.pow(logos[1].y - logos[0].y, 2)) < logos[1].r + logos[0].r) {
      var c1 = logos[0];
      var c2 = logos[1];
      ricochetCircle1();
      ricochetCircle2();
    }
  }

  function ricochetCircle1() {
    var c1 = logos[0];
    var c2 = logos[1]; //Get new x velocity for circle 1

    c1.vx = c1.vx - 2 * c2.r / (c1.r + c2.r) * ((c1.vx - c2.vx) * (c1.x - c2.x) / Math.pow(c1.x - c2.x, 2)) * (c1.x - c2.x); //Get new y velocity for circle 1

    c1.vy = c1.vy - 2 * c2.r / (c1.r + c2.r) * ((c1.vy - c2.vy) * (c1.y - c2.y) / Math.pow(c1.y - c2.y, 2)) * (c1.y - c2.y);
  }

  function ricochetCircle2() {
    var c1 = logos[0];
    var c2 = logos[1]; //Get new x velocity for circle 2

    c2.vx = c2.vx - 2 * c1.r / (c2.r + c1.r) * ((c2.vx - c1.vx) * (c2.x - c1.x) / Math.pow(c2.x - c1.x, 2)) * (c2.x - c1.x); //Get new y velocity for circle 2

    c2.vy = c2.vy - 2 * c1.r / (c2.r + c1.r) * ((c2.vy - c1.vy) * (c2.y - c1.y) / Math.pow(c2.y - c1.y, 2)) * (c2.y - c1.y);
  }

  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);

function Rectangle(obj) {
  ctx.beginPath();
  ctx.fillStyle = obj.fill;
  ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
}

function Circle(obj) {
  ctx.beginPath();
  ctx.fillStyle = obj.fill;
  ctx.arc(obj.x, obj.y, obj.r, 0, 2 * Math.PI);
  ctx.fill();
}
/*

ctx.fillStyle = "white"
ctx.arc(95,50,40,0,2*Math.PI)
ctx.fill();
*/
//# sourceMappingURL=balls.js.map
