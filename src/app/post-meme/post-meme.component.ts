import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Meme } from '../models/meme';
import {MemeService} from '../meme.service';

@Component({
  selector: 'app-post-meme',
  templateUrl: './post-meme.component.html',
  styleUrls: ['./post-meme.component.css']
})
export class PostMemeComponent implements OnInit {

  memeForm : FormGroup;

  public tags : string[];

  constructor(private fb: FormBuilder, private memeService: MemeService) { 
    this.tags = ["4chan", "test"];

    this.memeForm = this.fb.group({
      title: ['Fake Title', Validators.required ],
      image : ['', Validators.required ]
    });
  }

  ngOnInit(): void {
  }

  addTag(event: any) {
    let value = event.target.value;
    if(value != "")
    {
      if(!this.tags.includes(value))
      {
        this.tags.push(value);
      }
      event.target.value = "";
    }
  }

  removeTag(event : any) {
    let value = event.target.value;
    while(this.tags.includes(value))
    {
      let index : number = this.tags.indexOf(value);
      this.tags.splice(index, 1);
    }
  }

}
