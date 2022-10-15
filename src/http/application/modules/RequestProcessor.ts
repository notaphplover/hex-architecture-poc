import { Request } from '../models/Request';
import { RequestWithBody } from '../models/RequestWithBody';

export interface RequestProcessor<
  TRequest extends Request | RequestWithBody,
  TParams,
> {
  process(request: TRequest): Promise<TParams>;
}
