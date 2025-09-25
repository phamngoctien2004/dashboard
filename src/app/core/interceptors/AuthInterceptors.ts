import {HttpInterceptorFn} from '@angular/common/http';

export const AuthInterceptors: HttpInterceptorFn = (req, next) => {
  const publicApi = [
    '/api/auth/',
  ]
  const noToast = [
    '/api/users/me',
    "/api/auth/refresh"
  ]
  const isPublicApi = publicApi.some(api => req.url.includes(api));
  const isToast = !noToast.some(api => req.url.includes(api));
  if (isPublicApi) {
    console.log("public")
    return next(req.clone({
      setHeaders: {
        toast: isToast ? "true" : "false",
      }
    }));
  }
  const token = localStorage.getItem('jwt');
  if (token != null) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        Content_Type: 'application/json',
        toast: isToast ? "true" : "false"
      }
    })
    console.log("private")
  }
  return next(req.clone({withCredentials: true}));
}

