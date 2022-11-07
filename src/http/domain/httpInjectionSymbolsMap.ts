// eslint-disable-next-line @typescript-eslint/typedef
export const httpInjectionSymbolsMap = {
  azureHttpRequestToRequestConverter: Symbol.for(
    'AzureHttpRequestToRequestConverter',
  ),
  azureHttpRequestToRequestWithBodyConverter: Symbol.for(
    'AzureHttpRequestToRequestWithBodyConverter',
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
