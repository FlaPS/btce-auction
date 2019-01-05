import { handleResponse, http } from '../http'


export const producersApi = {
    getAll: () => handleResponse<ProducerRow[]>(http.get('producers')),
}


export interface Branding {
  logo_256: string;
  logo_1024: string;
  logo_svg: string;
}

export interface Social {
  telegram: string;
}

export interface Location {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface ProducerRow {
  owner: string;
  total_votes: string;
  producer_key: string;
  is_active: number;
  url: string;
  unpaid_blocks: number;
  last_claim_time: string;
  branding: Branding;
  social: Social;
  location: Location;
}

