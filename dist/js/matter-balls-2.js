"use strict";

//Set width and height
var width = window.innerWidth;
var height = window.innerHeight * .7;

if (window.outerWidth < 1024) {
  height = window.innerHeight * .85;
} else if (window.outerWidth < 768) {
  height = window.innerHeight * .4;
} //Module aliases for Matter.js


var Engine = Matter.Engine;
var Events = Matter.Events;
var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Body = Matter.Body; //Create the engine

var engine = Engine.create(); //Create the renderer 

var render = Render.create({
  element: document.querySelector('.balls'),
  engine: engine,
  options: {
    width: width,
    height: height,
    wireframes: false,
    render: {
      opacity: 0
    }
  }
}); //Create the elements

var circleA = Bodies.circle(width * .3, height / 2, 140, {
  render: {
    sprite: {
      texture: "http://circuslabs.net/~riley.hemphill/Katzen%20Jammer/katzen.png",
      xScale: 0.5,
      yScale: 0.5
    }
  }
});
var circleB = Bodies.circle(width - width * .3, height / 2, 140, {
  render: {
    sprite: {
      texture: "http://circuslabs.net/~riley.hemphill/Katzen%20Jammer/jammer.png",
      xScale: 0.5,
      yScale: 0.5
    }
  }
}); //Create smaller circles on mobile

if (window.outerWidth < 768) {
  circleA = Bodies.circle(width * .2, height / 2, 80, {
    render: {
      sprite: {
        texture: "http://circuslabs.net/~riley.hemphill/Katzen%20Jammer/katzen.png",
        xScale: 0.27,
        yScale: 0.27
      }
    }
  });
  circleB = Bodies.circle(width * .8, height / 2, 80, {
    render: {
      sprite: {
        texture: "http://circuslabs.net/~riley.hemphill/Katzen%20Jammer/katzen.png",
        xScale: 0.27,
        yScale: 0.27
      }
    }
  });
} //Create the walls


var topSide = Bodies.rectangle(width / 2, 10, width, 10, {
  isStatic: true,
  render: {
    opacity: 0
  }
});
var bottomSide = Bodies.rectangle(width / 2, height, width, 20, {
  isStatic: true,
  render: {
    opacity: 0
  }
});
var rightSide = Bodies.rectangle(width - 10, height / 2, 10, height, {
  isStatic: true,
  render: {
    opacity: 0
  }
});
var leftSide = Bodies.rectangle(0, height / 2, 10, height, {
  isStatic: true,
  render: {
    opacity: 0
  }
}); //Create the corners 

var topLeft = Bodies.rectangle(0, 0, 300, 200, {
  isStatic: true
});
topLeft.render.fillStyle = 'transparent';
Body.rotate(topLeft, 40);
var bottomRight = Bodies.rectangle(width, height, 200, 200, {
  isStatic: true
});
bottomRight.render.fillStyle = 'transparent';
Body.rotate(bottomRight, 40);
var bottomLeft = Bodies.rectangle(0, height, 200, 200, {
  isStatic: true
});
bottomLeft.render.fillStyle = 'transparent';
Body.rotate(bottomLeft, 40);
var topRight = Bodies.rectangle(width, 0, 200, 300, {
  isStatic: true
});
topRight.render.fillStyle = 'transparent';
Body.rotate(topRight, 40); //Set environmental props

engine.world.gravity.y = 0;
engine.world.gravity.x = 0; //Set objects props

