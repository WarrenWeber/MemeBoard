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
import { MemesComponent } from './memes/memes.component';
import { PostMemeComponent } from './post-meme/post-meme.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CollectionTagComponent } from './collection-tag/collection-tag.component';
import { MemesCategoryComponent } from './memes-category/memes-category.component';

const appRoutes: Routes = [
  { path: '', component: MemesComponent },
  { path: 'post', component: PostMemeComponent },
  { path: ':category', component: MemesCategoryComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    MemeComponent,
    MemesComponent,
    PostMemeComponent,
    CollectionTagComponent,
    MemesCategoryComponent
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
    MatProgressBarModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [MemeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
