## Overview

VA’s Health Information APIs support industry standards (e.g., Fast Healthcare Interoperability Resources [FHIR]) and provide access to healthcare data via an EHR-agnostic RESTful web services abstraction layer. 

The application of this technology means our Veterans can use third-party digital tools to do things like view their medical records, schedule an appointment, verify their Veteran status, find a specialty facility -- all without having to log on to a VA-specific tool or leave the third-party website/app.

### Path to Production for Health API Clients

#### Background

The API Management program is moving VA towards an API-first digital enterprise, which will establish the next generation open management platform for Veterans and accelerate transformation in VA's core functions in Health, Benefits, Burials and Memorials. This platform will be a system for designing, developing, publishing, operating, monitoring, analyzing, iterating and optimizing VA’s API ecosystem. We are in the alpha stage of the project, wherein we provide access to APIs enabling parties external to VA to develop applications that access health records on behalf of Veterans.

#### Overview

VA’s Health APIs allow a user/application, using the Argonaut Alpha API, to make queries that will return health records stored in a synthetic Veteran health database in FHIR format, without interacting with or understanding the inner workings of VA systems.

The database is populated with synthetic Veteran data provided by MITRE Corporation. The data contains sample Veteran health records (both living and deceased) that mimic real Veteran demographics. The associated clinical resources include data generated from disease models covering up to a dozen of the most common Veteran afflictions. 

#### Development API Access

The Health APIs are developed using SMART on FHIR authentication, [refer to this guide.](http://hl7.org/fhir/smart-app-launch/)

VA uses token-based authentication. Clients must provide a token with each HTTP request as a header called apiKey. This token is issued by the VA. To receive a developer token to access this API in a test environment, [request access here.](https://developer.va.gov/apply)

##### What is the criteria to be considered for Development API access?

The following basic information should be provided:

- Your Name
- Email address
- Organization name

##### What happens after I am approved?

You will receive an email from the VA API team notifying you of approval. You will then receive a new Client ID and Secret for your application. The base URI for the Health API endpoint is: https://dev-api.va.gov/services/argonaut/v0/. Accordingly, the FHIR conformance statement can be retrieved from https://dev-api.va.gov/services/argonaut/v0/metadata. 

You will also be provided with a set of test accounts to use that will allow you to access specific synthetic data patient records. 

#### Developer Guidelines

Below are guidelines you should follow to be successful in your VA API integration.

##### Data Refresh

The APIs accessed via the Development environment are using the same underlying logic as VA’s production APIs; only the underlying data store is different. The synthetic data store is static and is not refreshed at the same intervals as production. 

##### Usage

API usage is not restricted within the Development environment.

