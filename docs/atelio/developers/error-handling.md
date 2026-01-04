import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

# Error handling

## Overview

Properly handling errors from the Atelio API is essential for building robust applications. This guide explains how to implement error handling for different types of API errors and provides code examples in common programming languages.

## Atelio Error Responses

When an API request fails, Atelio returns a standardized error response with the following structure:

```json title="JSON"
{
  "Message": "Detailed error description",
  "Status": 400,
  "Code": "error_code",
  "Type": "Request Error"
}
```

Each error response contains four key components:

| Component | Description |
| --- | --- |
| `Code` | A specific error code that identifies the category of the error. |
| `Message` | A human-readable description of what went wrong. |
| `Status` | The HTTP status code of the response. |
| `Type` | The high-level category of the error: Request Error, Server Error, or Process Error. |

For a comprehensive list of error codes and their meanings, see the [Error Codes Dictionary](https://docs.atelio.com/embedded/docs/errors#error-code-dictionary).


## Error Handling Strategies

### `4xx` Request errors

Request errors indicate issues with the client's request that can typically be resolved by the end user.

Common causes:

- Missing or invalid parameters
- Invalid authentication
- Resource not found
- Schema validation failures

Handling strategy:

- Parse the error message to identify the specific issue
- Present clear feedback to the user about what went wrong
- Allow the user to correct the issue and retry

### `5xx` Server errors

Server errors indicate issues with Atelio's internal servers.

Handling strategy:

- Implement retry logic with exponential backoff for transient issues
- Log the complete error details for troubleshooting
- Contact Atelio support if the issue persists
- Display a user-friendly message that doesn't expose internal details

### Process Errors 

Process errors relate to the execution of a process at the backend.

Handling strategy:

- Log the complete error details
- Contact Atelio support
- Implement appropriate fallback behavior in your application

## Implementing Error Handling

<Tabs>
    <TabItem value="javascript" label="JavaScript">
        ```javascript
        async function makeAtelioApiRequest(endpoint, data) {
        try {
            const response = await fetch(`https://api.atelio.com/api/v0.1/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer <YOUR_AUTH_TOKEN>',
                'Identity': '<YOUR_IDENTITY_KEY>'
            },
            body: JSON.stringify(data)
            });

            const responseData = await response.json();

            // Check if the response contains an error
            if (!response.ok) {
            // Handle different error types
            switch (responseData.Type) {
                case 'Request Error':
                console.error(`Request Error: ${responseData.Message} (${responseData.Code})`);
                // Handle specific error codes
                if (responseData.Code === 'create_transfer_schema') {
                    return { success: false, error: 'Please check the transfer details and try again.' };
                }
                break;

                case 'Server Error':
                console.error(`Server Error: ${responseData.Message} (${responseData.Code})`);
                return { success: false, error: 'We\'re experiencing technical difficulties. Please try again later.' };

                case 'Process Error':
                console.error(`Process Error: ${responseData.Message} (${responseData.Code})`);
                return { success: false, error: 'Your request could not be processed. Our team has been notified.' };

                default:
                console.error(`Unknown Error: ${responseData.Message}`);
                return { success: false, error: 'An unexpected error occurred.' };
            }

            return { success: false, error: responseData.Message };
            }

            return { success: true, data: responseData };
        } catch (error) {
            console.error('Network or parsing error:', error);
            return { success: false, error: 'Could not connect to the server. Please check your internet connection.' };
        }
        }
        ```
    </TabItem>
    <TabItem value="python" label="Python">

        ```python
        import requests
        import time
        from typing import Dict, Any, Tuple, Optional

        def make_atelio_api_request(endpoint: str, data: Dict[str, Any], max_retries: int = 3) -> Tuple[bool, Optional[Dict[str, Any]], Optional[str]]:
            """
            Make a request to the Atelio API with error handling and retries for server errors.

            Args:
                endpoint: API endpoint path
                data: Request payload
                max_retries: Maximum number of retry attempts for server errors

            Returns:
                Tuple containing:
                - Success flag (boolean)
                - Response data (dict or None if error)
                - Error message (string or None if success)
            """
            headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer <YOUR_AUTH_TOKEN>',
                'Identity': '<YOUR_IDENTITY_KEY>'
            }

            url = f"https://api.atelio.com/api/v0.1/{endpoint}"

            retry_count = 0
            while retry_count <= max_retries:
                try:
                    response = requests.post(url, json=data, headers=headers)
                    response_data = response.json()

                    if response.status_code >= 200 and response.status_code < 300:
                        return True, response_data, None

                    # Handle different error types
                    error_type = response_data.get('Type')
                    error_code = response_data.get('Code')
                    error_message = response_data.get('Message', 'Unknown error')

                    if error_type == 'Server Error' and retry_count < max_retries:
                        # Implement exponential backoff for server errors
                        retry_count += 1
                        wait_time = 2 ** retry_count  # Exponential backoff: 2, 4, 8 seconds
                        print(f"Server error: {error_message}. Retrying in {wait_time} seconds...")
                        time.sleep(wait_time)
                        continue

                    if error_type == 'Request Error':
                        # Handle specific error codes
                        if error_code == 'invalid_parameter':
                            return False, None, f"Invalid parameter: {error_message}"
                        elif error_code == 'account_dne':
                            return False, None, "Account not found"

                    # For all other errors
                    print(f"API Error ({error_type}): {error_message} (Code: {error_code})")
                    return False, None, error_message

                except requests.exceptions.RequestException as e:
                    # Handle network-level errors
                    print(f"Network error: {str(e)}")
                    return False, None, "Network error: Could not connect to the Atelio API"
                except ValueError as e:
                    # Handle JSON parsing errors
                    print(f"Response parsing error: {str(e)}")
                    return False, None, "Could not parse the API response"

            # If we've exhausted all retries
            return False, None, "Maximum retry attempts reached"
        ```
    </TabItem>
    <TabItem value="ruby" label="Ruby">

        ```ruby
        require 'net/http'
        require 'uri'
        require 'json'

        class AtelioApiClient
        BASE_URL = 'https://api.atelio.com/api/v0.1'

        def initialize(auth_token, identity_key)
            @auth_token = auth_token
            @identity_key = identity_key
        end

        def make_request(endpoint, data, max_retries = 3)
            uri = URI.parse("#{BASE_URL}/#{endpoint}")

            retry_count = 0
            begin
            http = Net::HTTP.new(uri.host, uri.port)
            http.use_ssl = true

            request = Net::HTTP::Post.new(uri.request_uri)
            request['Content-Type'] = 'application/json'
            request['Authorization'] = "Bearer #{@auth_token}"
            request['Identity'] = @identity_key
            request.body = data.to_json

            response = http.request(request)
            response_data = JSON.parse(response.body)

            if response.code.to_i >= 200 && response.code.to_i < 300
                return { success: true, data: response_data }
            end

            # Handle different error types
            error_type = response_data['Type']
            error_code = response_data['Code']
            error_message = response_data['Message'] || 'Unknown error'

            case error_type
            when 'Request Error'
                puts "Request Error: #{error_message} (#{error_code})"

                # Handle specific error codes
                case error_code
                when 'customer_dne'
                return { success: false, error: 'Customer not found' }
                when 'invalid_amount'
                return { success: false, error: 'Invalid amount specified' }
                else
                return { success: false, error: error_message }
                end

            when 'Server Error'
                puts "Server Error: #{error_message} (#{error_code})"

                # Retry server errors with exponential backoff
                if retry_count < max_retries
                retry_count += 1
                wait_time = 2 ** retry_count
                puts "Retrying in #{wait_time} seconds..."
                sleep(wait_time)
                retry
                end

                return { success: false, error: 'We\'re experiencing technical difficulties. Please try again later.' }

            when 'Process Error'
                puts "Process Error: #{error_message} (#{error_code})"
                return { success: false, error: 'Your request could not be processed. Our team has been notified.' }

            else
                puts "Unknown Error: #{error_message}"
                return { success: false, error: 'An unexpected error occurred.' }
            end

            rescue => e
            puts "Exception: #{e.message}"
            return { success: false, error: 'Could not connect to the server. Please check your internet connection.' }
            end
        end
        end
        ```
    </TabItem>
</Tabs>


## Best Practices for Error Handling 

| Best practice | Description |
| --- | --- |
| Log comprehensive error details | Include the complete error response for debugging purposes. |
| Implement retry logic for transient errors | Use exponential backoff for server errors (5xx) that might be temporary. |
| Provide user-friendly error messages | Translate technical error codes into actionable messages for end users. |
| Handle specific error codes | Implement custom handling for common error codes relevant to your application. |
| Include error context | When logging errors, include the request context (endpoint, parameters) to aid troubleshooting. |
| Validate input before sending | Prevent common request errors by validating input on the client side. |
| Implement idempotency | For critical operations, use idempotency keys to safely retry operations without side effects. |


## Idempotency in Error Handling

When implementing retry logic, it's important to use idempotency keys for operations that should not be duplicated, such as transfers or payments. Atelio supports idempotency for POST requests through the `Idempotency-Key` header:

```javascript title="JavaScript"
const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer <YOUR_AUTH_TOKEN>',
  'Identity': '<YOUR_IDENTITY_KEY>',
  'Idempotency-Key': generateUniqueKey() // Generate a unique key for this specific operation
};
```

Idempotency keys ensure that even if you retry a request multiple times due to connection issues or server errors, the operation will only be executed once.

## Related Documentation

- [Error Codes Dictionary](https://docs.atelio.com/embedded/docs/errors#error-code-dictionary)
- [HTTP Status Codes](https://docs.atelio.com/embedded/docs/errors#error-statuses)
- [Idempotency](https://docs.atelio.com/embedded/docs/idempotency)
