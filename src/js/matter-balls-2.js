
//Set width and height
let width = window.innerWidth
let height = window.innerHeight * .7

//Module aliases for Matter.js
let Engine = Matter.Engine
let Events = Matter.Events
let Render = Matter.Render
let World = Matter.World
let Bodies = Matter.Bodies
let Body = Matter.Body

//Create the engine
let engine = Engine.create()

//Create the renderer 
let render = Render.create({
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
})

//Create the elements
let circleA = Bodies.circle(width*.3, height/2, 140, {
    render: {
        sprite: {
            texture: "http://circuslabs.net/~riley.hemphill/Katzen%20Jammer/katzen.png",
            xScale: 0.5,
            yScale: 0.5
        }
    }
});
let circleB = Bodies.circle(width-width*.3, height/2, 140,{
    render: {
        sprite: {
            texture: "http://circuslabs.net/~riley.hemphill/Katzen%20Jammer/jammer.png",
            xScale: 0.5,
            yScale: 0.5
        }
    }
});

//Create the walls
let topSide = Bodies.rectangle(width/2, 0, width, 5, { 
    isStatic: true,
    render: {opacity: 0}
});
let bottomSide = Bodies.rectangle(width/2, height-175, width, 10, { 
    isStatic: true, 
    render: {opacity: 0}
});
let rightSide = Bodies.rectangle(width, height/2, 5, height, { 
    isStatic: true, 
    render: {opacity: 0}
});
let leftSide = Bodies.rectangle(0, height/2, 5, height, { 
    isStatic: true, 
    render: {opacity: 0}
});

//Create the corners 
let topLeft = Bodies.rectangle(0, 0, 300, 200, {
    isStatic: true,
});
topLeft.render.fillStyle = 'transparent'
Body.rotate(topLeft, 40)

let bottomRight = Bodies.rectangle(width, height, 200, 200, {
    isStatic: true,
});
bottomRight.render.fillStyle = 'transparent'
Body.rotate(bottomRight, 40)

let bottomLeft = Bodies.rectangle(0, height, 200, 200, {
    isStatic: true,
});
bottomLeft.render.fillStyle = 'transparent'
Body.rotate(bottomLeft, 40)

let topRight = Bodies.rectangle(width, 0, 200, 300, {
    isStatic: true,
});
topRight.render.fillStyle = 'transparent'
Body.rotate(topRight, 40)


//Set environmental props
engine.world.gravity.y = 0;
engine.world.gravity.x = 0;


//Set objects props
circleA.restitution = 1
circleB.restitution = 1
topSide.restitution = 1
bottomSide.restitution = 1
rightSide.restitution = 1
leftSide.restitution = 1

topSide.friction = 0
bottomSide.friction = 0
rightSide.friction = 0
leftSide.friction = 0

topSide.frictionStatic = 0
bottomSide.frictionStatic = 0
rightSide.frictionStatic = 0
leftSide.frictionStatic = 0

topSide.inertia = Infinity
bottomSide.inertia = Infinity
rightSide.inertia = Infinity
leftSide.inertia = Infinity

circleA.friction = 0
circleA.frictionAir = 0
circleA.frictionStatic = 0.0
circleA.inertia = Infinity

circleB.friction = 0
circleB.frictionAir = 0
circleB.frictionStatic = 0.0
circleB.inertia = Infinity

//Add initial velocity 

setTimeout(function(){
    let interval = 1
    let timer = function() {
        interval++
        Body.setVelocity(circleA, {
            x: 1.25 * interval / 70,
            y: 0.1 * interval / 70
        })
        Body.setVelocity(circleB, {
            x: -1.25 * interval / 70,
            y: 0.1 * interval / 70
        })
        if (interval <= 30) {
            setTimeout(timer, interval)
        }
    }
    timer()
},100)

function grav(rate) {

    let direction = 0.01
    let counter = 0

    setInterval(function(){
        console.log(counter)
        counter += direction
        if (counter > 1.00 || counter < -1.00 ) {
            direction = -direction
        }
        engine.world.gravity.x = counter * -0.05
        engine.world.gravity.y = counter * 0.05
        
    }, 10)
    
}



//Keep the balls from rotating


Events.on(engine, "afterUpdate", function(){
    circleA.angle = 0
    circleB.angle = 0
    
})


//Makes the balls go crazy

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

//Lets you throw the balls
var mouseConstraint = Matter.MouseConstraint.create(engine, {
    element: document.body,
    constraint: {
        stiffness: 1,
         angularStiffness: 1
    }
});

//Add the images to the circles
circleA.render.sprite.texture = "http://circuslabs.net/~riley.hemphill/Katzen%20Jammer/katzen.png"
circleB.render.sprite.texture = "http://circuslabs.net/~riley.hemphill/Katzen%20Jammer/jammer.png"
//Add all of the bodies to the world
World.add(engine.world, [circleA, circleB, topSide, rightSide, bottomSide, leftSide, topLeft, topRight, bottomLeft, bottomRight, mouseConstraint ]);

//Run the engine
Engine.run(engine);

//Run the renderer
Render.run(render);
