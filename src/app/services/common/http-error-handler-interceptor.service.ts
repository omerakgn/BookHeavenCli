import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { error } from 'console';
import { catchError, Observable, of } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';
import { UserAuthService } from './models/userauth.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private toastrService: CustomToastrService,private userAuthService: UserAuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    return next.handle(req).pipe(catchError(error => {
      switch(error.status){
        case HttpStatusCode.Unauthorized:
          this.toastrService.message("Bu işlem için yetkiniz bulunmamaktadır!","Yetkisiz İşlem!",{
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.TopFullWidth
          });
         
            const refreshToken: string| any = localStorage.getItem("refreshToken");
            this.userAuthService.refreshTokenLogin(refreshToken).then(data => {});
          
          
          break;
        case HttpStatusCode.InternalServerError:
          this.toastrService.message("Sunucuya erişilemiyor!","Sunucu Hatası!",{
             messageType: ToastrMessageType.Warning,
            position: ToastrPosition.TopFullWidth
          });
          break;
        case HttpStatusCode.BadRequest:
            this.toastrService.message("Geçersiz istek yapıldı!","Geçersiz İstek!",{
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.TopFullWidth
          });
          break; 
        case HttpStatusCode.NotFound:
          this.toastrService.message("Sayfa Bulunamadı!","Sayfa Bulunamadı!",{
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.TopFullWidth
          });
          break;     
        default:
          this.toastrService.message("Beklenmeyen bir hata meydana geldi!","HATA!",{
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.TopFullWidth
          });
          break;

      }
      return of(error);



    }))

  }
}
