import dynamic from "next/dynamic";

const GraphiQL = dynamic(() => import("@/components/graphiql"), {
  ssr: false,
  loading: ({ error }) => {
    if (error) throw error;
    return <div>Loading</div>;
  },
});

const GraphqlPlayground = () =>
  globalThis.location ? (
    <GraphiQL url={`${globalThis.location.origin}/api/graphql`} />
  ) : (
    "Loading"
  );

export default GraphqlPlayground;
