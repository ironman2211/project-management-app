import { z } from "zod";
import { Status, Priority } from "@prisma/client"; // Adjust the import path

export const taskInput = z.object({
  title: z.string(),
  description: z.string(),
  status: z.enum(Object.values(Status) as [string, ...string[]]), // Validate 'status' as enum
  priority: z.enum(Object.values(Priority) as [string, ...string[]]), // Validate 'priority' as enum
  deadline: z.date(),
  assignId: z.string(),
});

export const updateInput = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  status: z.enum(Object.values(Status) as [string, ...string[]]), // Validate 'status' as enum
  priority: z.enum(Object.values(Priority) as [string, ...string[]]), // Validate 'priority' as enum
  deadline: z.date(),
  assignId: z.string(),
})
