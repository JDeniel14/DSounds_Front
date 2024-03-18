import { IChildEventEmbedded } from "./IChildEventEmbedded";
import { IImage } from "./IImage";

export interface IEvent{
  name:            string;
  type:            string;
  id:              string;
  url:             string;
  _embedded:       IChildEventEmbedded;
  images: IImage[];
}
