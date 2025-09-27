import { serial, pgTable, varchar, boolean, json, integer, text } from "drizzle-orm/pg-core";

// Define the schema for the users table
// This schema will be used to create the table in the database
export const USER_TABLE = pgTable('users', {
  id: serial().primaryKey(),
  name: varchar().notNull(),
  email: varchar().notNull(),
  isMember: boolean().default(false),
});
// here i use implicitly import from drizzle-orm/pg-core

export const STUDY_MATERIAL_TABLE = pgTable('study_materials', {
  id: serial().primaryKey(),
  courseId: varchar().notNull(),
  courseType: varchar().notNull(),
  topic: varchar().notNull(),
  difficultyLevel: varchar().default('Easy'),
  courseLayout: json(),
  createdBy: varchar().notNull(),
  status: varchar().default('Generating'),
   
});

export const CHAPTER_NOTES_TABLE = pgTable('chapterNotes',{
  id: serial().primaryKey(),
  courseId: varchar().notNull(),
  chapterId: integer().notNull(),
  notes: text()
})