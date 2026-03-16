import { apiClient } from "./apiClient";
import type { User } from "@/types/user";

export const identityService = {
  getUsers: () => apiClient.get<User[]>("/api/users"),
  getUserById: (id: string) => apiClient.get<User>(`/api/users/${id}`),
};
