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
      case "level8":{
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
        return "Tu es un as des as de l'organisation. Vous n'avez qu'à dire une date et nous vous rejoindrons."
      }
      case "winner":{
        return "Tu as le vent en poupe champion. "
      }
      case "loser":{
        return "Tu n'as pas honte mutin ? Tu risque le suplice de la planche.";
      }
      case "budget":{
        return "En voila un qui à les bourses bien remplies. Ton coffre ne sera jamais vide. Mais gare aux autres pirates.";
      }
      case "admin":{
        return "Tu sais rassembler un équipe en moins de temps qu'il ne faut pour virer de bord.";
      }
      case "level2":{
        return "Tu crois que c'est parce que tu es monté en grade que tu vas arréter d'éplucher les patates ?";
      }
      case "level3":{
        return "Ne me dîtes pas que c'est un pavillon gaulois par pitié !";
      }
      case "level5":{
        return "Prêt a tiré ? Charger la poudre. Nan n'allumer pas votre pipe ... BOUUUUUM  ";
      }
      case "level4":{
        return "Essayer de synchroniser vos titubements avec le roulis pour que nous avancions un minimum droit.";
      }
      case "level6":{
        return "Eh bah dis donc ! Qui aurait cru que vous arriveriez aussi loin. Vous avez pris du galon mon capitaine. ";
      }
      case "level7":{
        return "Vous êtes la terreur des mers. Votre flotte impressionne tous les empires. Vous effrayer absolument tous les pirates sauf un ...";
      }
      case "level8":{
        return "Personne ne pensait cela possible. Vous êtes celui qu'on cite pour effrayer les enfants. Vous êtes un mythes pour les marins jusqu'à ce qu'ils vous rencontrent et gouttent à la lame glaçé de votre sabre.";
      }
      case "level1":{
        return "N'oublie pas tes brassards Morbleu !";
      }

    }
  }


}
