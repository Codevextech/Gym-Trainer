import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { parseWithLogging } from "./api-utils";
import { useToast } from "@/hooks/use-toast";

// PROGRAMS
export function usePrograms() {
  return useQuery({
    queryKey: [api.programs.list.path],
    queryFn: async () => {
      const res = await fetch(api.programs.list.path);
      if (!res.ok) throw new Error("Failed to fetch programs");
      return parseWithLogging(api.programs.list.responses[200], await res.json(), "programs.list");
    },
  });
}

export function useCreateProgram() {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch(api.programs.create.path, {
        method: api.programs.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create program");
      return parseWithLogging(api.programs.create.responses[201], await res.json(), "programs.create");
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [api.programs.list.path] });
      toast({ title: "Program created" });
    }
  });
}

export function useDeleteProgram() {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.programs.delete.path, { id });
      const res = await fetch(url, { method: api.programs.delete.method });
      if (!res.ok) throw new Error("Failed to delete program");
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [api.programs.list.path] });
      toast({ title: "Program deleted" });
    }
  });
}

// MEMBERSHIPS
export function useMemberships() {
  return useQuery({
    queryKey: [api.memberships.list.path],
    queryFn: async () => {
      const res = await fetch(api.memberships.list.path);
      if (!res.ok) throw new Error("Failed to fetch memberships");
      return parseWithLogging(api.memberships.list.responses[200], await res.json(), "memberships.list");
    },
  });
}

export function useCreateMembership() {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch(api.memberships.create.path, {
        method: api.memberships.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create membership");
      return parseWithLogging(api.memberships.create.responses[201], await res.json(), "memberships.create");
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [api.memberships.list.path] });
      toast({ title: "Membership activated!", description: "Welcome to the elite club." });
    }
  });
}

// BLOGS
export function useBlogs() {
  return useQuery({
    queryKey: [api.blogs.list.path],
    queryFn: async () => {
      const res = await fetch(api.blogs.list.path);
      if (!res.ok) throw new Error("Failed to fetch blogs");
      return parseWithLogging(api.blogs.list.responses[200], await res.json(), "blogs.list");
    },
  });
}

export function useCreateBlog() {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch(api.blogs.create.path, {
        method: api.blogs.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create blog");
      return parseWithLogging(api.blogs.create.responses[201], await res.json(), "blogs.create");
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [api.blogs.list.path] });
      toast({ title: "Blog post published" });
    }
  });
}

// GALLERY
export function useGallery() {
  return useQuery({
    queryKey: [api.gallery.list.path],
    queryFn: async () => {
      const res = await fetch(api.gallery.list.path);
      if (!res.ok) throw new Error("Failed to fetch gallery");
      return parseWithLogging(api.gallery.list.responses[200], await res.json(), "gallery.list");
    },
  });
}

export function useCreateGallery() {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch(api.gallery.create.path, {
        method: api.gallery.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to add to gallery");
      return parseWithLogging(api.gallery.create.responses[201], await res.json(), "gallery.create");
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [api.gallery.list.path] });
      toast({ title: "Image added to gallery" });
    }
  });
}

// MESSAGES
export function useMessages() {
  return useQuery({
    queryKey: [api.messages.list.path],
    queryFn: async () => {
      const res = await fetch(api.messages.list.path);
      if (!res.ok) throw new Error("Failed to fetch messages");
      return parseWithLogging(api.messages.list.responses[200], await res.json(), "messages.list");
    },
  });
}

export function useCreateMessage() {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch(api.messages.create.path, {
        method: api.messages.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to send message");
      return parseWithLogging(api.messages.create.responses[201], await res.json(), "messages.create");
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [api.messages.list.path] });
      toast({ title: "Message Sent", description: "We will get back to you shortly." });
    }
  });
}

// USERS & STATS (ADMIN)
export function useUsers() {
  return useQuery({
    queryKey: [api.users.list.path],
    queryFn: async () => {
      const res = await fetch(api.users.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch users");
      return parseWithLogging(api.users.list.responses[200], await res.json(), "users.list");
    },
  });
}

export function useStats() {
  return useQuery({
    queryKey: [api.stats.get.path],
    queryFn: async () => {
      const res = await fetch(api.stats.get.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch stats");
      return parseWithLogging(api.stats.get.responses[200], await res.json(), "stats.get");
    },
  });
}
