"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var Atom = (function () {
    function Atom(_a) {
        var canvas = _a.canvas, context = _a.context, color = _a.color, velocity = _a.velocity;
        this.getRadius = (function () {
            var radius;
            return function () {
                if (!radius) {
                    radius = utils_1.getRandomNumByRange(20) + 5;
                }
                return radius;
            };
        })();
        this.canvas = canvas;
        this.context = context;
        this.color = color;
        var width = canvas.width, height = canvas.height;
        this.x = Math.floor(Math.random() * width);
        this.y = Math.floor(Math.random() * height);
        this.velocity = {
            x: (Math.random() - 0.5) * velocity,
            y: (Math.random() - 0.5) * velocity
        };
    }
    Atom.prototype.update = function () {
        var _a = this, x = _a.x, y = _a.y, canvas = _a.canvas, velocity = _a.velocity;
        var width = canvas.width, height = canvas.height;
        if (x > width + 20 || x < -20) {
            velocity.x = -velocity.x;
        }
        if (y > height + 20 || y < -20) {
            velocity.y = -velocity.y;
        }
        this.x += velocity.x;
        this.y += velocity.y;
    };
    Atom.prototype.draw = function () {
        var _a = this, context = _a.context, color = _a.color, x = _a.x, y = _a.y;
        context.beginPath();
        context.fillStyle = color;
        context.globalAlpha = .7;
        var radius = this.getRadius();
        context.arc(x, y, radius, 0, 2 * Math.PI);
        context.fill();
    };
    return Atom;
}());
exports.default = Atom;
