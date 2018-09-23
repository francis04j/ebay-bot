import { APIGatewayEvent, ProxyResult } from "aws-lambda";
import { requestSchema, defaultValidationOptions } from "./requestSchema";
import { validate } from "joi";
import { HelloRequest } from "./models";

export const handler = async(event: APIGatewayEvent): Promise<ProxyResult> => {

    const body = JSON.parse((<APIGatewayEvent>event).body || '{}');
    const { error, value } = (requestSchema &&
            validate<HelloRequest>(body, requestSchema, defaultValidationOptions)) || 
            {
                error: undefined,
                value: {} as HelloRequest
            };
    
    if (error)  return createBadRequestResult(error);

    return {
        statusCode: 200,
        body: JSON.stringify(value)
    };
}

function createBadRequestResult(responseBody: any, errorCode?: number) {
    return {
        statusCode: errorCode || 500,
        body: JSON.stringify(responseBody)
    };
}