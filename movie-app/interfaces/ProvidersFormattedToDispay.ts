import { Provider } from './ProvidersResponseApi'

export interface ProvidersFormattedToDisplay {
  flatrate: Provider[]
  rent: Provider[]
  buy: Provider[]
  buyAndRent: Provider[]
}
