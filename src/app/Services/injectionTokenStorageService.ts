import { InjectionToken } from "@angular/core";
import { IStorageService } from "../Models/IStorageService";

export const TOKEN_STORAGE_SERVICE= new InjectionToken<IStorageService>('TokenStorageService');
