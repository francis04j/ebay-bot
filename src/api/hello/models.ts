import { string, object } from 'joi';
export interface HelloRequest {
    itemId: string;
    query: string;
}

  export interface HelloResponse {
    response: string;
  }
  
  export interface SuccessResponse<T> {
    kind: 'success';
    value: T;
  }
  
  export interface ErrorResponse {
    body: string;
    statusCode: number;
  }
  
  export type Response<T> = SuccessResponse<T> | ErrorResponse;
  
  export const createSuccess = <T>(result?: T): Response<T> => {
      return {
          value: result,
          kind: 'success'
      };
  };
  