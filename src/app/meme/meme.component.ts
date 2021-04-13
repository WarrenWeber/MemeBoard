import { Component, OnInit, Input, Output } from '@angular/core';
import { Meme } from '../models/meme';

@Component({
  selector: 'app-meme',
  templateUrl: './meme.component.html',
  styleUrls: ['./meme.component.css']
})
export class MemeComponent implements OnInit {

  @Input()
  meme?: Meme;

  constructor() { }

  ngOnInit(): void {
  }

  voteStatus = 0;
  upvoted : boolean = false;
  downvoted : boolean = false;
  vote(event : any)
  {
    let newVoteStatus = this.voteStatus != event.target.value ? event.target.value : 0;
    let delta = newVoteStatus - this.voteStatus;
    this.voteStatus = newVoteStatus;
    console.log(this.voteStatus + "\t(" + delta + ")");
  }
}
