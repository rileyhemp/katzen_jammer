let canvas = document.querySelector('#canvas')
let ctx = canvas.getContext('2d')
let width = window.innerWidth * .99
let height = window.innerHeight * .99
canvas.width = width
canvas.height = height

let background = {
    x: 10,
    y: 10,
    w: width,
    h: height,
    fill: "black"
}

let logos = [{
                x: 160,
                y: 160,
                r: 150,
                vx: 3,
                vy: 5,
                fill: "red"
            },
            {
                x: 500,
                y: 500,
                r: 150,
                vx: 3,
                vy: 5,
                fill: "white"
            }]

function draw(){

    Rectangle(background)

    for ( let i = 0; i<logos.length; i++ ) {

        Circle(logos[i])
    
        //Detects if the circle is touching the X or Y axis and reverses their direction
        if ( logos[i].y + logos[i].r > background.y + background.h || logos[i].y - logos[i].r < background.y ) {
            logos[i].vy = -logos[i].vy
        } 
    
        if ( logos[i].x + logos[i].r > background.x + background.w || logos[i].x - logos[i].r < background.x ) {
            logos[i].vx = -logos[i].vx
        } 
    
        logos[i].x += logos[i].vx
        logos[i].y += logos[i].vy

    }

    for ( let i = 0; i<logos.length; i++ ) {
        //Uses the distance formula to determine if the circles are touching.
        if ( Math.sqrt( Math.pow(logos[1].x-logos[0].x, 2) + Math.pow(logos[1].y-logos[0].y, 2) ) <= logos[1].r + logos[0].r ) {
            let c1 = logos[0]
            let c2 = logos[1]




            


        }
    }
    requestAnimationFrame(draw)
}

requestAnimationFrame(draw)


function Rectangle(obj) {
    ctx.beginPath()
    ctx.fillStyle = obj.fill
    ctx.fillRect(obj.x, obj.y, obj.w, obj.h)
}

function Circle(obj) {
    ctx.beginPath()
    ctx.fillStyle = obj.fill
    ctx.arc(obj.x, obj.y, obj.r, 0, 2*Math.PI)
    ctx.fill()
}











/*

ctx.fillStyle = "white"
ctx.arc(95,50,40,0,2*Math.PI)
ctx.fill();
*/











