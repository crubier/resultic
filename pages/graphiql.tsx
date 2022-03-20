import dynamic from "next/dynamic";
import { Suspense } from "react";

const GraphiQL = dynamic(() => import("@/components/graphiql"), {
  ssr: false,
  suspense: true,
  // loading: ({ error }) => {
  //   if (error) throw error;
  //   return <div>Loading</div>;
  // },
});

const GraphqlPlayground = () => (
  <Suspense fallback="Loading">
    <GraphiQL url={`${globalThis.location.origin}/api/graphql`} />
  </Suspense>
);

export default GraphqlPlayground;
