/**
 * This test suite tests a subset of the curl form's functionality. Specifically, it tests
 * OpenAPI Spec v3 specs, not v2, and it does not test whether or not the spec meets the curl
 * form's requirements.
 */

/* eslint-disable max-lines -- exception for test suite */
import '@testing-library/jest-dom/extend-expect';
import {
  findByRole,
  findByText,
  fireEvent,
  getAllByRole,
  getByRole,
  getByText,
  render,
  screen,
} from '@testing-library/react';
import SwaggerUI from 'swagger-ui';
import * as React from 'react';
import * as decisionReviews from '../../../__mocks__/openAPIData/decisionReviews.test.json';
import * as fhirR4 from '../../../__mocks__/openAPIData/fhirR4.test.json';
import { SwaggerPlugins, System } from './index';

/**
 * some tests in this file are long-running because of the expense of rendering Swagger UI,
 * so we double the timeout to 10s from the default 5s.
 */
jest.setTimeout(10000);

const expandOperation = (operationTag: string, description: string): HTMLElement => {
  const operationTagHeader = screen.getByRole('heading', { name: operationTag });
  expect(operationTagHeader).toBeInTheDocument();
  expect(operationTagHeader.nextElementSibling).not.toBeNull();
  expect(operationTagHeader.nextElementSibling).toBeInTheDocument();

  const operationEl = getByText(operationTagHeader.nextElementSibling as HTMLElement, description);

  expect(operationEl).toBeInTheDocument();
  fireEvent.click(operationEl);

  // return the container
  return operationTagHeader.nextElementSibling as HTMLElement;
};

const collapseOperation = (operationContainer: HTMLElement, description: string) => {
  const operationEl = getByText(operationContainer, description);
  expect(operationEl).toBeInTheDocument();
  fireEvent.click(operationEl);
};

const normalizeCurlText = (original: string): string => original.trim().replace(/\s+/g, ' ');
const testCurlText = async (
  expectedCurl: string,
  operationContainer: HTMLElement,
): Promise<void> => {
  // assumption: there is exactly one expanded operation and exactly one curl form visible
  const curlHeading = await findByRole(operationContainer, 'heading', { name: 'Generated Curl' });
  expect(curlHeading).toBeInTheDocument();
  expect(curlHeading.nextElementSibling).not.toBeNull();
  expect(curlHeading.nextElementSibling).toBeInTheDocument();

  const codeBlock = await findByText(
    curlHeading.nextElementSibling as HTMLElement,
    normalizeCurlText(expectedCurl),
    {
      normalizer: normalizeCurlText,
    },
  );
  expect(codeBlock).toBeInTheDocument();
};

const renderDecisionReviews = (): void => {
  const decisionReviewSys = SwaggerUI({
    dom_id: '#mount-decision-reviews',
    plugins: [SwaggerPlugins(() => false)],
    spec: decisionReviews,
  }) as System;
  // test that the form is sensitive to version number
  decisionReviewSys.versionActions.setApiVersion('1');
};

const renderFHIRR4 = (): void => {
  // tslint:disable-next-line:no-unused-expression
  SwaggerUI({
    dom_id: '#mount-fhir-r4',
    plugins: [SwaggerPlugins(() => false)],
    spec: fhirR4,
  });
};

