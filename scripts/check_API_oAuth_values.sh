#!/bin/bash

ENVIRONMENTS=("dev-" "staging-" "")

BASE_URL="${API_BASE_URL}"

for ENVIRONMENT in "${ENVIRONMENTS[@]}"; do
    if [ -z "$ENVIRONMENT" ]; then
        echo "Fetching data for environment: production"
    else
        echo "Fetching data for environment: ${ENVIRONMENT}"
    fi
    
    FULL_URL="https://${ENVIRONMENT}${BASE_URL}"

    # Retreive oAuth properties for Address Validation API
    OUTPUT=$(curl -s "$FULL_URL" | jq '.verification.apis[] | select(.altID == "addressValidation") | {oAuth, oAuthInfo, oAuthTypes}')
    echo "$OUTPUT"
    
    # Check if oAuth is not false
    echo "$OUTPUT" | jq -e '.oAuth == false' > /dev/null || { echo "Error: oAuth is not false in the output above for $ENVIRONMENT"; exit 1; }

    # Check if oAuthInfo is not null
    echo "$OUTPUT" | jq -e '.oAuthInfo == null' > /dev/null || { echo "Error: oAuthInfo is not null in the output above for $ENVIRONMENT"; exit 1; }

    # Check if oAuthTypes is not null
    echo "$OUTPUT" | jq -e '.oAuthTypes == null' > /dev/null || { echo "Error: oAuthTypes is not null in the output above for $ENVIRONMENT"; exit 1; }

    echo "------------------------------------------------"
done