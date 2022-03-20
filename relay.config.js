module.exports = {
  src: './',
  artifactDirectory: 'generated/relay',
  schema: "generated/schema.graphql",
  language: 'typescript',
  exclude: ["**/node_modules/**", "**/.yarn/**", "**/.next/**", "**/__mocks__/**", "**/generated/**",],
}