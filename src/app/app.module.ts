import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { AdminModule } from './admin/admin.module';
import { UiModule } from './ui/ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { DeleteDirective } from './directives/admin/delete.directive';
import { FileUploadComponent } from './services/common/file-upload/file-upload.component';
import { HomeModule } from './ui/components/home/home.module';
import { JwtModule } from '@auth0/angular-jwt'
import { HttpErrorHandlerInterceptorService } from './services/common/http-error-handler-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    AdminModule,
    UiModule,
    NgxSpinnerModule,
    HttpClientModule,
    HomeModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem("accessToken"),
        allowedDomains: ["localhost:7250"],
      }
    })
    
],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(),
    {provide: "baseUrl", useValue:"https://localhost:7250/api", multi: true },
    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorHandlerInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
