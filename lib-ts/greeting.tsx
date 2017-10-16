import * as preact from "preact";

/**
 * This module will be hot-reloaded and rendered upon modification
 */
export class Greeting extends preact.Component<{ val: number }, {}> {
    render() {
        return <p>Greeting! with number = {this.props.val}</p>;
    }
}

interface TimerConsumer {
    timerText: string;
}

export function TimerText(props: TimerConsumer) {
    return <p>{props.timerText}</p>;
}

export class WithTimer1<C extends preact.Component<A1 & TimerConsumer, A2>, A1, A2>
    extends preact.Component<{ child: JSX.Element }, { timer: NodeJS.Timer; started: Date; now: Date; }> {

    componentWillMount() {
        const started = new Date;
        this.setState({
            started,
            now: started,
            timer: setInterval(() => {
                let now = new Date;
                this.setState({
                    now
                });
            }, 0.5e3),
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    render() {
        const c1 = this.props.child;
        if (c1 && c1 instanceof /* VNode actually */ Object) {
            const attributes = c1.attributes = c1.attributes || {};
            attributes["timerText"] = `${this.state.started} - ${this.state.now}`;
        }
        return c1;
    }
}