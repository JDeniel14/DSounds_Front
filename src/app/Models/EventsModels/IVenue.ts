export interface IVenue
{
  name:            string;
  id:             string;
  url:            string;
  city: {name:string}
  country: {name:string}
  address: {line1:string}
}
