"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Entrypoint of a electron app
 *
 * Adapted from https://electron.atom.io/docs/tutorial/quick-start/
 *
 * changes:
 * - when webpack-dev-server is used, load it rather than filesystem for HMR
 * (NOTE: this entrypoint is not hot-loaded)
 *
 */
const electron_1 = require("electron");
const path = require("path");
const url = require("url");
const webpack_hmr_1 = require("./webpack-hmr");
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
function createWindow() {
    // Create the browser window.
    win = new electron_1.BrowserWindow({ width: 800, height: 600 });
    const staticURL = url.format({
        pathname: path.join(__dirname, "window1.html"),
        protocol: "file:",
        slashes: true
    });
    const hmrURL = "http://localhost:9000/window1.html";
    // and load the index.html of the app.
    win.loadURL(webpack_hmr_1.webpack_hmr ? hmrURL : staticURL);
    // Open the DevTools.
    win.webContents.openDevTools();
    // Emitted when the window is closed.
    win.on("closed", () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.on("ready", createWindow);
// Quit when all windows are closed.
electron_1.app.on("window-all-closed", () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
electron_1.app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});