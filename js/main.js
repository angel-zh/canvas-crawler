const game = document.getElementById('canvas')
const movement = document.getElementById('movement')
const message = document.getElementById('status')

// one thing we need to do is get the computed size of our canvas
// this is because the canvas could have different sizes on different screens
// and we need to be able to access the exact size of the canvas in order to make this function like a game should
// we do that with the following lines of code:
game.setAttribute('width', getComputedStyle(game)[`width`])
game.setAttribute('height', getComputedStyle(game)[`height`])

// we need to set the game's context to be 2d
// we also save that context to the ctx variable
// this tells our code to do whatever we want it to do in the context of the canvas area
const ctx = game.getContext('2d')

// fillStyle is built in and sets a color to fill wahtever shape you're drawing
// ctx.fillStyle = 'green'
// fillRect takes 4 arguments(xCoord, yCoord, width, height) units are in px
// ctx.fillRect(50, 10, 100, 100)

// here is an example of the hero object
// notice this uses a function declaration syntax (not arrow expression)
// this is because one of the primary diffs 
// const hero = {
//     x: 10,
//     y: 10,
//     color: 'hotpink',
//     width: 20,
//     height: 20,
//     alive: true,
//     render: function () {
//         ctx.fillStyle = this.color
//         ctx.fillRect(this.x, this.y, this.width, this.height)

//     }
// }
// //here's an example of how to make your hero show up on the canvase
// hero.render()

// // ogre object
// const ogre = {
//     x: 200,
//     y: 100,
//     color: '#bada55',
//     width: 60,
//     height: 120,
//     alive: true,
//     render: function () {
//         ctx.fillStyle = this.color
//         ctx.fillRect(this.x, this.y, this.width, this.height)
//     }
// }
// ogre.render()

// Because our two crawlers (those are the guys that move around) are buildt of the same key-value pairs, we can use a javascript class to build them

class Crawler {
    // we need a constructor function in order to make differences between instances of this class
    constructor(x, y, color, width, height) {
        this.x = x,
            this.y = y,
            this.color = color,
            this.width = width,
            this.height = height,
            // we can hard set values inside the constructor
            this.alive = true,
            // we can even set methods inside the constructor
            this.render = function () {
                ctx.fillStyle = this.color
                ctx.fillRect(this.x, this.y, this.width, this.height)
            }
    }
}

const player = new Crawler(10, 10, 'lightsteelblue', 16, 16)
const ogre = new Crawler(200, 50, '#baba55', 32, 48)

// player.render()
// ogre.render()

// now we're going to set up our movement handler function to tell our code how our player moves around and what keys to use to move them
// this function has to be tired to an even handler

// this move handler will be associated with a keydown event
// use keycodes to tell it to do different movements for different keys
// here are some keycodes: 
// w = 87, a = 65, s = 83, d = 68
// up = 38, left = 37, down = 40, right = 39
// could use if statements for this but switch case has a shorter syntax
const movementHandler = (event) => {
    switch (event.keyCode) {
        // can use multiple cases here for multiple keys to trigger same event 
        // remember the top of our canvas is (0,0) coordinates
        // move up, this will move char up 10px each press
        case (87):
        case (38):
            player.y -= 10
            break
        // move left
        case (65):
        case (37):
            player.x -= 10
            break
        // move down
        case (83):
        case (40):
            player.y += 10
            break
        // move right
        case (68):
        case (39):
            player.x += 10
            break
    }
}

// here's the function to detect collision between entities
// to accurately detect a hit, we need to account for the entire space taken up by each object
// we need to use the hero's x, y, width, and height and ogre's x, y, width, and height
const detectHit = () => {
    // basically using one if statement to cover all our bases
    // that means judging player and ogre's x, y, width, and height
    if (player.x < ogre.x + ogre.width
        && player.x + player.width > ogre.x
        && player.y < ogre.y + ogre.height
        && player.y + player.height > ogre.y) {
        ogre.alive = false
        message.textContent = 'You win!'
    }
}


// we're going to set up a game loop function attached to an interval
// this is how we will create animation in our canvas

const gameLoop = () => {
    // use clearRect to clear rectangles
    // we want to clear the entire canvas every single frame so only the current rectangle displays and this makes it seem like the char(rectangle) is moving on the canvas
    if (ogre.alive) {
        detectHit()
    }
    ctx.clearRect(0, 0, game.width, game.height)
    movement.textContent = player.x + ", " + player.y
    player.render()
    if (ogre.alive) {
        ogre.render()
    }
}

// attach our movement handler to keydown event and run gameLoop
// we want to make sure to only do this once all of the DOM content has loaded

document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('keydown', movementHandler)
    setInterval(gameLoop, 60)
})

