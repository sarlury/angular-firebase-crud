import { Component, OnInit } from '@angular/core';
import { TutorialService } from '../../services/tutorial.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tutorial-list',
  templateUrl: './tutorial-list.component.html',
  styleUrls: ['./tutorial-list.component.css']
})
export class TutorialListComponent implements OnInit {

  tutorials: any;
  currentTutorial = null;
  currentIndex = -1;
  title = '';

  constructor(
    private tutorialService: TutorialService
  ) { }

  ngOnInit(): void {
    this.retrieveTutorials();
  }

  refreshList():void {
    this.currentTutorial = null;
    this.currentIndex = -1;
    this.retrieveTutorials();
  }

  retrieveTutorials():void {
    this.tutorialService.getAll().snapshotChanges()
        .pipe(
            map(change => change.map(c => ({
              key: c.payload.key, ...c.payload.val()
            })
          )
        )
      ).subscribe(data => {
        this.tutorials = data;
      });
  }

  setActiveTutorial(tutorial, index): void {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }

  removeAllTutorials(): void {
    this.tutorialService.deleteAll()
      .then(() => this.refreshList())
        .catch(err => console.log(err));
  }

}
