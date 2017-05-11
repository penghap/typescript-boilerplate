"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const preact = require("preact");
/**
 * This module will be hot-reloaded and rendered upon modification
 */
class Greeting extends preact.Component {
    render() {
        return preact.h("p", null,
            "Greeting! with number = ",
            this.props.val);
    }
}
exports.Greeting = Greeting;
