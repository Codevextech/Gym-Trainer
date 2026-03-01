import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { z } from "zod";

export function usePrograms() {
  return useQuery({
    queryKey: [api.programs.list.path],
    queryFn: async () => {
      const res = await fetch(api.programs.list.path);
      if (!res.ok) throw new Error("Failed to fetch programs");
      return api.programs.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreateProgram() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: typeof api.programs.create.input._type) => {
      const res = await fetch(api.programs.create.path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to create program");
      return api.programs.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.programs.list.path] });
    },
  });
}

export function useDeleteProgram() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.programs.delete.path, { id });
      const res = await fetch(url, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete program");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.programs.list.path] });
    },
  });
}
