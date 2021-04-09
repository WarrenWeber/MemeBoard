import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'
import {HttpClientModule} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { MemeService } from './meme.service';

import { AppComponent } from './app.component';
import { MemeComponent } from './meme/meme.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MemesComponent } from './memes/memes.component';
import { PostMemeComponent } from './post-meme/post-meme.component';

const appRoutes: Routes = [
  { path: '', component: MemesComponent },
  { path: 'post', component: PostMemeComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    MemeComponent,
    NavbarComponent,
    MemesComponent,
    PostMemeComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [MemeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
