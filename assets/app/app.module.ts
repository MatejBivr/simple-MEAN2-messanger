import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from "./app.component";
import { routing } from "./app.routing";
import { HeaderComponent } from "./header.component";
import { MessageModule } from "./messages/message.module";
import { AuthenticationComponent } from './auth/authentication.component';
import { AuthService } from './auth/auth.service';
import { ErrorService } from './errors/error.service';
import { ErrorComponent } from './errors/error.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,        
        AuthenticationComponent,
        ErrorComponent
    ],
    imports: [BrowserModule, routing, ReactiveFormsModule, HttpModule, MessageModule],
    providers: [AuthService, ErrorService],
    bootstrap: [AppComponent]
})
export class AppModule {

}