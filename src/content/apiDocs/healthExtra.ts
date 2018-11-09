export const extraBackground = `
VA deployed a Sandbox on our Future Technology Laboratory AWS asset. This Sandbox:

* Provides a portal to learn about and “try” VA health APIs
    * Based on swagger-ui with AWS SDK integration
    * Uses static AWS S3 front end and serverless (lambda) backend along with API Gateway, Cognito User Pool, and Dynamo DB (API Key to user mapping)
    * AWS API Gateway is used as a front-door to backend Mule runtimes
    * Backend APIs are deployed as AWS Elastic Container Service (ECS) instances (with Fargate)
    * Backend databases run on AWS RDS Cluster
    * Sandbox allows for tech stack experimentation while maintaining equivalent production API functionality
* Sandbox URL: http://portal.lighthouse.vaftl.us
* Getting Started: http://portal.lighthouse.vaftl.us/getting-started
* Register and then Sign-in to the portal.
* This creates an API Key for the developer (not used for SMART on FHIR API version)
* To subscribe to the API(s).
* Selecting the API allows the user to view API resources and associated documentation (models/examples).
* To “try” the APIs, need to provide applicable authorization (click red exclamation circle).
* Authorization via OAuth (SMART on FHIR) or API Key (separate APIs).
* “Okta Authentication” button allows selection of scopes and entering of Okta credentials to retrieve appropriate access token for cut/paste.
* Link to create Trusted Developer Okta account also provided.
* “Show API Key” button allows cut/paste of API Key into authorization field (as needed).
* Detailed information on test/synthetic patient IDs and/or other resource IDs provided on “Getting Started” page.
`;
