"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getRandomNumByRange(range) {
    const random = Math.random();
    return random * 10 % range;
}
exports.getRandomNumByRange = getRandomNumByRange;
function setStyles(target, styles) {
    for (const property in styles) {
        target.style[property] = styles[property];
    }
}
exports.setStyles = setStyles;
