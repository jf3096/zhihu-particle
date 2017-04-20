"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ParticleOption_1 = require("./model/ParticleOption");
const utils_1 = require("./utils");
const Atom_1 = require("./model/Atom");
const debounce = require("lodash/debounce");
class Particle {
    constructor(canvasWrapper, option = {}) {
        this.getContext = (() => {
            let context = null;
            return () => {
                if (!context) {
                    context = this.getCanvas().getContext('2d');
                }
                return context;
            };
        })();
        this.canvasWrapper = canvasWrapper;
        this.setHtmlElementSize(this.canvasWrapper);
        this.option = new ParticleOption_1.default(option);
        this.init();
    }
    setHtmlElementSize(dom) {
        dom[`size`] = {
            width: dom.offsetWidth,
            height: dom.offsetHeight,
        };
    }
    getHtmlElementSize(dom) {
        return dom[`size`];
    }
    init() {
        const { interactive } = this.option;
        const canvas = this.getCanvas();
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
        const atomsNum = canvas.width * canvas.height / this.option.density;
        for (let i = 0; i < atomsNum; i++) {
            this.atoms.push(new Atom_1.default({ canvas: this.canvas, context: this.getContext(), color: this.option.atomColor, velocity: this.option.velocity }));
        }
        interactive && this.addMouseEventListener();
        requestAnimationFrame(this.update.bind(this));
    }
    getCanvas() {
        if (!this.canvas) {
            this.canvas = document.createElement('canvas');
        }
        return this.canvas;
    }
    syncCanvasDivSize2Canvas() {
        const { width, height } = this.getHtmlElementSize(this.canvasWrapper);
        this.canvas.width = width;
        this.canvas.height = height;
    }
    resizeEventListener() {
        window.addEventListener('resize', debounce(() => {
            const { width, height } = this.getHtmlElementSize(this.canvasWrapper);
            const { canvasWrapper } = this;
            const canvas = this.getCanvas();
            /**
             * ensure the window resize has affected the size of canvas wrapper
             */
            if (canvasWrapper.offsetWidth === width && canvasWrapper.offsetHeight === height) {
                return false;
            }
            canvas.width = canvasWrapper.offsetWidth;
            canvas.height = canvasWrapper.offsetHeight;
        }, 100));
    }
    createMouseAtom(velocity = 0) {
        const { canvas, option } = this;
        const context = this.getContext();
        const { atomColor } = option;
        return new Atom_1.default({
            canvas, context, color: atomColor, velocity
        });
    }
    addMouseEventListener() {
        const { atoms, option } = this;
        const canvas = this.getCanvas();
        let mouseAtom = this.createMouseAtom();
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
        canvas.addEventListener('mouseup', () => {
            /**
             * create a new atom for mouse
             * @type {Atom}
             */
            const { velocity } = option;
            /**
             * update the velocity and then push it to the list
             */
            mouseAtom.velocity = {
                x: (Math.random() - 0.5) * velocity,
                y: (Math.random() - 0.5) * velocity
            };
            this.atoms.push(mouseAtom);
            mouseAtom = this.createMouseAtom();
            this.atoms.push(mouseAtom);
        });
    }
    update() {
        const context = this.getContext();
        const canvas = this.getCanvas();
        const { atoms, option: { velocity, atomColor } } = this;
        const { width, height } = canvas;
        context.clearRect(0, 0, width, height);
        context.globalAlpha = 1;
        /**
         * draw atoms
         */
        atoms.forEach((atom, index) => {
            atom.update();
            atom.draw();
            Particle.drawConnections(atoms, context, index, atomColor);
        });
        if (velocity !== 0) {
            requestAnimationFrame(this.update.bind(this));
        }
    }
    static drawConnections(atoms, context, index, atomColor) {
        for (let j = atoms.length - 1; j > index; j--) {
            const distance = Math.sqrt(Math.pow(atoms[index].x - atoms[j].x, 2)
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
    }
}
exports.default = Particle;
