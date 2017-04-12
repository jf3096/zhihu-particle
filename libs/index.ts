import ParticleOption from './model/ParticleOption';
import {setStyles} from './utils';
import Atom from './model/Atom';
import debounce = require('lodash/debounce');

export interface IParticleProps extends ParticleOption {
}

export default class Particle {
    private canvasWrapper: HTMLElement;
    private canvas: HTMLCanvasElement;
    private option: IParticleProps;
    private atoms: Array<Atom>;

    public constructor(canvasWrapper: HTMLElement, option = {} as ParticleOption) {
        this.canvasWrapper = canvasWrapper;
        this.setHtmlElementSize(this.canvasWrapper);
        this.option = new ParticleOption(option);
        this.init();
    }

    private setHtmlElementSize(dom: HTMLElement) {
        dom[`size`] = {
            width: dom.offsetWidth,
            height: dom.offsetHeight,
        }
    }

    private getHtmlElementSize(dom: HTMLElement) {
        return dom[`size`];
    }

    private init() {
        const {interactive} = this.option;
        const canvas = this.getCanvas();
        this.canvasWrapper.appendChild(canvas);
        setStyles(canvas, {'z-index': '10', 'position': 'relative'});

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
        const atomsNum = canvas.width * canvas.height / (this.option.density as number);

        for (let i = 0; i < atomsNum; i++) {
            this.atoms.push(new Atom({canvas: this.canvas, context: this.getContext(), color: this.option.atomColor, velocity: this.option.velocity}));
        }

        interactive && this.addMouseEventListener();

        requestAnimationFrame(this.update.bind(this));
    }

    private getCanvas() {
        if (!this.canvas) {
            this.canvas = document.createElement('canvas');
        }
        return this.canvas;
    }

    private getContext = (() => {
        let context: CanvasRenderingContext2D = null;
        return (): CanvasRenderingContext2D => {
            if (!context) {
                context = this.getCanvas().getContext('2d');
            }
            return context;
        }
    })();

    private syncCanvasDivSize2Canvas() {
        const {width, height} = this.getHtmlElementSize(this.canvasWrapper);
        this.canvas.width = width;
        this.canvas.height = height;
    }

    private resizeEventListener() {
        window.addEventListener('resize', debounce(() => {
            const {width, height} = this.getHtmlElementSize(this.canvasWrapper);
            const {canvasWrapper} = this;
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

    private createMouseAtom(velocity = 0) {
        const {canvas, option} = this;
        const context = this.getContext();
        const {atomColor} = option;
        return new Atom({
            canvas, context, color: atomColor, velocity
        });
    }

    private addMouseEventListener() {
        const {atoms, option} = this;
        const canvas = this.getCanvas();
        let mouseAtom = this.createMouseAtom();
        atoms.push(mouseAtom);
        /**
         * whenever mouse move, as long as mouse is on canvas,
         * the follow function will be triggered
         */
        canvas.addEventListener('mousemove', function (e: MouseEvent) {
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
            const {velocity} = option;

            /**
             * update the velocity and then push it to the list
             */
            mouseAtom.velocity = {
                x: (Math.random() - 0.5) * (velocity as number),
                y: (Math.random() - 0.5) * (velocity as number)
            };

            this.atoms.push(mouseAtom);

            mouseAtom = this.createMouseAtom();

            this.atoms.push(mouseAtom);
        });
    }

    private update() {
        const context = this.getContext();
        const canvas = this.getCanvas();

        const {atoms, option:{velocity, atomColor}} = this;

        const {width, height} = canvas;

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

    private static drawConnections(atoms: Atom[], context: CanvasRenderingContext2D, index: number, atomColor: string) {
        for (let j = atoms.length - 1; j > index; j--) {
            const distance = Math.sqrt(
                Math.pow(atoms[index].x - atoms[j].x, 2)
                + Math.pow(atoms[index].y - atoms[j].y, 2)
            );
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