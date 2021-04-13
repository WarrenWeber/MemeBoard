import { Component, OnInit, Input, Output } from '@angular/core';
import { Meme } from '../models/meme';
import { MemeService } from '../meme.service';

@Component({
  selector: 'app-meme',
  templateUrl: './meme.component.html',
  styleUrls: ['./meme.component.css']
})
export class MemeComponent implements OnInit {

  @Input()
  meme?: Meme;

  constructor(private memeService: MemeService) { }

  ngOnInit(): void {
  }

  getTimeLabel() : string {
    if(this.meme?.date != undefined)
      return (new Date(this.meme?.date)).toLocaleString();
    return 'some time ago';
  }

  voteStatus = 0;
  vote(event : any)
  {
    let newVoteStatus = this.voteStatus != event.target.value ? event.target.value : 0;
    let delta = newVoteStatus - this.voteStatus;
    this.voteStatus = newVoteStatus;

    this.memeService.getMemeByID(this.meme?.id).subscribe((result) => {
      result.votes = (result.votes || 0) + delta;
      this.memeService.patchMeme(result).subscribe((result2) => {
        this.meme = result2;
      });
    });
  }
}
