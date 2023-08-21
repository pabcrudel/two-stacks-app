#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import CreationStack from '../lib/creation-stack';
import DeploymentStack from '../lib/deployment-stack';

const projectName = 'TwoStacksApp';

const app = new cdk.App();
const resources = new CreationStack(app, `${projectName}-CreationStack`, {projectName});

new DeploymentStack(app, `${projectName}-DeploymentStack`, {
    s3HostingBucket: resources.s3HostingBucket,
    cloudfrontDistribution: resources.cloudfrontDistribution
});