// import { helperFunction } from './utils.js'
// helperFunction()

// canvas
const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

function Box(x, y, w, h, colour) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.colour = colour
    this.velocity = {
        x: (Math.random() - .5) * 10,
        y: (Math.random() - .5) * 10,
    }

    this.update = () => {
        this.draw()

        this.x += this.velocity.x
        this.y += this.velocity.y

        this.velocity.x = (Math.random() - .5) * 50
        this.velocity.y = (Math.random() - .5) * 50
    }

    this.draw = () => {
        context.fillStyle = colour
        context.fillRect(this.x, this.y, 3, 3)
    }
}

let boxOne = new Box(canvas.width / 2, canvas.height / 2, 10, 10, '#eeeeee')

// console.log(canvas.width)
// console.log(innerWidth)

let counter = 0

const animate = () => {
    requestAnimationFrame(animate)

    counter++

    // console.log(counter)

    // context.clearRect(0, 0, canvas.width, canvas.height)

    boxOne.update()
}

animate()