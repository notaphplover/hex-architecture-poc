// eslint-disable-next-line @typescript-eslint/typedef
export const httpInjectionSymbolsMap = {
  azureHttpRequestToRequestConverter: Symbol.for(
    'AzureHttpRequestToRequestConverter',
  ),
  azureHttpRequestToRequestWithBodyConverter: Symbol.for(
    'AzureHttpRequestToRequestWithBodyConverter',
  ),
  httpResponseCreateQueryToGetResponseWithEntityCreatedConverter: Symbol.for(
    'HttpResponseCreateQueryToGetResponseWithEntityCreatedConverter',
  ),
  httpResponseCreateQueryToPostResponseWithEntityCreatedConverter: Symbol.for(
    'HttpResponseCreateQueryToPostResponseWithEntityCreatedConverter',
  ),
  responseToAzureHttpResponseConverter: Symbol.for(
    'ResponseToAzureHttpResponseConverter',
  ),
  singleEntityHttpGetResponseCreateQueryToResponseConverter: Symbol.for(
    'SingleEntityHttpGetResponseCreateQueryToResponseConverter',
  ),
  singleEntityHttpPostResponseCreateQueryToResponseConverter: Symbol.for(
    'SingleEntityHttpPostResponseCreateQueryToResponseConverter',
  ),
};
