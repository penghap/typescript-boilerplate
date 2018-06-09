import * as http from "http";
import * as express from "express";

async function main() {
    const port = process.env.PORT || 5000;
    const app = express();
    const server = http.createServer(app);

    app.get('/', (req, res) => res.json({hey: 1}));
    server.listen(port, () => {
        console.info("##################################");
        console.info(`#### server started listening on http://localhost:${port} `);
        console.info("##################################");
    });
}

main().catch(e => {
    console.error(e);
    process.exit(1);
});
