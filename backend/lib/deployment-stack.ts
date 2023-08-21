import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import { Construct } from 'constructs';

interface DeploymentStackProps extends cdk.StackProps {
    s3HostingBucket: s3.IBucket,
    cloudfrontDistribution: cloudfront.IDistribution,
};

export default class DeploymentStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: DeploymentStackProps) {
        super(scope, id, props);

        new s3deploy.BucketDeployment(this, 'BucketDeployment', {
            sources: [s3deploy.Source.asset('../frontend/dist')],
            destinationBucket: props.s3HostingBucket,
            distribution: props.cloudfrontDistribution,
            distributionPaths: ['/index.html'],
        });
    };
};