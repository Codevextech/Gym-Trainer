import { z } from 'zod';
import { 
  insertUserSchema, insertProgramSchema, insertMembershipSchema, 
  insertWorkoutPlanSchema, insertDietPlanSchema, insertBlogSchema, 
  insertMessageSchema, insertGallerySchema,
  users, programs, memberships, workoutPlans, dietPlans, blogs, messages, gallery
} from './schema';

export const errorSchemas = {
  validation: z.object({ message: z.string(), field: z.string().optional() }),
  notFound: z.object({ message: z.string() }),
  internal: z.object({ message: z.string() }),
  unauthorized: z.object({ message: z.string() }),
};

export const api = {
  auth: {
    login: {
      method: 'POST' as const,
      path: '/api/login' as const,
      input: z.object({ username: z.string(), password: z.string() }),
      responses: {
        200: z.custom<typeof users.$inferSelect>(),
        401: errorSchemas.unauthorized,
      },
    },
    register: {
      method: 'POST' as const,
      path: '/api/register' as const,
      input: z.object({ username: z.string(), password: z.string() }),
      responses: {
        201: z.custom<typeof users.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    logout: {
      method: 'POST' as const,
      path: '/api/logout' as const,
      responses: {
        200: z.object({ message: z.string() }),
      },
    },
    me: {
      method: 'GET' as const,
      path: '/api/me' as const,
      responses: {
        200: z.custom<typeof users.$inferSelect>(),
        401: errorSchemas.unauthorized,
      },
    },
  },
  programs: {
    list: {
      method: 'GET' as const,
      path: '/api/programs' as const,
      responses: { 200: z.array(z.custom<typeof programs.$inferSelect>()) },
    },
    create: {
      method: 'POST' as const,
      path: '/api/programs' as const,
      input: insertProgramSchema,
      responses: { 201: z.custom<typeof programs.$inferSelect>() },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/programs/:id' as const,
      responses: { 204: z.void() },
    },
  },
  memberships: {
    list: {
      method: 'GET' as const,
      path: '/api/memberships' as const,
      responses: { 200: z.array(z.custom<typeof memberships.$inferSelect>()) },
    },
    create: {
      method: 'POST' as const,
      path: '/api/memberships' as const,
      input: insertMembershipSchema,
      responses: { 201: z.custom<typeof memberships.$inferSelect>() },
    },
  },
  workoutPlans: {
    list: {
      method: 'GET' as const,
      path: '/api/workout-plans' as const,
      responses: { 200: z.array(z.custom<typeof workoutPlans.$inferSelect>()) },
    },
    create: {
      method: 'POST' as const,
      path: '/api/workout-plans' as const,
      input: insertWorkoutPlanSchema,
      responses: { 201: z.custom<typeof workoutPlans.$inferSelect>() },
    },
  },
  dietPlans: {
    list: {
      method: 'GET' as const,
      path: '/api/diet-plans' as const,
      responses: { 200: z.array(z.custom<typeof dietPlans.$inferSelect>()) },
    },
    create: {
      method: 'POST' as const,
      path: '/api/diet-plans' as const,
      input: insertDietPlanSchema,
      responses: { 201: z.custom<typeof dietPlans.$inferSelect>() },
    },
  },
  blogs: {
    list: {
      method: 'GET' as const,
      path: '/api/blogs' as const,
      responses: { 200: z.array(z.custom<typeof blogs.$inferSelect>()) },
    },
    create: {
      method: 'POST' as const,
      path: '/api/blogs' as const,
      input: insertBlogSchema,
      responses: { 201: z.custom<typeof blogs.$inferSelect>() },
    },
  },
  messages: {
    list: {
      method: 'GET' as const,
      path: '/api/messages' as const,
      responses: { 200: z.array(z.custom<typeof messages.$inferSelect>()) },
    },
    create: {
      method: 'POST' as const,
      path: '/api/messages' as const,
      input: insertMessageSchema,
      responses: { 201: z.custom<typeof messages.$inferSelect>() },
    },
  },
  gallery: {
    list: {
      method: 'GET' as const,
      path: '/api/gallery' as const,
      responses: { 200: z.array(z.custom<typeof gallery.$inferSelect>()) },
    },
    create: {
      method: 'POST' as const,
      path: '/api/gallery' as const,
      input: insertGallerySchema,
      responses: { 201: z.custom<typeof gallery.$inferSelect>() },
    },
  },
  users: {
    list: {
      method: 'GET' as const,
      path: '/api/users' as const,
      responses: { 200: z.array(z.custom<typeof users.$inferSelect>()) },
    },
  },
  stats: {
    get: {
      method: 'GET' as const,
      path: '/api/stats' as const,
      responses: { 
        200: z.object({
          totalUsers: z.number(),
          totalPrograms: z.number(),
          totalMessages: z.number()
        })
      },
    }
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
