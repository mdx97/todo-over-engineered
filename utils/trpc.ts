import { createReactQueryHooks } from "@trpc/react";
import type { AppRouter } from "../pages/api/trpc/[trpc]";

/**
 * Creates an object that contains a set of `react-query` hooks in order to
 * communicate with tRPC.
 *
 * @example
 * import { trpc } from "../utils/trpc";
 *
 * function MyPage() {
 *   const foo = trpc.useQuery(["someQuery", { bar: 1 }]);
 *   // ...
 *   return (
 *     <div>Data: {foo.data}</div>
 *   );
 * }
 */
export const trpc = createReactQueryHooks<AppRouter>();
