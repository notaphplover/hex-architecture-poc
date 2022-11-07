// eslint-disable-next-line @typescript-eslint/typedef
export const httpInjectionSymbolsMap = {
  azureHttpRequestToRequestConverter: Symbol.for(
    'AzureHttpRequestToRequestConverter',
  ),
  azureHttpRequestToRequestWithBodyConverter: Symbol.for(
    'AzureHttpRequestToRequestWithBodyConverter',
  ),
  getHttpResponseCreateQueryToResponseConverter: Symbol.for(
    'GetHttpResponseCreateQueryToResponseConverter',
  ),
  httpResponseCreateQueryToGetResponseWithEntityCreatedConverter: Symbol.for(
    'HttpResponseCreateQueryToGetResponseWithEntityCreatedConverter',
  ),
  httpResponseCreateQueryToPostResponseWithEntityCreatedConverter: Symbol.for(
    'HttpResponseCreateQueryToPostResponseWithEntityCreatedConverter',
  ),
};
