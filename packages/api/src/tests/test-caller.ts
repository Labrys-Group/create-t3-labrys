import type { createTRPCContext } from "../trpc";
import { appRouter } from "../root";
import { createCallerFactory } from "../trpc";

/**
 * Creates a caller that can be used to call tRPC procedures.
 *
 * @param opts - The context that is provided to tRPC
 * @returns A caller that can be used to call tRPC procedures
 */
export const makeTestCaller = (
  opts?: Omit<
    Awaited<ReturnType<typeof createTRPCContext>>,
    "session" | "token"
  >,
) => {
  const createCaller = createCallerFactory(appRouter);

  return createCaller({
    ...opts,
    auth: {},
  });
};

export const makeTestCallerWithSession = (
  opts?: Omit<
    Awaited<ReturnType<typeof createTRPCContext>>,
    "session" | "token"
  >,
) => {
  const createCaller = createCallerFactory(appRouter);

  return createCaller({
    ...opts,
    auth: {
      userId: "123",
    },
  });
};
