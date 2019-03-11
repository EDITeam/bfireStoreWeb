import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeNavigationComponent } from './homepage/home-navigation/home-navigation.component';
import { HomeContentComponent } from './homepage/home-content/home-content.component';
import { JpmePageComponent } from './homepage/jpme-page/jpme-page.component';
import { ParametersPageComponent } from './homepage/parameters-page/parameters-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeNavigationComponent,
    HomeContentComponent,
    JpmePageComponent,
    ParametersPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
