import "dotenv/config";
import { authjsHandler, authjsSessionMiddleware } from "./server/authjs-handler.js";

import { createTodoHandler } from "./server/create-todo-handler.js";
import { vikeHandler } from "./server/vike-handler.js";
import { Hono } from "hono";
import { createHandler, createMiddleware } from "@universal-middleware/hono";
import { dbMiddleware } from "./server/db-middleware.js";

const app = new Hono();

app.use(createMiddleware(dbMiddleware)());

app.use(createMiddleware(authjsSessionMiddleware)());

/**
 * Auth.js route
 * @link {@see https://authjs.dev/getting-started/installation}
 **/
app.use("/api/auth/**", createHandler(authjsHandler)());

app.post("/api/todo/create", createHandler(createTodoHandler)());

/**
 * Vike route
 *
 * @link {@see https://vike.dev}
 **/
app.all("*", createHandler(vikeHandler)());

export default app;
