export interface IUserPlaylistSpotify {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: Array<{
    collaborative: boolean;
    description: string;
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    images: Array<{ url: string; height: number; width: number }>;
    name: string;
    owner: {
      id: string;
    };
    public: boolean;
    snapshot_id: string;
    tracks: {
      href: string;
      total: number;
    };
    type: string;
    uri: string;
  }>;
}
