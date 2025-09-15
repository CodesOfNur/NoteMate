import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  dbCredentials: {
    url:'postgresql://AI_STUDY_MATERIAL_GENERATER_owner:F2bG6jLvVTNd@ep-old-poetry-a1896ylx.ap-southeast-1.aws.neon.tech/AI_STUDY_MATERIAL_GENERATER?sslmode=require'
  }
});
