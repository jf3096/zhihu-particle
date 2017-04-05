"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getRandomNumByRange(range) {
    var random = Math.random();
    return random * 10 % range;
}
exports.getRandomNumByRange = getRandomNumByRange;
function setStyles(target, styles) {
    for (var property in styles) {
        target.style[property] = styles[property];
    }
}
exports.setStyles = setStyles;