describe('CurlForm', () => {
  const createHLRDesc = 'Create a Higher-Level Review';

  let operationContainer: HTMLElement;
  beforeEach(() => {
    render(
      <div>
        <div id="mount-decision-reviews" />
        <div id="mount-fhir-r4" />
      </div>,
    );
  });

  it('renders the curl form', async () => {
    renderDecisionReviews();
    operationContainer = expandOperation('Higher-Level Reviews', createHLRDesc);
    const heading = await findByRole(operationContainer, 'heading', { name: 'Example Curl' });
    expect(heading).toBeInTheDocument();
  });

  it('renders the default generated curl command', async () => {
    renderDecisionReviews();
    renderFHIRR4();

    // Decision Reviews /higher_level_reviews
    operationContainer = expandOperation('Higher-Level Reviews', createHLRDesc);
    let expectedCurl = `curl -X POST 'https://sandbox-api.va.gov/services/appeals/v1/decision_reviews/higher_level_reviews' \\
--header 'X-VA-SSN: ' \\
--header 'X-VA-Insurance-Policy-Number: ' \\
--header 'X-VA-Birth-Date: ' \\
--header 'X-VA-File-Number: ' \\
--header 'Content-Type: application/json' \\
--header 'X-VA-Service-Number: ' \\
--header 'X-VA-Last-Name: ' \\
--header 'X-VA-First-Name: ' \\
--header 'X-VA-Middle-Initial: ' \\
--data-raw '{}'`;

    await testCurlText(expectedCurl, operationContainer);
    collapseOperation(operationContainer, createHLRDesc);

    // FHIR R4 /Condition
    operationContainer = expandOperation('Condition', 'Condition Search');
    expectedCurl = "curl -X GET 'https://sandbox-api.va.gov/services/fhir/v0/r4/Condition'";
    await testCurlText(expectedCurl, operationContainer);
  });

  describe('authorization params', () => {
    it('renders a link to the apply page', async () => {
      renderDecisionReviews();
      renderFHIRR4();
      const testApplyMessage = async () => {
        const applyMessage = await findByText(operationContainer, "Don't have an API Key?", {
          exact: false,
        });
        expect(applyMessage).toBeInTheDocument();

        const applyLink = getByRole(applyMessage, 'link', { name: 'Get One' });
        expect(applyLink).toBeInTheDocument();
        expect(applyLink.getAttribute('href')).toBe('/apply');
      };

      // key-auth API
      operationContainer = expandOperation('Higher-Level Reviews', createHLRDesc);
      await testApplyMessage();
      collapseOperation(operationContainer, createHLRDesc);

      // OAuth API
      operationContainer = expandOperation('Condition', 'Condition Search');
      await testApplyMessage();
    });

    describe('for a key-auth API', () => {
      beforeEach(() => {
        renderDecisionReviews();
        operationContainer = expandOperation('Higher-Level Reviews', createHLRDesc);
      });

      it('renders the API key input', async () => {
        const apiKeyH3 = await findByRole(operationContainer, 'heading', { name: 'API Key:' });
        expect(apiKeyH3).toBeInTheDocument();

        const apiKeyInput = await findByRole(operationContainer, 'textbox', {
          name: 'Enter API Key',
        });
        expect(apiKeyInput).toBeInTheDocument();
        expect((apiKeyH3.nextElementSibling as HTMLElement).contains(apiKeyInput)).toBe(true);
      });

      it('updates the input value when the key input changes', async () => {
        const apiKeyInput = (await findByRole(operationContainer, 'textbox', {
          name: 'Enter API Key',
        })) as HTMLInputElement;

        fireEvent.change(apiKeyInput, { target: { value: 'fakekey' } });
        expect(apiKeyInput.value).toBe('fakekey');
      });

      it('updates the API key in the curl command when the key input changes', async () => {
        const apiKeyInput = (await findByRole(operationContainer, 'textbox', {
          name: 'Enter API Key',
        })) as HTMLInputElement;

        fireEvent.change(apiKeyInput, { target: { value: 'fakekey' } });
        const expectedCurl = `curl -X POST 'https://sandbox-api.va.gov/services/appeals/v1/decision_reviews/higher_level_reviews' \\
--header 'X-VA-SSN: ' \\
--header 'X-VA-Insurance-Policy-Number: ' \\
--header 'apikey: fakekey' \\
--header 'X-VA-Birth-Date: ' \\
--header 'X-VA-File-Number: ' \\
--header 'Content-Type: application/json' \\
--header 'X-VA-Service-Number: ' \\
--header 'X-VA-Last-Name: ' \\
--header 'X-VA-First-Name: ' \\
--header 'X-VA-Middle-Initial: ' \\
--data-raw '{}'`;

        await testCurlText(expectedCurl, operationContainer);
      });
    });

    describe('for an OAuth API', () => {
      beforeEach(() => {
        renderFHIRR4();
        operationContainer = expandOperation('Condition', 'Condition Search');
      });

      it('renders the bearer token input', async () => {
        const bearerTokenH3 = await findByRole(operationContainer, 'heading', {
          name: 'Bearer Token:',
        });
        expect(bearerTokenH3).toBeInTheDocument();

        const bearerTokenInput = await findByRole(operationContainer, 'textbox', {
          name: 'Enter Bearer Token',
        });
        expect(bearerTokenInput).toBeInTheDocument();
        expect((bearerTokenH3.nextElementSibling as HTMLElement).contains(bearerTokenInput)).toBe(
          true,
        );
      });

      it('updates the input value when the bearer token input changes', async () => {
        const bearerTokenInput = (await findByRole(operationContainer, 'textbox', {
          name: 'Enter Bearer Token',
        })) as HTMLInputElement;

        fireEvent.change(bearerTokenInput, { target: { value: 'faketoken' } });
        expect(bearerTokenInput.value).toBe('faketoken');
      });

      it('updates the API key in the curl command when the bearer token input changes', async () => {
        const bearerTokenInput = (await findByRole(operationContainer, 'textbox', {
          name: 'Enter Bearer Token',
        })) as HTMLInputElement;

        fireEvent.change(bearerTokenInput, { target: { value: 'faketoken' } });
        const expectedCurl = `curl -X GET 'https://sandbox-api.va.gov/services/fhir/v0/r4/Condition' \\
--header 'Authorization: Bearer faketoken'`;
        await testCurlText(expectedCurl, operationContainer);
      });
    });
  });

  describe('environment selector', () => {
    beforeEach(() => {
      renderDecisionReviews();
      operationContainer = expandOperation('Higher-Level Reviews', createHLRDesc);
    });

    it('renders the environment selector', async () => {
      const envHeading = await findByRole(operationContainer, 'heading', { name: 'Environment:' });
      expect(envHeading).toBeInTheDocument();

      const envSelect = (await findByRole(operationContainer, 'combobox', {
        name: 'Select environment',
      })) as HTMLSelectElement;
      expect(envSelect).toBeInTheDocument();
      expect(envSelect.previousElementSibling).toBe(envHeading);
      expect(envSelect).toHaveValue(
        'https://sandbox-api.va.gov/services/appeals/{version}/decision_reviews',
      );

      expect(envSelect.options).toHaveLength(2);
      expect(envSelect.options[0]).toHaveTextContent('VA.gov API sandbox environment');
      expect(envSelect.options[0]).toHaveValue(
        'https://sandbox-api.va.gov/services/appeals/{version}/decision_reviews',
      );
      expect(envSelect.options[0].selected).toBe(true);
      expect(envSelect.options[1]).toHaveTextContent('VA.gov API production environment');
      expect(envSelect.options[1]).toHaveValue(
        'https://api.va.gov/services/appeals/{version}/decision_reviews',
      );
      expect(envSelect.options[1].selected).toBe(false);
    });

    it('updates the select element value when it changes', async () => {
      const envSelect = (await findByRole(operationContainer, 'combobox', {
        name: 'Select environment',
      })) as HTMLSelectElement;
      const prodOption = envSelect.options[1];
      expect(prodOption.selected).toBe(false);

      fireEvent.change(envSelect, { target: { value: prodOption.value } });
      expect(envSelect).toHaveValue(
        'https://api.va.gov/services/appeals/{version}/decision_reviews',
      );
      expect(prodOption.selected).toBe(true);
    });

    it('updates the host in the curl command when a new environment is selected', async () => {
      const envSelect = (await findByRole(operationContainer, 'combobox', {
        name: 'Select environment',
      })) as HTMLSelectElement;
      const prodOption = envSelect.options[1];
      expect(prodOption.selected).toBe(false);

      const expectedCurl = `curl -X POST 'https://api.va.gov/services/appeals/v1/decision_reviews/higher_level_reviews' \\
--header 'X-VA-SSN: ' \\
--header 'X-VA-Insurance-Policy-Number: ' \\
--header 'X-VA-Birth-Date: ' \\
--header 'X-VA-File-Number: ' \\
--header 'Content-Type: application/json' \\
--header 'X-VA-Service-Number: ' \\
--header 'X-VA-Last-Name: ' \\
--header 'X-VA-First-Name: ' \\
--header 'X-VA-Middle-Initial: ' \\
--data-raw '{}'`;

      fireEvent.change(envSelect, { target: { value: prodOption.value } });
      await testCurlText(expectedCurl, operationContainer);
    });
  });

  describe('parameter inputs', () => {
    beforeEach(() => {
      renderDecisionReviews();
      operationContainer = expandOperation('Higher-Level Reviews', createHLRDesc);
    });

    it('renders the parameter inputs', async () => {
      const paramsHeading = await findByRole(operationContainer, 'heading', {
        name: 'Parameters:',
      });
      expect(paramsHeading).toBeInTheDocument();
      expect(paramsHeading.nextElementSibling).not.toBeNull();
      const paramsContainer = paramsHeading.nextElementSibling as HTMLElement;
      expect(paramsContainer).toBeInTheDocument();

      const paramInputs = getAllByRole(paramsContainer, 'textbox') as HTMLInputElement[];
      expect(paramInputs).toHaveLength(8);

      const paramNames = [
        'X-VA-SSN',
        'X-VA-First-Name',
        'X-VA-Middle-Initial',
        'X-VA-Last-Name',
        'X-VA-Birth-Date',
        'X-VA-File-Number',
        'X-VA-Service-Number',
        'X-VA-Insurance-Policy-Number',
      ];

      paramNames.forEach((name: string) => {
        const input = getByRole(paramsContainer, 'textbox', { name });
        expect(input).toBeInTheDocument();
      });
    });

    it('updates the value of each parameter input on change', async () => {
      const testParamChange = async (param: string, value: string) => {
        const input = await findByRole(operationContainer, 'textbox', { name: param });
        expect(input).toBeInTheDocument();
        fireEvent.change(input, { target: { value } });
        expect(input).toHaveValue(value);
      };

      await testParamChange('X-VA-SSN', '999-99-9999');
      await testParamChange('X-VA-First-Name', 'Test');
      await testParamChange('X-VA-Middle-Initial', 'J');
      await testParamChange('X-VA-Last-Name', 'User');
      await testParamChange('X-VA-Birth-Date', '1900-12-31');
      await testParamChange('X-VA-File-Number', 'fake-file-num-123');
      await testParamChange('X-VA-Service-Number', 'fake-service-num-321');
      await testParamChange('X-VA-Insurance-Policy-Number', '987654321');
    });

    it('updates params in the generated curl command', async () => {
      const updateParam = async (param: string, value: string) => {
        const input = await findByRole(operationContainer, 'textbox', { name: param });
        expect(input).toBeInTheDocument();
        fireEvent.change(input, { target: { value } });
      };

      await updateParam('X-VA-SSN', '999-99-9999');
      await updateParam('X-VA-First-Name', 'Test');
      await updateParam('X-VA-Middle-Initial', 'J');
      await updateParam('X-VA-Last-Name', 'User');
      await updateParam('X-VA-Birth-Date', '1900-12-31');
      await updateParam('X-VA-File-Number', 'fake-file-num-123');
      await updateParam('X-VA-Service-Number', 'fake-service-num-321');
      await updateParam('X-VA-Insurance-Policy-Number', '987654321');

      const expectedCurl = `curl -X POST 'https://sandbox-api.va.gov/services/appeals/v1/decision_reviews/higher_level_reviews' \\
--header 'X-VA-SSN: 999-99-9999' \\
--header 'X-VA-Insurance-Policy-Number: 987654321' \\
--header 'X-VA-Birth-Date: 1900-12-31' \\
--header 'X-VA-File-Number: fake-file-num-123' \\
--header 'Content-Type: application/json' \\
--header 'X-VA-Service-Number: fake-service-num-321' \\
--header 'X-VA-Last-Name: User' \\
--header 'X-VA-First-Name: Test' \\
--header 'X-VA-Middle-Initial: J' \\
--data-raw '{}'`;
      await testCurlText(expectedCurl, operationContainer);
    });
  });

  describe('request body inputs', () => {
    const dataValue =
      '{ "type": "higherLevelReview", "attributes": { "informalConference": false, "sameOffice": true } }';
    beforeEach(() => {
      renderDecisionReviews();
      operationContainer = expandOperation('Higher-Level Reviews', createHLRDesc);
    });

    it('renders the request body inputs', async () => {
      const bodyHeading = await findByRole(operationContainer, 'heading', {
        name: 'Request Body:',
      });
      expect(bodyHeading).toBeInTheDocument();
      expect(bodyHeading.nextElementSibling).not.toBeNull();
      const bodyContainer = bodyHeading.nextElementSibling as HTMLElement;
      expect(bodyContainer).toBeInTheDocument();

      const requestBodyInputs = getAllByRole(bodyContainer, 'textbox') as HTMLInputElement[];
      expect(requestBodyInputs).toHaveLength(2);
      ['data', 'included'].forEach((name: string) => {
        const input = getByRole(bodyContainer, 'textbox', { name });
        expect(input).toBeInTheDocument();
      });
    });

    it('updates the value of each request body input on change', async () => {
      const testRequestBodyChange = async (param: string, value: string) => {
        const input = await findByRole(operationContainer, 'textbox', { name: param });
        expect(input).toBeInTheDocument();
        fireEvent.change(input, { target: { value } });
        expect(input).toHaveValue(value);
      };

      await testRequestBodyChange('data', dataValue);
      await testRequestBodyChange('included', 'contestableIssue1,contestableIssue2');
    });

    it('updates the generated curl command when request body inputs change', async () => {
      const updateRequestBody = async (param: string, value: string) => {
        const input = await findByRole(operationContainer, 'textbox', { name: param });
        expect(input).toBeInTheDocument();
        fireEvent.change(input, { target: { value } });
      };

      await updateRequestBody('data', dataValue);
      await updateRequestBody('included', 'contestableIssue1,contestableIssue2');

      const expectedCurl = `curl -X POST 'https://sandbox-api.va.gov/services/appeals/v1/decision_reviews/higher_level_reviews' \\
--header 'X-VA-SSN: ' \\
--header 'X-VA-Insurance-Policy-Number: ' \\
--header 'X-VA-Birth-Date: ' \\
--header 'X-VA-File-Number: ' \\
--header 'Content-Type: application/json' \\
--header 'X-VA-Service-Number: ' \\
--header 'X-VA-Last-Name: ' \\
--header 'X-VA-First-Name: ' \\
--header 'X-VA-Middle-Initial: ' \\
--data-raw '{
  "data": {
    "type": "higherLevelReview",
    "attributes": {
      "informalConference": false,
      "sameOffice": true
    }
  },
  "included": [
    "contestableIssue1",
    "contestableIssue2"
  ]
}'`;

      await testCurlText(expectedCurl, operationContainer);
    });
  });
});
