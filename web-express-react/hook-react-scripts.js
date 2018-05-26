/**
 * Hijack and add our own http handlers
 */
const lodash = require("lodash");
const path = require("path");
const Module = require("module");

const decorators = [
  {
    comment: "override webpack paths",
    decorator: (orig) => ({
      appIndexJs: path.join(__dirname, "src/index.tsx"),
      ... orig,
    }),
    id: "",
    name: "./paths",
  },
];

function hookRequire(then) {

  origRequire = Module.prototype.require;

  Module.prototype.require = function(name) {
    // console.log(this.id, Array.from(arguments));
    let required = origRequire.apply(this, arguments);

    for (const d of decorators) {
      if (this.id.endsWith(d.id) && name === d.name) {
        required = (d.decorator || lodash.identity)(required);
      }
    }

    return required;
  };

  // hook paths in react-scripts-ts/config/paths
  // hook(['../config/paths', 'paths', 'webpack-dev-server'], function(exports, name, basedir) {
  //   console.error('loading %s / %s', name, basedir);
  //   return exports;
  // });

  then();
}

hookRequire(() => {
  const [nodebin, scriptName, realScriptName, ...rest] = process.argv;
  const realScript = require.resolve(`react-scripts-ts/scripts/${realScriptName}`);
  process.argv = [nodebin, realScript, ...rest];
  require(realScript);
});
