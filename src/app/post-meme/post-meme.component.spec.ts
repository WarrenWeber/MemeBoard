import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostMemeComponent } from './post-meme.component';

describe('PostMemeComponent', () => {
  let component: PostMemeComponent;
  let fixture: ComponentFixture<PostMemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostMemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostMemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
