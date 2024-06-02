export interface ISearchSpotifyModel {
  albums: {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
    items: Array<{
      album_type: string;
      total_tracks: number;
      href: string;
      id: string;
      images: Array<{ url: string; height: number; width: number }>;
      name: string;
      release_date: string;
      release_date_precision: string;
      type: string;
      uri: string;
      artists: Array<{
        external_urls: { spotify: string };
        href: string;
        id: string;
        name: string;
        type: string;
        uri: string;
      }>;
    }>;
  };
}
