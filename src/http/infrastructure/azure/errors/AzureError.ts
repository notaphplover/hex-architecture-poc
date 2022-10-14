export const isAzureErrorSymbol: unique symbol = Symbol.for('isAzureError');

export class AzureError extends Error {
  public [isAzureErrorSymbol]: boolean;

  constructor(
    message?: string | undefined,
    options?: ErrorOptions | undefined,
  ) {
    super(message, options);

    this[isAzureErrorSymbol] = true;
  }
}
