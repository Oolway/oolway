import * as cloudfront from "aws-cdk-lib/aws-cloudfront"
import * as origins from "aws-cdk-lib/aws-cloudfront-origins"
import * as cdk from "aws-cdk-lib"
import * as s3 from "aws-cdk-lib/aws-s3"
import { Construct } from "constructs"

// 1. Define the Props (The inputs this component requires)
export interface CloudFrontCdnProps {
  originBucket: s3.Bucket
}

export class CloudFrontCdnConstruct extends Construct {
  constructor(scope: Construct, id: string, props: CloudFrontCdnProps) {
    super(scope, id)

    // 2. Create the CloudFront CDN
    const distribution = new cloudfront.Distribution(this, "AvatarsCDN", {
      defaultBehavior: {
        // We securely connect the CDN to the exact bucket passed in via props
        origin: new origins.S3Origin(props.originBucket),

        // Force all traffic to use HTTPS
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,

        // Use AWS's recommended caching settings for best performance
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
      },
    })

    // 3. Output the new CDN URL to the terminal
    new cdk.CfnOutput(this, "CloudFrontDomainName", {
      value: distribution.distributionDomainName,
    })
  }
}
