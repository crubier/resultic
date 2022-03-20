import { builder } from "../builder";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create an object type based on a prisma model
// without providing any custom type information
builder.prismaObject("Account", {
  // findUnique is explained more below, and is
  // required to safely resolve queries in some edge cases
  findUnique: (account) => ({ id: account.id }),
  fields: (t) => ({
    // expose fields from the database
    id: t.exposeID("id"),
    type: t.exposeID("type"),
    provider: t.exposeID("provider"),
    providerAccountId: t.exposeID("providerAccountId"),
    accounts: t.relation("user", {
      // We can define arguments like any other field
      args: {
        oldestFirst: t.arg.boolean(),
      },
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
    //   // account will be typed correctly to include the
    //   // selected fields from above
    //   resolve: (account) => account.profile.bio,
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

// builder.queryType({
//   fields: (t) => ({
//     // Define a field that issues an optimized prisma query
//     me: t.prismaField({
//       type: "account",
//       resolve: async (query, root, args, ctx, info) => {
//         // console.log(ctx);
//         return prisma.account.findUnique({
//           // the `query` argument will add in `include`s or `select`s to
//           // resolve as much of the request in a single query as possible
//           ...query,
//           rejectOnNotFound: true,
//           where: { id: ctx.account.id },
//         });
//       },
//     }),
//   }),
// });
