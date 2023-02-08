import * as Colyseus from "colyseus.js";

const client = new Colyseus.Client("ws://localhost:2567");

export { client };
