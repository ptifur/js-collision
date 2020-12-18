import { distance, randomIntFromRange, resolveCollision } from './utils.js'

// console.log(canvas.width)
// console.log(innerWidth)

// buttons
const buttonRandom = document.getElementById('random')
const buttonParticles = document.getElementById('particles')
const checkboxLeaveTrace = document.getElementById('checkbox')

let movementType = 'particles'

buttonRandom.addEventListener('click', () => {
    movementType = 'random'

    buttonRandom.classList.toggle('active')
    buttonParticles.classList.toggle('active')
})

buttonParticles.addEventListener('click', () => {
    init()

    movementType = 'particles'

    buttonParticles.classList.toggle('active')
    buttonRandom.classList.toggle('active')
})

// canvas
const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

// define box
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

        // move
        this.x += this.velocity.x
        this.y += this.velocity.y
        
        // change direction
        this.velocity.x = (Math.random() - .5) * 50
        this.velocity.y = (Math.random() - .5) * 50

    }

    this.draw = () => {
        context.globalAlpha = 1
        context.fillStyle = colour
        context.fillRect(this.x, this.y, this.w, this.h)
    }
}

let boxOne = new Box(canvas.width / 2, canvas.height / 2, 16, 16, '#333333')

// define particles
function Particle(x, y, r, colour) {
    this.x = x
    this.y = y
    this.r = r
    this.colour = colour
        this.velocity = {
            x: (Math.random() - .5) * 5,
            y: (Math.random() - .5) * 5,
        }
    this.opacity = .9
    this.mass = 1

    this.update = (type) => {
        this.draw()

        // move
        this.x += this.velocity.x
        this.y += this.velocity.y

        // bounce within the board
        if (this.x < r || this.x > canvas.width - r) this.velocity.x *= -1
        if (this.y < r || this.y > canvas.height - r) this.velocity.y *= -1

        // collision
        for (let i = 0; i < particles.length; i++) {
            // not compare with itself
            if (this === particles[i]) continue
            if (distance(this.x, this.y, particles[i].x, particles[i].y) - this.r * 2 < 0) {
                resolveCollision(this, particles[i])
                // this.r = this.r + .2
                particles[i].colour = '#ee5c5c'
            }
        }
    }

    this.draw = () => {
        context.beginPath()
        context.fillStyle = this.colour
        context.arc(this.x, this.y, this.r, 0, Math.PI * 2, false)
        context.fill()
        context.closePath()
        context.globalAlpha = this.opacity
    }
}

// create particles
let particles

function init() {
    particles = []

    for (let i = 0; i < 10; i++) {
        const r = 15
        let x = Math.random() * 500 + 300
        let y = Math.random() * 300 + 200
        let colour = '#333333'
        // const color = randomColor(colors)

        //check for overlap
        if (i !== 0) {
            for (let j = 0; j < particles.length; j++) {
                if (distance(x, y, particles[j].x, particles[j].y) - r * 2 < 0) {
                    x = randomIntFromRange(r, canvas.width - r)
                    y = randomIntFromRange(r, canvas.height - r)
                    // restart the loop
                    j = -1
                }
            }
        }

        particles.push(new Particle(x, y, r, colour))
    }
    // console.log(particles)
}

const animate = () => {
    requestAnimationFrame(animate)

    if (!checkboxLeaveTrace.checked) {
        context.clearRect(0, 0, canvas.width, canvas.height)
    }

    // B O X
    if (movementType === 'random') {
        boxOne.update()
    }

    // P A R T I C L E S
    if (movementType === 'particles') {
        particles.forEach(particle => {
            particle.update(particles)
        })
    }
}

init()
animate()