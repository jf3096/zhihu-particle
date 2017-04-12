"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ParticleOption_1 = require("./model/ParticleOption");
var utils_1 = require("./utils");
var Atom_1 = require("./model/Atom");
var debounce = require("lodash/debounce");
var Particle = (function () {
    function Particle(canvasWrapper, option) {
        if (option === void 0) { option = {}; }
        var _this = this;
        this.getContext = (function () {
            var context = null;
            return function () {
                if (!context) {
                    context = _this.getCanvas().getContext('2d');
                }
                return context;
            };
        })();
        this.canvasWrapper = canvasWrapper;
        this.setHtmlElementSize(this.canvasWrapper);
        this.option = new ParticleOption_1.default(option);
        this.init();
    }
    Particle.prototype.setHtmlElementSize = function (dom) {
        dom["size"] = {
            width: dom.offsetWidth,
            height: dom.offsetHeight,
        };
    };
    Particle.prototype.getHtmlElementSize = function (dom) {
        return dom["size"];
    };
    Particle.prototype.init = function () {
        var interactive = this.option.interactive;
        var canvas = this.getCanvas();
        this.canvasWrapper.appendChild(canvas);
        utils_1.setStyles(canvas, { 'z-index': '10', 'position': 'relative' });
        this.resizeEventListener();
        /**
         * update the canvas size
         */
        this.syncCanvasDivSize2Canvas();
        /**
         * reset atoms
         */
        this.atoms = [];
        /**
         * calculate atom number. it depends on density option
         */
        var atomsNum = canvas.width * canvas.height / this.option.density;
        for (var i = 0; i < atomsNum; i++) {
            this.atoms.push(new Atom_1.default({ canvas: this.canvas, context: this.getContext(), color: this.option.atomColor, velocity: this.option.velocity }));
        }
        interactive && this.addMouseEventListener();
        requestAnimationFrame(this.update.bind(this));
    };
    Particle.prototype.getCanvas = function () {
        if (!this.canvas) {
            this.canvas = document.createElement('canvas');
        }
        return this.canvas;
    };
    Particle.prototype.syncCanvasDivSize2Canvas = function () {
        var _a = this.getHtmlElementSize(this.canvasWrapper), width = _a.width, height = _a.height;
        this.canvas.width = width;
        this.canvas.height = height;
    };
    Particle.prototype.resizeEventListener = function () {
        var _this = this;
        window.addEventListener('resize', debounce(function () {
            var _a = _this.getHtmlElementSize(_this.canvasWrapper), width = _a.width, height = _a.height;
            var canvasWrapper = _this.canvasWrapper;
            var canvas = _this.getCanvas();
            /**
             * ensure the window resize has affected the size of canvas wrapper
             */
            if (canvasWrapper.offsetWidth === width && canvasWrapper.offsetHeight === height) {
                return false;
            }
            canvas.width = canvasWrapper.offsetWidth;
            canvas.height = canvasWrapper.offsetHeight;
        }, 100));
    };
    Particle.prototype.createMouseAtom = function (velocity) {
        if (velocity === void 0) { velocity = 0; }
        var _a = this, canvas = _a.canvas, option = _a.option;
        var context = this.getContext();
        var atomColor = option.atomColor;
        return new Atom_1.default({
            canvas: canvas, context: context, color: atomColor, velocity: velocity
        });
    };
    Particle.prototype.addMouseEventListener = function () {
        var _this = this;
        var _a = this, atoms = _a.atoms, option = _a.option;
        var canvas = this.getCanvas();
        var mouseAtom = this.createMouseAtom();
        atoms.push(mouseAtom);
        /**
         * whenever mouse move, as long as mouse is on canvas,
         * the follow function will be triggered
         */
        canvas.addEventListener('mousemove', function (e) {
            /**
             * the canvas might have some offsetTop or offset left,
             * the e.clientX is relative to window.
             * Thus, e.clientX - offsetLeft is needed for mouseAtom
             */
            mouseAtom.x = e.clientX - canvas.offsetLeft;
            mouseAtom.y = e.clientY - canvas.offsetTop;
        });
        /**
         * whenever mouse up, as long as mouse is on canvas,
         * the follow function will be triggered
         */
        canvas.addEventListener('mouseup', function () {
            /**
             * create a new atom for mouse
             * @type {Atom}
             */
            var velocity = option.velocity;
            /**
             * update the velocity and then push it to the list
             */
            mouseAtom.velocity = {
                x: (Math.random() - 0.5) * velocity,
                y: (Math.random() - 0.5) * velocity
            };
            _this.atoms.push(mouseAtom);
            mouseAtom = _this.createMouseAtom();
            _this.atoms.push(mouseAtom);
        });
    };
    Particle.prototype.update = function () {
        var context = this.getContext();
        var canvas = this.getCanvas();
        var _a = this, atoms = _a.atoms, _b = _a.option, velocity = _b.velocity, atomColor = _b.atomColor;
        var width = canvas.width, height = canvas.height;
        context.clearRect(0, 0, width, height);
        context.globalAlpha = 1;
        /**
         * draw atoms
         */
        atoms.forEach(function (atom, index) {
            atom.update();
            atom.draw();
            Particle.drawConnections(atoms, context, index, atomColor);
        });
        if (velocity !== 0) {
            requestAnimationFrame(this.update.bind(this));
        }
    };
    Particle.drawConnections = function (atoms, context, index, atomColor) {
        for (var j = atoms.length - 1; j > index; j--) {
            var distance = Math.sqrt(Math.pow(atoms[index].x - atoms[j].x, 2)
                + Math.pow(atoms[index].y - atoms[j].y, 2));
            if (distance > 200) {
                continue;
            }
            context.beginPath();
            context.strokeStyle = atomColor;
            context.globalAlpha = (120 - distance) / 120;
            context.lineWidth = 0.7;
            context.moveTo(atoms[index].x, atoms[index].y);
            context.lineTo(atoms[j].x, atoms[j].y);
            context.stroke();
        }
    };
    return Particle;
}());
exports.default = Particle;
