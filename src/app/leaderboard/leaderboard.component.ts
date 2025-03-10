import { Component } from '@angular/core';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent {

  userProfileImg = JSON.parse(localStorage.getItem('loggedInUser')!).picture;
  name = JSON.parse(localStorage.getItem('loggedInUser')!).name;

  users = [
    { rank: 1, name: 'User Name', score1: 1, score2: 1, score3: 1 },
    { rank: 2, name: 'User Name', score1: 1, score2: 1, score3: 1 },
    { rank: 3, name: 'User Name', score1: 1, score2: 1, score3: 1 }, // Highlighted Row
    { rank: 4, name: 'User Name', score1: 1, score2: 1, score3: 1 },
    { rank: 5, name: 'User Name', score1: 1, score2: 1, score3: 1 },
    { rank: 6, name: 'User Name', score1: 1, score2: 1, score3: 1 }
  ];
  tabs = ['My League', 'My College', 'My Country'];
  selectedTab = 0;

  selectTab(index: number) {
    this.selectedTab = index;
  }
}
