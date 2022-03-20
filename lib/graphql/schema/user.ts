import { builder } from "../builder";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create an object type based on a prisma model
// without providing any custom type information
builder.prismaObject("User", {
  // findUnique is explained more below, and is
  // required to safely resolve queries in some edge cases
  findUnique: (user) => ({ id: user.id }),
  fields: (t) => ({
    // expose fields from the database
    id: t.exposeID("id"),
    email: t.exposeString("email" as "id"),
    name: t.exposeString("name" as "id"),
    accounts: t.relatedConnection("accounts", {
      cursor: "id",
      // We can define arguments like any other field
      args: {
        oldestFirst: t.arg.boolean(),
      },
      // Then we can generate our query conditions based on the arguments
      query: (args, context) => ({
        orderBy: {
          expires_at: args.oldestFirst ? "asc" : "desc",
        },
      }),
    }),
    // bio: t.string({
    //   // automatically load the bio from the profile
    //   // when this field is queried
    //   select: {
    //     profile: {
    //       select: {
    //         bio: true,
    //       },
    //     },
    //   },
    //   // user will be typed correctly to include the
    //   // selected fields from above
    //   resolve: (user) => user.profile.bio,
    // }),
    // // Load posts as list field.
    // posts: t.relation("posts", {
    //   args: {
    //     oldestFirst: t.arg.boolean(),
    //   },
    //   // Define custom query options that are applied when
    //   // loading the post relation
    //   query: (args, context) => ({
    //     orderBy: {
    //       createdAt: args.oldestFirst ? "asc" : "desc",
    //     },
    //   }),
    // }),
    // // creates relay connection that handles pagination
    // // using prisma's built in cursor based pagination
    // postsConnection: t.relatedConnection("posts", {
    //   cursor: "id",
    // }),
  }),
});

// // Create a relay node based a prisma model
// builder.prismaNode("Post", {
//   findUnique: (id) => ({ id }),
//   id: { resolve: (post) => post.id },
//   fields: (t) => ({
//     title: t.exposeString("title"),
//     author: t.relation("author"),
//   }),
// });

builder.queryType({
  fields: (t) => ({
    // Define a field that issues an optimized prisma query
    me: t.prismaField({
      type: "User",
      resolve: async (query, root, args, ctx, info) => {
        // console.log(ctx);
        return prisma.user.findUnique({
          // the `query` argument will add in `include`s or `select`s to
          // resolve as much of the request in a single query as possible
          ...query,
          rejectOnNotFound: true,
          where: { id: ctx.user.id },
        });
      },
    }),
  }),
});
