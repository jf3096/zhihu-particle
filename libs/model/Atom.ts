import {getRandomNumByRange} from '../utils';

export default class Atom {
    public canvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;
    public color: string;
    public x: number;
    public y: number;
    public velocity: {x, y};

    public constructor({canvas, context, color, velocity}) {
        this.canvas = canvas;
        this.context = context;
        this.color = color;

        const {width, height} = canvas;

        this.x = Math.floor(Math.random() * width);
        this.y = Math.floor(Math.random() * height);

        this.velocity = {
            x: (Math.random() - 0.5) * velocity,
            y: (Math.random() - 0.5) * velocity
        };
    }

    public update() {
        const {x, y, canvas, velocity} = this;
        const {width, height} = canvas;

        if (x > width + 20 || x < -20) {
            velocity.x = -velocity.x;
        }
        if (y > height + 20 || y < -20) {
            velocity.y = -velocity.y;
        }

        this.x += velocity.x;
        this.y += velocity.y;
    }

    private getRadius = (() => {
        let radius;
        return (): number => {
            if (!radius) {
                radius = getRandomNumByRange(20) + 5
            }
            return radius;
        }
    })();

    public draw() {
        const {context, color, x, y} = this;
        context.beginPath();
        context.fillStyle = color;
        context.globalAlpha = .7;
        const radius = this.getRadius();
        context.arc(x, y, radius, 0, 2 * Math.PI);
        context.fill();
    }
}