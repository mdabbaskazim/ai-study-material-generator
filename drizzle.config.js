import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  dbCredentials: {
    url:'postgresql://neondb_owner:npg_BD7sKeUXHQC3@ep-green-star-a1zsj587.ap-southeast-1.aws.neon.tech/AI-Study-Material-Gen?sslmode=require&channel_binding=require'
  }
});
