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
  getTitle(key: string){
    switch(key){
      case "destination":{
        return "La Boussole d'Or"
      }
      case "date":{
        return "Le Sablier"
      }
      case "winner":{
        return "Trophée de sa Majesté"
      }
      case "loser":{
        return "Le Mutin";
      }
      case "budget":{
        return "Le Pactole";
      }
      case "admin":{
        return "Le barreur";
      }
      case "level2":{
        return "Moussaillon";
      }
      case "level3":{
        return "Vigie";
      }
      case "level5":{
        return "Cannonier";
      }
      case "level4":{
        return "Timonier";
      }
      case "level6":{
        return "Capitaine";
      }
      case "level7":{
        return "Barbe Noir";
      }
      case "level_max":{
        return "Seigneur des pirates";
      }
      case "level1":{
        return "Marin d'eau douce";
      }

    }
  }
  getText(key: string){
    switch(key){
      case "destination":{
        return "Bien joué ! C'est ta destination qui a été choisi. Tu a su indiqué l'emplacement du trésor sur la carte. Tu es en bonne voie pour devenir un grand pirate."
      }
      case "date":{
        return "Tu es un as des as de l'organisation. "
      }
      case "winner":{
        return "Tu as le vent en poupe champion. "
      }
      case "loser":{
        return "Le Mutin";
      }
      case "budget":{
        return "Le Pactole";
      }
      case "admin":{
        return "Le barreur";
      }
      case "level2":{
        return "Moussaillon";
      }
      case "level3":{
        return "Vigie";
      }
      case "level5":{
        return "Cannonier";
      }
      case "level4":{
        return "Timonier";
      }
      case "level6":{
        return "Capitaine";
      }
      case "level7":{
        return "Barbe Noir";
      }
      case "level_max":{
        return "Seigneur des pirates";
      }
      case "level1":{
        return "Marin d'eau douce";
      }

    }
  }


}
