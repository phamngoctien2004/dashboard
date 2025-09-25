import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError, switchMap, throwError} from 'rxjs';
import {inject} from '@angular/core';
import {AuthService} from '../services/AuthService';

export const HttpErrorHandler: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const status = error.status;
      const errorDetail = error.error;
      if (status == 401 && errorDetail.code == "JWT_402") {
        return authService.refreshOne().pipe(
          switchMap((newToken: string) => {
            console.log("retry")
            const newRequest = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken}`
              }
            });
            return next(newRequest);
          }),
        )
      }
      return throwError(() => error);
    })
  )
}

