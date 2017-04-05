export function getRandomNumByRange(range: number): number {
    const random = Math.random();
    return random * 10 % range;
}


export function setStyles(target: HTMLElement, styles) {
    for (const property in styles) {
        target.style[property] = styles[property];
    }
}