import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { todoRouter } from "../../../server/routers/todo";

/**
 * The main tRPC router.
 *
 * Merges together all of the application's tRPC sub-routers from the `server/routers` directory.
 */
export const appRouter = trpc.router().merge("todo.", todoRouter);

/** The type of the main tRPC router. */
export type AppRouter = typeof appRouter;

// Expose the main tRPC router, along with all the sub-routers it contains as a Next API route.
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
