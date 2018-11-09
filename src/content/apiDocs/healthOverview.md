## Overview

VA’s Health Information APIs support industry standards (e.g., FHIR) and provide access to healthcare data via an EHR-agnostic RESTful web services abstraction layer. 

The application of this technology means our Veterans can use third-party digital tools to do things like view their medical records, schedule an appointment, verify their Veteran status, find a specialty facility -- all without having to log on to a VA-specific tool or leave the third-party website/app.

### Path to Production for Health API Clients

#### Background

The API Management program is moving VA towards an API-first digital enterprise, which will establish the next generation open management platform for Veterans and accelerate transformation in VA's core functions in Health, Benefits, Burials and Memorials. This platform will be a system for designing, developing, publishing, operating, monitoring, analyzing, iterating and optimizing VA’s API ecosystem. We are in the alpha stage of the project, wherein we provide access to APIs enabling parties external to VA to develop applications that access health records on behalf of Veterans.

#### Overview

VA’s Health APIs allow a user/application, using the Argonaut Alpha API, to make queries that will return health records stored in a synthetic Veteran health database in a Fast Healthcare Interoperable Resources (FHIR) format, without interacting with or understanding the inner workings of VA systems.

The database is being populated with synthetic Veteran data by MITRE Corporation (currently over 7,000 synthetic patients). When complete, the data will contain thousands of sample Veteran health records (both living and deceased) that mimics real Veteran demographics. The associated clinical resources include data generated from disease models covering up to a dozen of the most common Veteran afflictions (e.g., type 2 diabetes, chronic kidney disease, hypertension, prostate cancer, colorectal cancer, PTSD, etc.).

#### Sample Applications

Sample data can be seen at https://department-of-veterans-affairs.github.io/vets-contrib/#/explore/health/docs/argonaut.

#### Development API Access

Access to the API Production environment will be coming soon. In the meantime, please follow the steps below to access the Health APIs via the development environment.

Users/applications must register with Okta for OAuth tokens [here](http://portal.lighthouse.vaftl.us/), which allows API/resource authorization. This is required for SMART on FHIR compliance. Okta authentication will be accessed via this portal.

1.    Choose the Register option from the portal home page to establish a portal account.  After registering, users need to only Sign-In on future portal visits.
1.    To use the Try It function for an API resource, you will need to satisfy the authorization requirements for the subscribed API. All APIs require an OAuth bearer token. Select any of the resources for the API and you will see a red circle with an exclamation on the right side. Click that circle to open the Available authorizations pop-up.
1.    To get the required token, the user selects the Okta authentication button on the top-right of the page (close/cancel the Available authorizations pop-up temporarily to select the button). If the user has already registered for an Okta account, they can select applicable OAuth scopes and then click Submit. They will be redirected to an Okta login page and will receive an access token after entering their account credentials . The user should copy this token into their buffer. On the Available authorizations pop-up (access via circle with exclamation mark) in the value field, the user should type Bearer and then paste the token from Okta. Then select Authorize. <br /><br />
      If the user does NOT already have an Okta developer account, select the Register for Okta Account link to set up an account prior to requesting a token. This account registration will require the user to provide their email after which they will receive a Welcome to Okta email with an Activate Okta Account link. The user should select the link and then proceed to complete the account registration process (set password, set-up password recovery, choose/set-up MFA, etc.). Upon completion of this process, the developer will be able to request OAuth tokens as outlined above.
1.    Once a successful Try it has been executed, valid curl and Request URL commands are provided and can be used outside of the portal (until the access token expires, if applicable).

When the user registered for an Okta account via the portal, Okta also registered an initial developer application and assigned a client ID and secret for that application. To access your client ID/secret and review/update OAuth2 settings, follow these steps:

1.    Log onto VA Okta Preview (https://va.oktapreview.com) with the information provided in the portal when you created your Okta account. You will be on a page with a box for Return to Lighthouse and Manage Your App.
1.    On the upper right of the page, you will see an Admin button. Select it. You will now be on a Dashboard page.
1.    On the upper right of the page, you will see an My applications link. Select the link. You will now be on a page with a Manage you App option.
1.    Selecting Manage Your App will send you to an Applications page and you will see the application that was automatically created for you with a name of the form DEV – [your email] – [your app client ID]
1.    Select the link associated with your app and you will be sent to a page with the details for managing your application.
1.    Select the General tab and you will see General Settings and Client Credentials information.
1.    By editing General Settings you can configure grant types as well as specify re-directs (login, logout) associated with your application.
1.    Under Client Credentials you can copy your client ID and/or secret to the clipboard. If you edit Client Credentials, you can generate a new secret for your application.

##### What is the criteria to be considered for Development API access?

When you register with the portal, a valid e-mail address and password are required.

When registering with Okta for access tokens, a valid e-mail address (users will receive an email at the address provided and a link to complete the registration process), phone number for 2FA and a URL for the application are required.

##### What happens after I am approved?

Once registered, the user/application will have access to the portal. From the portal, users will be able to use the Okta Authentication button to select desired OAuth scopes, provide credentials, and receive access tokens which can be used to execute the portal’s “Try It” capability.

In addition, by accessing the Okta website directly, developers can access the client ID/secret that was assigned to them when registering. This can be used by the developer to integrate the Okta authentication and token endpoints directly into their applications along with the Argonaut Alpha API calls.

#### Developer Guidelines

Below are guidelines you should follow to be successful in your VA API integration.

##### Data Refresh

The APIs accessed via the Development environment are using the same underlying logic as VA’s production APIs; only the underlying data store is different.  

##### Usage

API usage is not restricted within the Development environment.

