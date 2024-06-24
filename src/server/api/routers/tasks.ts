import { Priority, Status } from "@prisma/client";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { taskInput, updateInput } from "~/types";

export const tasksRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    const tasks = ctx.db.task.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        priority: true,
        deadline: true,
        createdBy: true,
        updatedBy: true,
        assignedTo: true,
        assignId: true,
        createdAt: true,
      },
      orderBy: {
        updatedAt: "desc"
      }
    });
    return tasks;
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
      const { title, description, status, priority, deadline, assignId } = input;

      return await ctx.db.task.create({
        data: {
          title,
          description,
          status: status as Status, // Cast 'status' to Status enum
          priority: priority as Priority, // Cast 'priority' to Priority enum
          deadline,
          createdById: ctx.session.user.id, // Include 'createdById'
          assignId, // Use 'assignId'
          updatedById: ctx.session.user.id, // Include 'updatedById'
        },
      });
    }),
  updateTask: protectedProcedure
    .input(updateInput)
    .mutation(({ ctx, input }) => {
      const { id, title, description, status, priority, deadline, assignId } = input;
      return ctx.db.task.update({
        where: {
          id: input.id,
        },
        data: {
          title,
          description,
          status: status as Status, // Cast 'status' to Status enum
          priority: priority as Priority, // Cast 'priority' to Priority enum
          deadline,
          assignId, // Use 'assignId'
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
