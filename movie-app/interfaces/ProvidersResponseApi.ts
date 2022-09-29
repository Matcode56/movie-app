export interface ProvidersResponseApi {
  id: number
  results: ProvidersByCountry
}

export interface ProvidersByCountry {
  [country: string]: Providers[]
}

export interface Providers {
  link: string
  flatrate: Provider[]
  rent: Provider[]
  buy: Provider[]
}
export interface Provider {
  display_priority: number
  logo_path: string
  provider_id: number
  provider_name: string
}
export interface Flatrate {
  display_priority: number
  logo_path: string
  provider_id: number
  provider_name: string
}

export interface Rent {
  display_priority: number
  logo_path: string
  provider_id: number
  provider_name: string
}

export interface Buy {
  display_priority: number
  logo_path: string
  provider_id: number
  provider_name: string
}
