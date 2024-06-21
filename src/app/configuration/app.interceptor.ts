import { HttpInterceptorFn } from '@angular/common/http';

export const apiInterceptor: HttpInterceptorFn = (httpRequest, next) => {
  const fakeBackendUrl = 'http://localhost:3000';

  const url = `${fakeBackendUrl}/${httpRequest.url}`;

  return next(httpRequest.clone({ url: url }));
};
