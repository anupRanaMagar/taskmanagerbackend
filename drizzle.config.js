import { defineConfig } from "drizzle-kit";
import { DATABASE_URL } from "./config";

const drizzleConfig = {
  schema: "drizzle/schema.js",
  out: "./migrations",
  dialect: "postgresql",

  dbCredentials: { url: DATABASE_URL },
};

export default defineConfig(drizzleConfig);
