import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { TOKEN_STORAGE_SERVICE } from '../Services/injectionTokenStorageService';
import { IStorageService } from '../Models/IStorageService';
import ICliente from '../Models/ICliente';

@Injectable({
  providedIn: 'root'
})
export class AccesoPagoGuard implements CanActivate {

/**
 *
 */
constructor(
  @Inject(TOKEN_STORAGE_SERVICE) private storageSvc : IStorageService,
  private router : Router
) {

}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return (this.storageSvc.RecuperarDatosCliente() as Observable<ICliente|null>)
                .pipe(
                  map(datos => {return datos != null ? true : this.router.parseUrl("/Login")})
                );
  }

}
