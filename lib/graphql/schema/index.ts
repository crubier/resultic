// builder.queryType({
//   fields: (t) => ({
//     hello: t.string({
//       args: {
//         name: t.arg.string(),
//       },
//       resolve: (parent, { name }) => `hello, ${name || "World"}`,
//     }),
//   }),
// });
import { builder } from "../builder";

import "./error";
import "./user";
import "./account";

export const schema = builder.toSchema({});
