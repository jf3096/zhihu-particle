"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
class Atom {
    constructor({ canvas, context, color, velocity }) {
        this.getRadius = (() => {
            let radius;
            return () => {
                if (!radius) {
                    radius = utils_1.getRandomNumByRange(20) + 5;
                }
                return radius;
            };
        })();
        this.canvas = canvas;
        this.context = context;
        this.color = color;
        const { width, height } = canvas;
        this.x = Math.floor(Math.random() * width);
        this.y = Math.floor(Math.random() * height);
        this.velocity = {
            x: (Math.random() - 0.5) * velocity,
            y: (Math.random() - 0.5) * velocity
        };
    }
    update() {
        const { x, y, canvas, velocity } = this;
        const { width, height } = canvas;
        if (x > width + 20 || x < -20) {
            velocity.x = -velocity.x;
        }
        if (y > height + 20 || y < -20) {
            velocity.y = -velocity.y;
        }
        this.x += velocity.x;
        this.y += velocity.y;
    }
    draw() {
        const { context, color, x, y } = this;
        context.beginPath();
        context.fillStyle = color;
        context.globalAlpha = .7;
        const radius = this.getRadius();
        context.arc(x, y, radius, 0, 2 * Math.PI);
        context.fill();
    }
}
exports.default = Atom;
