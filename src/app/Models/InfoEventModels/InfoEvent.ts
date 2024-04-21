export interface IInfoEvento {
  name:            string;
  type:            string;
  id:              string;
  url:             string;
  images:          Image[];
  dates:           Dates;
  priceRanges:     PriceRange[];
  promoter:        Promoter;
  _embedded:       Embedded;
}

export interface Embedded {
attractions: Attraction[];
venues:      Venue[];
}

export interface Attraction {
_links:          AttractionLinks;
classifications: AttractionClassification[];
externalLinks:   ExternalLinks;
id:              string;
images:          Image[];
locale:          string;
name:            string;
test:            boolean;
type:            string;
upcomingEvents:  UpcomingEvents;
url:             string;
}

export interface AttractionLinks {
self: Self;
}

export interface Self {
href: string;
}

export interface AttractionClassification {
family:   boolean;
genre:    Promoter;
primary:  boolean;
segment:  Promoter;
subGenre: Promoter;
subType:  Promoter;
type:     Promoter;
}

export interface Promoter {
id:   string;
name: string;
}

export interface ExternalLinks {
facebook:    Facebook[];
homepage:    Facebook[];
instagram:   Facebook[];
itunes:      Facebook[];
musicbrainz: Musicbrainz[];
spotify:     Facebook[];
twitter:     Facebook[];
wiki:        Facebook[];
youtube:     Facebook[];
}

export interface Facebook {
url: string;
}

export interface Musicbrainz {
id: string;
}

export interface Image {
fallback: boolean;
height:   number;
ratio?:   Ratio;
url:      string;
width:    number;
}

export enum Ratio {
The16_9 = "16_9",
The3_2 = "3_2",
The4_3 = "4_3",
}

export interface UpcomingEvents {
_filtered:     number;
_total:        number;
"mfx-es":      number;
ticketmaster?: number;
}

export interface Venue {
_links:         AttractionLinks;
address:        Address;
city:           City;
country:        Country;
id:             string;
images:         Image[];
locale:         string;
location:       Location;
name:           string;
postalCode:     string;
state:          City;
test:           boolean;
timezone:       string;
type:           string;
upcomingEvents: UpcomingEvents;
url:            string;
}

export interface Address {
line1: string;
}

export interface City {
name: string;
}

export interface Country {
countryCode: string;
name:        string;
}

export interface Location {
latitude:  string;
longitude: string;
}




export interface Dates {
spanMultipleDays: boolean;
start:            Start;
status:           Status;
timezone:         string;
}

export interface Start {
dateTBA:        boolean;
dateTBD:        boolean;
dateTime:       Date;
localDate:      Date;
localTime:      string;
noSpecificTime: boolean;
timeTBA:        boolean;
}

export interface Status {
code: string;
}

export interface PriceRange {
currency: string;
max:      number;
min:      number;
type:     string;
}



