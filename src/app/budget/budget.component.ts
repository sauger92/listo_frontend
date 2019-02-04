import { GroupService } from './../services/group.service';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './../services/auth.service';
import {BudgetService}from './../services/budget.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss'],
  styles: [`
    .ng-valid { border-color: green; }
    .ng-invalid { border-color: red; }    
  `]
})
export class BudgetComponent implements OnInit {


  @Input() MoyenBudget: number;
  @Input() MyTotalBudgetPB: number;
  @Input() tripId: string;

  TotalVar : any;
  Modifiable : any;
  users: any[];
  table: any;
  bodyoff: any;
  UserNumber: any;
  Total : number;

  MoyenneTotal : number;
  MoyenneLoisir : number;
  MoyenneLogement : number;
  MoyenneTransport : number;
  
  GlobalTotal : number;
  GlobalLogement : number;
  GlobalTransport : number;
  GlobalLoisir : number;
  visibility = 'hidden';
  
  ArrayParametre: any[];
  ArrayMyListoBudget : any[];
  ArrayBudgetMoyen : any[];
  ArrayBudgetTotal : any[];
  
  
  
  MyLogement : number;
  MyTransport : number;
  MyLoisir : number;
  MyTotal : number;

  


  constructor(private authService : AuthService, private budgetService : BudgetService, private groupService : GroupService) { 

  }



  ngOnInit() {
    this.users = this.authService.users;
    this.ArrayParametre = ["Logement","Transport","Sur Place", "Total"] ;
    this.ArrayMyListoBudget = [0,0,0,0];
    this.ArrayBudgetMoyen =  [0,0,0,0]; 
    this.MyTotalBudgetPB = 0;
    this.MyLogement = 0;
    this.MyTransport = 0;
    this.MyLoisir = 0;
    this.UserNumber = 0;
    
    
    this.budgetService.GetMybudgetFromDatabase(this.tripId).then(
      () => {
        this.ArrayMyListoBudget = [this.budgetService.MyTransport, this.budgetService.MyLogement, this.budgetService.MyLoisir, this.budgetService.MyTotal];
        this.ArrayBudgetMoyen = [this.budgetService.MoyenneTransport, this.budgetService.MoyenneLogement,  this.budgetService.MoyenneLoisir,this.budgetService.MoyenneTotal];
        this.TotalandAverage();
      } 
    );

    this.groupService.affichageUserInGroup(this.tripId).then(
    ()=>{

      this.UserNumber = this.groupService.GroupLenght;
      this.TotalandAverage();
    }
    );

  
  }

  //MISE A JOURS DU TOTAL A CHAQUE MODIFICATION D'INPUTS
  MiseaJourTotal(form: NgForm)
  {
    const Transport =  form.value['Transport'];
    const Logement = form.value['Logement'];
    const Loisir = form.value['Loisir'];
    this.TotalVar = Transport + Logement + Loisir;

    this.MyLogement = Logement;
    this.MyTransport = Transport;
    this.MyLoisir = Loisir;
    this.MyTotal = this.TotalVar;


    this.MyTotalBudgetPB = this.TotalVar;

    
  }

  //VALIDE LE BUDGET ET LE GELE

  onCalcul(form: NgForm) {
    console.log(form.value);
    
    this.budgetService.SaveBudgetInDataBase(this.tripId,this.MyTransport,this.MyLogement,this.MyLoisir,this.MyTotal).then(
      () => {
        console.log ("budget fixed and send");
        document.getElementById("Transport").setAttribute('disabled','disabled'); 
        document.getElementById("Logement").setAttribute('disabled','disabled'); 
        document.getElementById("Loisir").setAttribute('disabled','disabled'); 
       
        this.ModifierTableau();
      } 
    );

    
  }

  //PERMET DE MODIFIER les INPUTS alors qu'elle sont Validé

  onModifier()
  {
    document.getElementById("Transport").removeAttribute("disabled"); 
    document.getElementById("Logement").removeAttribute("disabled"); 
    document.getElementById("Loisir").removeAttribute("disabled"); 
  }


  //CALCUL DU TOTAL des 3 types de dépenses 

  CalculeTotal(n1: number, n2:number , n3:number)
  {
    return n1+n2+n3;
  }

  //Calcule du total et moyenne

  TotalandAverage ()
  {


    this.Total = 0;
    
    this.GlobalLogement = 0;
    this.GlobalTransport = 0;
    this.GlobalLoisir = 0;
    this.GlobalTotal = 0;
    
    this.MoyenneTotal = 0;
    this.MoyenneLogement = 0;
    this.MoyenneTransport = 0;
    this.MoyenneLoisir = 0;



    this.MoyenneTotal  = this.budgetService.MoyenneTotal;
    this.MoyenneLogement = this.budgetService.MoyenneLogement;
    this.MoyenneTransport = this.budgetService.MoyenneTransport;
    this.MoyenneLoisir = this.budgetService.MoyenneLoisir;

    this.GlobalLogement = this.MoyenneLogement * this.UserNumber;
    this.GlobalTransport = this.MoyenneTransport * this.UserNumber;
    this.GlobalLoisir = this.MoyenneLoisir * this.UserNumber;
    this.GlobalTotal = this.GlobalLogement + this.GlobalTransport + this.GlobalLoisir;
    
  }

  //CREATION DU TABLEAU DYNAMIQUE : Chaque ligne = 1 participant
  // TABLEAU DU TYPE : USER, LOGEMENT ,TRANSPORTS ,LOISIR

  ModifierTableau()
  {
    this.budgetService.GetMybudgetFromDatabase(this.tripId).then(
      () => {

        this.ArrayMyListoBudget = [this.budgetService.MyTransport, this.budgetService.MyLogement, this.budgetService.MyLoisir, this.budgetService.MyTotal];
        this.ArrayBudgetMoyen = [this.budgetService.MoyenneTransport, this.budgetService.MoyenneLogement,  this.budgetService.MoyenneLoisir,this.budgetService.MoyenneTotal];
        
        this.TotalandAverage(); 
      } 
    );
 
  }

  getWidth(){
    return Math.round(100 * this.budgetService.MyTotal/this.GlobalTotal);
  
  }

  getWidth2(n1 : number, n2: number){
    return Math.round(100 * n1/n2);
  }

  getColor(){
    
    if(document.getElementById("MyBudgetProgressbar5")){
        return 'blue';
    }else if (document.getElementById("MyBudgetProgressbar6")) {
      return 'grey';
    }
    else if(document.getElementById("MyBudgetProgressbar7"))
    {
      return 'green'
    }

  }


}
