import { Priority, Status } from "@prisma/client";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { taskInput } from "~/types";

export const tasksRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.task.findMany();
  }),
  getByTaskId: protectedProcedure
    .input(
      z.object({
        taskId: z.number(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.db.task.findFirst({
        where: {
          id: input.taskId,
        },
      });
    }),
  createTask: protectedProcedure
    .input(taskInput)
    .mutation(async ({ ctx, input }) => {
      const { title, description, status, priority, dueDate, createdById, assignId } = input;

      return await ctx.db.task.create({
        data: {
          title,
          description,
          status: status as Status, // Cast 'status' to Status enum
          priority: priority as Priority, // Cast 'priority' to Priority enum
          deadline: dueDate,
          createdById, // Use 'createdById'
          assignId, // Use 'assignId'
          updatedById: createdById, // Include 'updatedById'
        },
      });
    }),
  updateTask: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string(),
        description: z.string(),
        status: z.enum(Object.values(Status) as [string, ...string[]]), // Validate 'status' as enum
        priority: z.enum(Object.values(Priority) as [string, ...string[]]), // Validate 'priority' as enum
        dueDate: z.date(),
        assignId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.task.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          description: input.description,
          status: input.status as Status, // Cast 'status' to Status enum
          priority: input.priority as Priority, // Cast 'priority' to Priority enum
          deadline: input.dueDate,
          assignId: input.assignId, // Use 'assignId'
          updatedById: ctx.session.user.id, // Include 'updatedById'
        },
      });
    }),
  deleteTask: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.task.delete({
        where: {
          id: input.id,
        },
      });
    }), 
  
});
