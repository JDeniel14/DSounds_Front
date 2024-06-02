export interface ISpotifyProfile {
  country: string;
  display_name: string;
  email: string;
  external_urls: { spotify: string };
  href: string;
  id: string;
  images: Array<{ url: string; height: number; width: number }>;
  product: string;
  type: string;
  uri: string;
}
