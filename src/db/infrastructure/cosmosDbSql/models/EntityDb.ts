import { MapKey } from './MapKey';

export interface EntityDb<TKey extends MapKey = MapKey> {
  id: TKey;
}
