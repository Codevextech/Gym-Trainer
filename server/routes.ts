import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

// Seed Database
async function seedDatabase() {
  try {
    const existingPrograms = await storage.getPrograms();
    if (existingPrograms.length === 0) {
      await storage.createProgram({
        title: "Weight Loss Program",
        description: "Lose weight fast and build stamina with our intense cardio and diet plan.",
        price: "$49/month",
        type: "weight_loss",
      });
      await storage.createProgram({
        title: "Muscle Gain",
        description: "Build muscle mass with our heavy lifting routines.",
        price: "$59/month",
        type: "muscle_gain",
      });
    }

    const existingBlogs = await storage.getBlogs();
    if (existingBlogs.length === 0) {
      await storage.createBlog({
        title: "Top 5 Foods for Muscle Gain",
        content: "Eating right is 80% of the work. Here are the top 5 foods...",
      });
      await storage.createBlog({
        title: "How to stay motivated",
        content: "It can be tough to hit the gym everyday. Try these tips...",
      });
    }
    
    // Check if admin user exists
    const admin = await storage.getUserByUsername("admin");
    if (!admin) {
      await storage.createUser({
        username: "admin",
        password: "password123", // In a real app we would hash this
        role: "admin",
        name: "Admin Coach",
      });
    }
  } catch (err) {
    console.error("Seed DB error:", err);
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // Seed DB on start
  seedDatabase();

  // Basic mock auth routes (using session if passport was set up, here just setting a cookie/session manually or returning user)
  // For a full implementation you would integrate express-session + passport
  app.post(api.auth.login.path, async (req, res) => {
    try {
      const input = api.auth.login.input.parse(req.body);
      const user = await storage.getUserByUsername(input.username);
      if (!user || user.password !== input.password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      res.json(user);
    } catch (e) {
      res.status(400).json({ message: "Invalid request" });
    }
  });

  app.post(api.auth.register.path, async (req, res) => {
    try {
      const input = api.auth.register.input.parse(req.body);
      const existing = await storage.getUserByUsername(input.username);
      if (existing) {
        return res.status(400).json({ message: "Username already exists" });
      }
      const user = await storage.createUser({ ...input, role: "user" });
      res.status(201).json(user);
    } catch (e) {
      if (e instanceof z.ZodError) {
        return res.status(400).json({ message: e.errors[0].message, field: e.errors[0].path.join('.') });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post(api.auth.logout.path, (req, res) => {
    res.json({ message: "Logged out" });
  });

  app.get(api.auth.me.path, async (req, res) => {
    // Mock user for now, as no session middleware is active
    return res.status(401).json({ message: "Not logged in" });
  });

  // Programs
  app.get(api.programs.list.path, async (req, res) => {
    const programs = await storage.getPrograms();
    res.json(programs);
  });

  app.post(api.programs.create.path, async (req, res) => {
    try {
      const input = api.programs.create.input.parse(req.body);
      const program = await storage.createProgram(input);
      res.status(201).json(program);
    } catch (e) {
      res.status(400).json({ message: "Invalid request" });
    }
  });

  app.delete(api.programs.delete.path, async (req, res) => {
    const id = parseInt(req.params.id);
    await storage.deleteProgram(id);
    res.status(204).end();
  });

  // Memberships
  app.get(api.memberships.list.path, async (req, res) => {
    const items = await storage.getMemberships();
    res.json(items);
  });

  app.post(api.memberships.create.path, async (req, res) => {
    try {
      // Coerce userId to number since it's an integer in the DB
      const bodySchema = api.memberships.create.input.extend({
        userId: z.coerce.number()
      });
      const input = bodySchema.parse(req.body);
      const membership = await storage.createMembership(input);
      res.status(201).json(membership);
    } catch (e) {
      res.status(400).json({ message: "Invalid request" });
    }
  });

  // Workout Plans
  app.get(api.workoutPlans.list.path, async (req, res) => {
    const items = await storage.getWorkoutPlans();
    res.json(items);
  });

  app.post(api.workoutPlans.create.path, async (req, res) => {
    try {
      const bodySchema = api.workoutPlans.create.input.extend({
        userId: z.coerce.number()
      });
      const input = bodySchema.parse(req.body);
      const plan = await storage.createWorkoutPlan(input);
      res.status(201).json(plan);
    } catch (e) {
      res.status(400).json({ message: "Invalid request" });
    }
  });

  // Diet Plans
  app.get(api.dietPlans.list.path, async (req, res) => {
    const items = await storage.getDietPlans();
    res.json(items);
  });

  app.post(api.dietPlans.create.path, async (req, res) => {
    try {
      const bodySchema = api.dietPlans.create.input.extend({
        userId: z.coerce.number()
      });
      const input = bodySchema.parse(req.body);
      const plan = await storage.createDietPlan(input);
      res.status(201).json(plan);
    } catch (e) {
      res.status(400).json({ message: "Invalid request" });
    }
  });

  // Blogs
  app.get(api.blogs.list.path, async (req, res) => {
    const items = await storage.getBlogs();
    res.json(items);
  });

  app.post(api.blogs.create.path, async (req, res) => {
    try {
      const input = api.blogs.create.input.parse(req.body);
      const blog = await storage.createBlog(input);
      res.status(201).json(blog);
    } catch (e) {
      res.status(400).json({ message: "Invalid request" });
    }
  });

  // Messages
  app.get(api.messages.list.path, async (req, res) => {
    const items = await storage.getMessages();
    res.json(items);
  });

  app.post(api.messages.create.path, async (req, res) => {
    try {
      const input = api.messages.create.input.parse(req.body);
      const msg = await storage.createMessage(input);
      res.status(201).json(msg);
    } catch (e) {
      res.status(400).json({ message: "Invalid request" });
    }
  });

  // Gallery
  app.get(api.gallery.list.path, async (req, res) => {
    const items = await storage.getGallery();
    res.json(items);
  });

  app.post(api.gallery.create.path, async (req, res) => {
    try {
      const input = api.gallery.create.input.parse(req.body);
      const img = await storage.createGalleryImage(input);
      res.status(201).json(img);
    } catch (e) {
      res.status(400).json({ message: "Invalid request" });
    }
  });

  // Users
  app.get(api.users.list.path, async (req, res) => {
    const items = await storage.getUsers();
    res.json(items);
  });

  // Stats
  app.get(api.stats.get.path, async (req, res) => {
    const totalUsers = await storage.getUserCount();
    const totalPrograms = await storage.getProgramCount();
    const totalMessages = await storage.getMessageCount();
    
    res.json({
      totalUsers,
      totalPrograms,
      totalMessages
    });
  });

  return httpServer;
}
