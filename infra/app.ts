import * as cdk from "aws-cdk-lib"
import { CoreInfrastructureStack } from "./core-stack"

const app = new cdk.App()

// We use a dynamic suffix so your local dev stack doesn't clash with production later
const stage = process.env.NODE_ENV === "production" ? "Prod" : "Dev"

new CoreInfrastructureStack(app, `CoreInfrastructureStack-${stage}`, {
  /* If you don't specify 'env', this stack will be environment-agnostic.
     Account/Region-dependent features and context lookups will not work,
     but a single synthesized template can be deployed anywhere. */
  // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
})
