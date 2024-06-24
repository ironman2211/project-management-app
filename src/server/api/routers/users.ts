import { Priority, Status } from "@prisma/client";
import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";


export const userRoutes = createTRPCRouter({

    getAllUserNameAndId: publicProcedure
        .query(async ({ ctx }) => {
            const users = await ctx.db.user.findMany({
                select: {
                    id: true,
                    name: true,
                },
            });
            return users;
        }),
    getUser: protectedProcedure
        .query(async ({ input, ctx }) => {
            const user = await ctx.db.user.findUnique({
                where: {
                    id: ctx.session.user.id,
                }
            });
            return user;
        }),
})