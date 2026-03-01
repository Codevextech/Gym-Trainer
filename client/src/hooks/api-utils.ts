import { z } from "zod";

export function parseWithLogging<T>(schema: z.ZodSchema<T>, data: unknown, label: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error(`[Zod] ${label} validation failed:`, result.error.format());
    // Fallback to raw data to prevent crashing if date coercion from JSON fails
    return data as T;
  }
  return result.data;
}
