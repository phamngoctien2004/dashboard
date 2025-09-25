import {HttpErrorResponse, HttpInterceptorFn, HttpResponse} from '@angular/common/http';
import {filter, tap} from 'rxjs';
import {inject} from '@angular/core';
import {MessageService} from 'primeng/api';

export const ToastInterceptors: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);
  const toast = req.headers.get("toast")
  if (toast == "false") {
    return next(req);
  }
  return next(req).pipe(
    filter(event => event instanceof HttpResponse),
    tap({
      next: (response: HttpResponse<any>) => {
        let apiResponse = response.body;
        messageService.add({
          severity: "success",
          summary: "success",
          detail: apiResponse.message,
          life: 3000
        })
      },
      error: (error: HttpErrorResponse) => {
        let apiResponse = error.error.data;
        messageService.add({
          severity: "error",
          summary: "Failed",
          detail: apiResponse.message,
          life: 3000
        })
      }
    })
  );

}

