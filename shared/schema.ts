import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(), // email
  password: text("password").notNull(),
  role: text("role").notNull().default("user"), // user, admin
  name: text("name"),
  membershipStatus: text("membership_status").default("none"),
  height: text("height"),
  weight: text("weight"),
});

export const programs = pgTable("programs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: text("price").notNull(),
  type: text("type").notNull(),
  imageUrl: text("image_url"),
});

export const memberships = pgTable("memberships", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  plan: text("plan").notNull(),
  status: text("status").notNull().default("active"),
  startDate: timestamp("start_date").defaultNow(),
  endDate: timestamp("end_date"),
});

export const workoutPlans = pgTable("workout_plans", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  details: text("details").notNull(),
  fileUrl: text("file_url"),
});

export const dietPlans = pgTable("diet_plans", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  details: text("details").notNull(),
  fileUrl: text("file_url"),
});

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  status: text("status").notNull().default("unread"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const gallery = pgTable("gallery", {
  id: serial("id").primaryKey(),
  imageUrl: text("image_url").notNull(),
  caption: text("caption"),
  category: text("category"), 
});

export const insertUserSchema = createInsertSchema(users).omit({ id: true });
export const insertProgramSchema = createInsertSchema(programs).omit({ id: true });
export const insertMembershipSchema = createInsertSchema(memberships).omit({ id: true, startDate: true, status: true });
export const insertWorkoutPlanSchema = createInsertSchema(workoutPlans).omit({ id: true });
export const insertDietPlanSchema = createInsertSchema(dietPlans).omit({ id: true });
export const insertBlogSchema = createInsertSchema(blogs).omit({ id: true, createdAt: true });
export const insertMessageSchema = createInsertSchema(messages).omit({ id: true, createdAt: true, status: true });
export const insertGallerySchema = createInsertSchema(gallery).omit({ id: true });

export type User = typeof users.$inferSelect;
export type Program = typeof programs.$inferSelect;
export type Membership = typeof memberships.$inferSelect;
export type WorkoutPlan = typeof workoutPlans.$inferSelect;
export type DietPlan = typeof dietPlans.$inferSelect;
export type Blog = typeof blogs.$inferSelect;
export type Message = typeof messages.$inferSelect;
export type Gallery = typeof gallery.$inferSelect;
