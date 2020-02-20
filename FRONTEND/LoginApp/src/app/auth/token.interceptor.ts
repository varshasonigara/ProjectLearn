import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './services/auth.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        debugger;
        if(this.authService.getJwtToken()) {
            request = this.addToken(request, this.authService.getJwtToken());
        }

        return next.handle(request).pipe(
            catchError(error=>{
                //handle error logic for 401
                return throwError(error);
            })
        );
    }

    private addToken(request: HttpRequest<any>, token: string){
        return request.clone({
            setHeaders: {
                'Authorization': `Bearer ${token}`
            }
        });
    }

}