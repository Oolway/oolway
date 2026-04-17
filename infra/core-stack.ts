import * as cdk from "aws-cdk-lib"
import * as s3 from "aws-cdk-lib/aws-s3"
import * as iam from "aws-cdk-lib/aws-iam" // Added this
import { Construct } from "constructs"

export class CoreInfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // 1. The Bucket
    const uploadsBucket = new s3.Bucket(this, "UserUploadsBucket", {
      cors: [
        {
          allowedMethods: [s3.HttpMethods.GET, s3.HttpMethods.PUT],
          allowedOrigins: ["*"],
          allowedHeaders: ["*"],
        },
      ],
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      publicReadAccess: true,
      blockPublicAccess: new s3.BlockPublicAccess({
        blockPublicAcls: false,
        blockPublicPolicy: false,
        ignorePublicAcls: false,
        restrictPublicBuckets: false,
      }),
    })

    // 2. The Restricted IAM User (The Employee)
    const appUser = new iam.User(this, "AppS3WorkerUser")

    // 3. Grant the User permission to this specific bucket
    uploadsBucket.grantReadWrite(appUser)

    // 4. Create Access Keys for this user
    const accessKey = new iam.AccessKey(this, "AppWorkerAccessKey", {
      user: appUser,
    })

    // 5. THE OUTPUTS (These will show up in your terminal)
    new cdk.CfnOutput(this, "S3BucketName", {
      value: uploadsBucket.bucketName,
    })

    new cdk.CfnOutput(this, "AppAccessKeyId", {
      value: accessKey.accessKeyId,
    })

    new cdk.CfnOutput(this, "AppSecretAccessKey", {
      value: accessKey.secretAccessKey.unsafeUnwrap(),
    })
  }
}
