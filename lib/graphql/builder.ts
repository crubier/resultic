import SchemaBuilder from "@pothos/core";
import { PrismaClient } from "@prisma/client";
import PrismaPlugin from "@pothos/plugin-prisma";
import RelayPlugin from "@pothos/plugin-relay";
import ErrorsPlugin from "@pothos/plugin-errors";
import type PrismaTypes from "@pothos/plugin-prisma/generated";
import { Context } from "./types";

const prisma = new PrismaClient();

export const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
  Context: Context;
}>({
  plugins: [ErrorsPlugin, RelayPlugin, PrismaPlugin],
  prisma: {
    client: prisma,
  },
  errorOptions: {
    defaultTypes: [Error],
  },
  relayOptions: {
    // These will become the defaults in the next major version
    clientMutationId: "omit",
    cursorType: "String",
  },
});
