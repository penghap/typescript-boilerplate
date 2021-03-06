import React from 'preact-compat';
import ReactDOM from 'preact-compat';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

function registerHMR() {
  type ModuleHMR = typeof module & {
    hot?: {
      accept(dependencies: string | string[], callback: (updatedDependencies: any[]) => void): void
    }
  };

  if ((module as ModuleHMR).hot) {
    (module as ModuleHMR).hot!.accept('./App', render);
  }
}

function render() {
  ReactDOM.render(
    <App />,
    document.getElementById('root') as HTMLElement
  );
}

registerHMR();
render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
