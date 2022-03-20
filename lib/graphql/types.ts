import type { NextApiRequest } from "next";
import type { Session, User } from "next-auth";

export type Context = {
  session: Session;
  user: User;
  req: NextApiRequest;
};