circleA.restitution = 1;
circleB.restitution = 1;
topSide.restitution = 1;
bottomSide.restitution = 1;
rightSide.restitution = 1;
leftSide.restitution = 1;
topLeft.restitution = 1;
topRight.restitution = 1;
bottomLeft.restitution = 1;
bottomRight.restitution = 1;
topSide.friction = 0;
bottomSide.friction = 0;
rightSide.friction = 0;
leftSide.friction = 0;
topLeft.friction = 0;
topRight.friction = 0;
bottomLeft.friction = 0;
bottomRight.friction = 0;
topSide.frictionStatic = 0;
bottomSide.frictionStatic = 0;
rightSide.frictionStatic = 0;
leftSide.frictionStatic = 0;
topLeft.frictionStatic = 0;
topRight.frictionStatic = 0;
bottomLeft.frictionStatic = 0;
bottomRight.frictionStatic = 0;
topSide.inertia = Infinity;
bottomSide.inertia = Infinity;
rightSide.inertia = Infinity;
leftSide.inertia = Infinity;
topLeft.inertia = Infinity;
topRight.inertia = Infinity;
bottomLeft.inertia = Infinity;
bottomRight.inertia = Infinity;
circleA.friction = 0;
circleA.frictionAir = 0;
circleA.frictionStatic = 0.0;
circleA.inertia = Infinity;
circleB.friction = 0;
circleB.frictionAir = 0;
circleB.frictionStatic = 0.0;
circleB.inertia = Infinity; //Add initial velocity 

setTimeout(function () {
  var interval = 1;

  var timer = function timer() {
    interval++;
    Body.setVelocity(circleA, {
      x: 3.5 * interval / 70,
      y: 0.1 * interval / 70
    });
    Body.setVelocity(circleB, {
      x: -3.5 * interval / 70,
      y: 0.1 * interval / 70
    });

    if (interval <= 30) {
      setTimeout(timer, interval);
    }
  };

  timer();
}, 100);

function grav(rate) {
  var direction = 0.01;
  var counter = 0;
  setInterval(function () {
    console.log(counter);
    counter += direction;

    if (counter > 1.00 || counter < -1.00) {
      direction = -direction;
    }

    engine.world.gravity.x = counter * -0.05;
    engine.world.gravity.y = counter * 0.05;
  }, 10);
} //Slow down the balls if they get going too fast


setInterval(function () {
  var limit = 25;
  var newCAX = circleA.velocity.x - .1;
  var newCAY = circleA.velocity.y - .1;
  var newCBX = circleB.velocity.x - .1;
  var newCBY = circleB.velocity.y - .1;

  if (circleA.velocity.x > limit) {
    Body.setVelocity(circleA, {
      x: newCAX,
      y: circleA.velocity.y
    });
  }

  if (circleA.velocity.y > limit) {
    Body.setVelocity(circleA, {
      x: circleA.velocity.x,
      y: newCAY
    });
  }

  if (circleB.velocity.x > limit) {
    Body.setVelocity(circleB, {
      x: newCBX,
      y: circleB.velocity.y
    });
  }

  if (circleB.velocity.y > limit) {
    Body.setVelocity(circleB, {
      x: circleB.velocity.x,
      y: newCBY
    });
  }
}, 10); //Keep the balls from rotating

/*
Events.on(engine, "afterUpdate", function(){
    circleA.angle = 0
    circleB.angle = 0
    
})
*/
//Makes the balls go crazy

/*
document.body.addEventListener('click', function(){

    Body.applyForce( circleA, {
        x: circleA.position.x,
        y: circleA.position.y,
    }, {
        x: 2,
        y: -1
    })

    Body.applyForce( circleB, {
        x: circleB.position.x,
        y: circleB.position.y,
    }, {
        x: -1,
        y: 2
    })
})
*/
//Lets you throw the balls

var mouseConstraint = Matter.MouseConstraint.create(engine, {
  constraint: {
    stiffness: 0.0008,
    angularStiffness: 1
  }
}); //Add the images to the circles

circleA.render.sprite.texture = "http://circuslabs.net/~riley.hemphill/Katzen%20Jammer/katzen.png";
circleB.render.sprite.texture = "http://circuslabs.net/~riley.hemphill/Katzen%20Jammer/jammer.png"; //Add all of the bodies to the world

World.add(engine.world, [circleA, circleB, topSide, rightSide, bottomSide, leftSide, topLeft, topRight, bottomLeft, bottomRight, mouseConstraint]); //Run the engine

Engine.run(engine); //Run the renderer

Render.run(render);
//# sourceMappingURL=matter-balls-2.js.map
