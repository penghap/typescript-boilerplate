import * as preact from 'preact';


declare const $$webpack_dev: boolean;

type HMRModule = typeof module & {
    hot?: {
        accept(dependencies: string[],
            callback: (updatedDependencies: any[]) => void): void
        accept(moduleName: string, callback: () => void): void
    }
}

import * as m from './m';
import { Greeting } from './greeting';

// Example of HMR: hot-reload './m' and show updated module in console
if ($$webpack_dev && (module as HMRModule).hot) {
    function l(...args: any[]) {
        console.log.apply(console, args);
    }

    l("configuring webpack HMR");
    l('m=', m);
    (module as HMRModule).hot.accept(["./m", "./greeting"], function () {
        console.log("accept handler", [].slice.call(arguments));
        l("m=", m);
        preact.render(<Greeting val={m.v} />, document.body);
    });
}
