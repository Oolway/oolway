import * as cdk from "aws-cdk-lib"
import { Construct } from "constructs"
import { S3StorageConstruct } from "@/infra/constructs/s3-storage"
// import { CloudFrontCdnConstruct } from "@/infra/constructs/cloudfront-cdn" // Ready for later!

export class CoreInfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // Snap in the Storage Module
    const storage = new S3StorageConstruct(this, "StorageModule")

    /* LATER: When AWS verifies your account, you can snap in the CDN module
      and easily pass the storage bucket into it as a property:

      const cdn = new CloudFrontCdnConstruct(this, "CdnModule", {
        originBucket: storage.bucket 
      })
    */
  }
}
