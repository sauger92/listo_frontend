import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-badges',
  templateUrl: './badges.component.html',
  styleUrls: ['./badges.component.scss']
})
export class BadgesComponent implements OnInit {
  userId: string;
  userName: string;
  badges: any[];
  myData : any;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.FindUserInfo().then(
      () => {
        this.userId=this.authService.UserInfo._id;
        this.userName = this.authService.UserInfo.username;
        this.myData = this.authService.UserInfo.badges;
        var key;
        this.badges = new Array<any>();
        
        for (key in this.myData) {
          this.badges.push({
            key: key,
            score:  this.myData[key]
          });         
      }
        
      }
    );
  }
  isNumber(objectTocheck: any){
    return !isNaN(parseFloat(objectTocheck)) && !isNaN(objectTocheck - 0);
  }
  getColor(objectTocheck: any){
    if(this.isUnlocked(objectTocheck)){
      return "white";
    }
    return "gray";
  }

  getOpacity(objectTocheck: any){
    if(this.isUnlocked(objectTocheck)){
      return 1;
    }
    return .8;

  }

  isUnlocked(objectTocheck: any){
    if(objectTocheck ){
      return true;
    }
    return false;
  }

}
