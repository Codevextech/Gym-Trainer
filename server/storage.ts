import { db } from "./db";
import {
  users, programs, memberships, workoutPlans, dietPlans, blogs, messages, gallery,
  type User, type InsertUser,
  type Program, type InsertProgram,
  type Membership, type InsertMembership,
  type WorkoutPlan, type InsertWorkoutPlan,
  type DietPlan, type InsertDietPlan,
  type Blog, type InsertBlog,
  type Message, type InsertMessage,
  type Gallery, type InsertGallery
} from "@shared/schema";
import { eq, count } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getUsers(): Promise<User[]>;
  getUserCount(): Promise<number>;

  // Programs
  getPrograms(): Promise<Program[]>;
  createProgram(program: InsertProgram): Promise<Program>;
  deleteProgram(id: number): Promise<void>;
  getProgramCount(): Promise<number>;

  // Memberships
  getMemberships(): Promise<Membership[]>;
  createMembership(membership: InsertMembership): Promise<Membership>;

  // Workout Plans
  getWorkoutPlans(): Promise<WorkoutPlan[]>;
  createWorkoutPlan(plan: InsertWorkoutPlan): Promise<WorkoutPlan>;

  // Diet Plans
  getDietPlans(): Promise<DietPlan[]>;
  createDietPlan(plan: InsertDietPlan): Promise<DietPlan>;

  // Blogs
  getBlogs(): Promise<Blog[]>;
  createBlog(blog: InsertBlog): Promise<Blog>;

  // Messages
  getMessages(): Promise<Message[]>;
  createMessage(msg: InsertMessage): Promise<Message>;
  getMessageCount(): Promise<number>;

  // Gallery
  getGallery(): Promise<Gallery[]>;
  createGalleryImage(image: InsertGallery): Promise<Gallery>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getUsers(): Promise<User[]> {
    return await db.select().from(users);
  }

  async getUserCount(): Promise<number> {
    const [result] = await db.select({ value: count() }).from(users);
    return result.value;
  }

  async getPrograms(): Promise<Program[]> {
    return await db.select().from(programs);
  }

  async createProgram(insertProgram: InsertProgram): Promise<Program> {
    const [program] = await db.insert(programs).values(insertProgram).returning();
    return program;
  }

  async deleteProgram(id: number): Promise<void> {
    await db.delete(programs).where(eq(programs.id, id));
  }

  async getProgramCount(): Promise<number> {
    const [result] = await db.select({ value: count() }).from(programs);
    return result.value;
  }

  async getMemberships(): Promise<Membership[]> {
    return await db.select().from(memberships);
  }

  async createMembership(insertMembership: InsertMembership): Promise<Membership> {
    const [membership] = await db.insert(memberships).values(insertMembership).returning();
    return membership;
  }

  async getWorkoutPlans(): Promise<WorkoutPlan[]> {
    return await db.select().from(workoutPlans);
  }

  async createWorkoutPlan(plan: InsertWorkoutPlan): Promise<WorkoutPlan> {
    const [workoutPlan] = await db.insert(workoutPlans).values(plan).returning();
    return workoutPlan;
  }

  async getDietPlans(): Promise<DietPlan[]> {
    return await db.select().from(dietPlans);
  }

  async createDietPlan(plan: InsertDietPlan): Promise<DietPlan> {
    const [dietPlan] = await db.insert(dietPlans).values(plan).returning();
    return dietPlan;
  }

  async getBlogs(): Promise<Blog[]> {
    return await db.select().from(blogs);
  }

  async createBlog(insertBlog: InsertBlog): Promise<Blog> {
    const [blog] = await db.insert(blogs).values(insertBlog).returning();
    return blog;
  }

  async getMessages(): Promise<Message[]> {
    return await db.select().from(messages);
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const [message] = await db.insert(messages).values(insertMessage).returning();
    return message;
  }

  async getMessageCount(): Promise<number> {
    const [result] = await db.select({ value: count() }).from(messages);
    return result.value;
  }

  async getGallery(): Promise<Gallery[]> {
    return await db.select().from(gallery);
  }

  async createGalleryImage(insertGallery: InsertGallery): Promise<Gallery> {
    const [img] = await db.insert(gallery).values(insertGallery).returning();
    return img;
  }
}

export const storage = new DatabaseStorage();
