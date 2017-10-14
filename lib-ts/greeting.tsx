import * as preact from "preact";

/**
 * This module will be hot-reloaded and rendered upon modification
 */
export class Greeting extends preact.Component<{ val: number }, {}> {
    render() {
        return <p>Greeting! with number = {this.props.val}</p>;
    }
}
