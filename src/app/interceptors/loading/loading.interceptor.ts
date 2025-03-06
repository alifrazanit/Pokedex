import { HttpInterceptorFn } from '@angular/common/http';
import { inject, signal } from '@angular/core';
import { LoadingServiceService } from '@services/loadingService/loading-service.service';
import { finalize, tap } from 'rxjs/operators';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loading = inject(LoadingServiceService);
  loading.setIsLoading(true);
  return next(req).pipe(
    finalize(() => {
      loading.setIsLoading(false);
    })
  )
};
