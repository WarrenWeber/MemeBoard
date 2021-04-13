import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Meme } from '../models/meme';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { MemeService } from '../meme.service';
import { Router } from '@angular/router';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-post-meme',
  templateUrl: './post-meme.component.html',
  styleUrls: ['./post-meme.component.css']
})
export class PostMemeComponent implements OnInit {

  memeForm : FormGroup;

  uploadProgress : number = 0;
  fileName : string = "";

  categories : string[] = ['Random', 'Politics'];

  constructor(private fb: FormBuilder, private memeService: MemeService, private httpClient : HttpClient, private router: Router) {
    this.memeForm = this.fb.group({
      title: ['Title', Validators.required ],
      category: ['Random', Validators.required],
      fileName : ['', Validators.required ],
      tags : [[]]
    });
  }

  ngOnInit(): void {
    let date = new Date();
    console.log(date.toISOString());
    let date2 = new Date(date.toISOString());
    console.log(date2);
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
      const file = event.target.files[0];
      this.uploadImage(file);
      //this.memeForm.get('fileName')?.setValue(file);
  }

  onSubmit() {
    //this.uploadImage(this.memeForm.get('uploadFile')?.value);
    const meme = {
      title: this.memeForm.get('title')?.value,
      category: this.memeForm.get('category')?.value,
      file: this.memeForm.get('fileName')?.value,
      date: new Date(),
      tags: this.memeForm.get('tags')?.value
    };
    this.memeService.postMeme(meme).subscribe((val)=>{
      this.router.navigate(['']);
    });
  }

  uploadImage(file : File)
  {
    const formData = new FormData();
    formData.append('file', file);
    this.httpClient.post<any>("http://localhost:80/MemeBoard/upload.php", formData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe(
      (event) => {
        if (event.type == HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * (event.loaded / (event.total || 100)));
          console.log(this.uploadProgress + "%");
        }
        else if (event.type == HttpEventType.Response) {
          this.fileName = event.body;
          console.log(this.fileName);
          this.memeForm.get('fileName')?.setValue(this.fileName);
        }
      },
      (error) => {
        console.log(error)
      }
    );
  }
}
