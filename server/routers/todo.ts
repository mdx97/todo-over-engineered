import * as trpc from "@trpc/server";
import { z } from "zod";
import prisma from "../../utils/db";

/** The `todo` tRPC sub-router. */
export const todoRouter = trpc
  .router()

  // Creates a single TODO item.
  .mutation("createOne", {
    input: z.object({
      label: z.string(),
      description: z.string(),
    }),
    resolve({ input }) {
      return prisma.todo.create({ data: input });
    },
  })

  // Deletes a single TODO item.
  .mutation("deleteOne", {
    input: z.object({
      id: z.number(),
    }),
    resolve({ input }) {
      return prisma.todo.delete({ where: { ...input } });
    },
  })

  // Sets the completed field on the requested TODO item.
  .mutation("setCompleted", {
    input: z.object({
      id: z.number(),
      completed: z.boolean(),
    }),
    resolve({ input }) {
      return prisma.todo.update({
        where: { id: input.id },
        data: { completed: input.completed },
      });
    },
  })

  // Returns all TODO items.
  .query("list", {
    resolve() {
      return prisma.todo.findMany({ orderBy: { id: "asc" } });
    },
  });
