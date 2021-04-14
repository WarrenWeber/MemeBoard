import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Meme } from '../models/meme';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { MemeService } from '../meme.service';
import { Router } from '@angular/router';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-post-meme',
  templateUrl: './post-meme.component.html',
  styleUrls: ['./post-meme.component.css']
})
export class PostMemeComponent implements OnInit {

  memeForm : FormGroup;

  uploadErrorMessage : string = '';
  uploadProgress : number = 0;
  fileName : string = "";

  categories$ : Observable<string[]>;
  categories : string[] = [];

  constructor(private fb: FormBuilder, public memeService: MemeService, private http : HttpClient, private router: Router) {
    this.memeForm = this.fb.group({
      title: ['Title', Validators.required ],
      category: ['Random', Validators.required],
      fileName : ['', Validators.required ],
      tags : [[]]
    });

    this.categories$ = this.memeService.getCategories().pipe(shareReplay(1));
  }

  ngOnInit(): void {
    this.categories$.subscribe(data => {this.categories = data});
  }

  addTag() {
    let txtAddTag = (<HTMLInputElement>document.getElementById('tag-editor-txt'));
    console.log(txtAddTag);
    let value = txtAddTag?.value;
    if(value != "" && value != null) {
      if(!this.memeForm.get('tags')?.value.includes(value)) {
        this.memeForm.get('tags')?.value.push(value);
      }
      txtAddTag.value = "";
    }
  }

  removeTag(event : any) {
    let value = event.target.value;
    while(this.memeForm.get('tags')?.value.includes(value))
    {
      let index : number = this.memeForm.get('tags')?.value.indexOf(value);
      this.memeForm.get('tags')?.value.splice(index, 1);
    }
  }

  onFileChange(event: any) {
    if (!(event.target.files.length > 0)) { return; }
      this.uploadImage(event.target.files[0]);
  }

  uploadImage(file : File)
  {
    this.fileName = '';
    this.memeService.postImage(file).subscribe(
      (event) => {
        if (event.type == HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * (event.loaded / (event.total || 100)));
          console.log(this.uploadProgress + "%");
        }
        else if (event.type == HttpEventType.Response) {
          this.fileName = event.body;
          this.uploadErrorMessage = '';
          this.memeForm.get('fileName')?.setValue(this.fileName);
        }
      }, 
      (error) => {
        this.uploadProgress = 0;
        this.uploadErrorMessage = "ERROR - An error has occured during the uploading of the image file";
        console.log(error);
      }
    );
  }

  onSubmit() {
    //this.uploadImage(this.memeForm.get('uploadFile')?.value);
    const meme : Meme = {
      title: this.memeForm.get('title')?.value,
      category: this.memeForm.get('category')?.value,
      file: this.memeForm.get('fileName')?.value,
      date: new Date(),
      tags: this.memeForm.get('tags')?.value,
      votes: 0
    };
    this.memeService.postMeme(meme).subscribe(
      (val)=> {
        this.router.navigate(['']);
      },
      (error)=> {
        console.log(error);
      }
    );
  }
}
