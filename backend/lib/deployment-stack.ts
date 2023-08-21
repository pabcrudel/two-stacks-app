import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import { Construct } from 'constructs';

interface DeploymentStackProps extends cdk.StackProps { projectName: string, };

export default class DeploymentStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: DeploymentStackProps) {
        super(scope, id, props);

        const s3HostingBucket = s3.Bucket.fromBucketName(this, 'ImportedBucket',
            cdk.Fn.importValue(`${props.projectName}-S3BucketName`)
        );

        const cloudfrontDistribution = cloudfront.CloudFrontWebDistribution.fromDistributionAttributes(this, 'ImportedCloudFrontDistribution', {
            domainName: cdk.Fn.importValue(`${props.projectName}-CloudFrontDomainName`),
            distributionId: cdk.Fn.importValue(`${props.projectName}-CloudFrontDistributionId`)
        });

        new s3deploy.BucketDeployment(this, 'BucketDeployment', {
            sources: [s3deploy.Source.asset('../frontend/dist')],
            destinationBucket: s3HostingBucket,
            distribution: cloudfrontDistribution,
            distributionPaths: ['/index.html'],
        });
    };
};