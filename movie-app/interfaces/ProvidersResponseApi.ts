export interface ProvidersResponseApi {
  id: number
  results: ProvidersByCountry
}

interface ProvidersByCountry {
  [key: string]: Provider[]
}

interface Provider {
  link: string
  flatrate: Flatrate[]
  rent: Rent[]
  buy: Buy[]
}

interface Flatrate {
  display_priority: number
  logo_path: string
  provider_id: number
  provider_name: string
}

interface Rent {
  display_priority: number
  logo_path: string
  provider_id: number
  provider_name: string
}

interface Buy {
  display_priority: number
  logo_path: string
  provider_id: number
  provider_name: string
}
