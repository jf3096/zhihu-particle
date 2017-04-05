"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var invariant = require("invariant");
var ParticleOption = (function () {
    function ParticleOption(_a) {
        var atomColor = _a.atomColor, interactive = _a.interactive, velocity = _a.velocity, density = _a.density;
        this.atomColor = atomColor || '#E4E5E6';
        this.interactive = interactive !== undefined && interactive;
        this.velocity = ParticleOption.setVelocity(velocity);
        this.density = ParticleOption.setDensity(density);
    }
    ParticleOption.setVelocity = function (velocity) {
        if (typeof velocity === "string" || velocity === undefined) {
            switch (velocity) {
                case "fast":
                    return 1;
                case "slow":
                    return .33;
                case "none":
                    return 0;
                case "medium":
                    return .66;
                default:
                    return .66;
            }
        }
        else if (typeof velocity === "number") {
            if (velocity < 0 || velocity > 1) {
                invariant(false, "velocity is invalid. expect velocity to be either VelocityStringType or number which is between 0~1 (inclusive)");
            }
            return velocity;
        }
        else {
            invariant(false, "velocity is invalid. expect velocity to be either VelocityStringType or number which is between 0~1 (inclusive)");
        }
    };
    ParticleOption.setDensity = function (density) {
        if (typeof density === "string" || density === undefined) {
            switch (density) {
                case "high":
                    return 10000;
                case "low":
                    return 30000;
                case "medium":
                    return 20000;
                default:
                    return 20000;
            }
        }
        else if (typeof density === "number") {
            if (density < 1000 || density > 50000) {
                invariant(false, "density is invalid. expect density to be either DensityStringType or number which is between 1000~50000 (inclusive)");
            }
            return density;
        }
        invariant(false, "density is invalid. expect density to be either DensityStringType or number which is between 1000~50000 (inclusive)");
    };
    ;
    return ParticleOption;
}());
exports.default = ParticleOption;
