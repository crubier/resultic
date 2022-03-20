import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { execute, parse } from "graphql";
// import { captureException } from "@sentry/nextjs";

import { schema } from "@/lib/graphql/schema";
import { Context } from "@/lib/graphql/types";
import { DefaultUser, User } from "next-auth";

const maxRetries = 1;

const createContext = async ({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}): Promise<Context> => {
  const session = await getSession({ req });
  if (!session) {
    throw new Error("Unauthenticated, no session");
  }
  const user = session.user;
  if (!user) {
    throw new Error("Unauthenticated, no user");
  }
  if (!(user as DefaultUser).id) {
    throw new Error("Unauthenticated, no user id");
  }
  return { session, user: user as User, req };
};

const handleRequest: NextApiHandler = async (req, res) => {
  const { query, variables, operationName } = req.body;

  const documentAst = parse(query);

  let retries = 0;
  let error: Error | null = null;

  while (retries < maxRetries) {
    try {
      const graphqlResult = await execute({
        schema: schema,
        document: documentAst,
        variableValues: variables,
        operationName,
        contextValue: await createContext({ req, res }),
      });

      res
        .status((graphqlResult.errors?.length ?? 0) > 0 ? 400 : 200)
        .json(graphqlResult);

      return;
    } catch (e: any) {
      // await resetDatabase();
      retries += 1;
      error ??= error;
    }
  }

  console.error("Error while running graphql query", error);

  // captureException(error);

  res.status(400).json({ error });
};

export default handleRequest;

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};
