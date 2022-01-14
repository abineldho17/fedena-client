import { HttpHandler, HttpInterceptor, HttpRequest, } from "@angular/common/http";
import { AuthService } from "../auth.service";
import { Injectable, Injector } from "@angular/core";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    
    constructor(private injector:Injector){}
    
    intercept(req, next){
let authService = this.injector.get(AuthService)
       
        let AuthorizedReq = req.clone({
            setHeaders: {
                'Content-Type': 'application/json',
                'X-Client': 'identity=CeDwAKo49aSr9tYu87HMurJL;',
                      Accept: 'application/json; version=1;',
              
                Authorization: 'Bearer token=' + window.localStorage.getItem('access_token') + ';',
               
            }
        })
        return next.handle(AuthorizedReq);
     }


}