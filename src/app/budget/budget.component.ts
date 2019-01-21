import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './../services/auth.service';

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

  TotalVar : any;
  Modifiable : any;
  users: any[];
  table: any;
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


  constructor(private authService : AuthService) { 

  }



  ngOnInit() {
    this.users = this.authService.users;
    this.ArrayParametre = ["Logement","Transport","Sur Place", "Total"] ;
  
  }

  //MISE A JOURS DU TOTAL A CHAQUE MODIFICATION D'INPUTS
  MiseaJourTotal(form: NgForm)
  {
    console.log("Enter in MAJ");
    const Transport =  form.value['Transport'];
    const Logement = form.value['Logement'];
    const Loisir = form.value['Loisir'];
    this.TotalVar = Transport + Logement + Loisir;

    this.MyLogement = Logement;
    this.MyTransport = Transport;
    this.MyLoisir = Loisir;
    this.MyTotal = this.TotalVar;
  }

  //VALIDE LE BUDGET ET LE GELE

  onCalcul(form: NgForm) {
    console.log(form.value);
    
    if(confirm('Etes-vous sûr de vouloir bloquer votre budget ?')) {
      console.log("Budget Fixé")
      document.getElementById("Transport").setAttribute('disabled','disabled'); 
      document.getElementById("Logement").setAttribute('disabled','disabled'); 
      document.getElementById("Loisir").setAttribute('disabled','disabled'); 
    } else {
      return null;
    }
    
    this.visibility = 'visible';
    this.ModifierTableau();
  }

  //PERMET DE MODIFIER les INPUTS alors qu'elle sont Validé

  onModifier()
  {
    document.getElementById("Transport").removeAttribute("disabled"); 
    document.getElementById("Logement").removeAttribute("disabled"); 
    document.getElementById("Loisir").removeAttribute("disabled"); 
  }

  getVisibility(){
    return this.visibility;
  }

  //CALCUL DU TOTAL des 3 types de dépenses 

  CalculeTotal(n1: number, n2:number , n3:number)
  {
    return n1+n2+n3;
  }

  //Calcule du total et moyenne

  TotalandAverage ()
  {
    this.UserNumber = 0;
    this.Total = 0;
    this.GlobalLogement = 0;
    this.GlobalTransport = 0;
    this.GlobalLoisir = 0;
    this.GlobalTotal = 0;
    this.MoyenneTotal = 0;
    this.MoyenneLogement = 0;
    this.MoyenneTransport = 0;
    this.MoyenneLoisir = 0;

    for (let user in this.users)
    {
    
      this.GlobalLogement += parseInt(this.users[user].logement);
      this.GlobalTransport += parseInt(this.users[user].transport);
      this.GlobalLoisir += parseInt(this.users[user].loisir);
      this.Total = this.CalculeTotal(parseInt(this.users[user].logement),parseInt(this.users[user].transport),parseInt(this.users[user].loisir));
      this.GlobalTotal += this.Total; 
      this.UserNumber++;
    }

    this.MoyenBudget = this.GlobalTotal/this.UserNumber;
    this.MoyenneTotal  = this.GlobalTotal/this.UserNumber;
    this.MoyenneLogement = this.GlobalLogement/this.UserNumber;
    this.MoyenneTransport = this.GlobalTransport/this.UserNumber;
    this.MoyenneLoisir = this.GlobalLoisir/this.UserNumber;
    
  }

  //CREATION DU TABLEAU DYNAMIQUE : Chaque ligne = 1 participant
  // TABLEAU DU TYPE : USER, LOGEMENT ,TRANSPORTS ,LOISIR

  ModifierTableau()
  {
    this.table = document.getElementById("Mytable");
    var body = this.table.createTBody();

     this.TotalandAverage();
     console.log("Logement Moyenne: "+this.MoyenneLogement);
     console.log("Loisir Moyenne: "+this.MoyenneLoisir);
     console.log("Transport Moyenne: "+this.MoyenneTransport); 
     console.log("Budget Total Moyenne: "+this.MoyenneTotal ); 
     console.log("Logement Total: "+this.GlobalLogement);
     console.log("Loisir Total: "+this.GlobalLoisir);
     console.log("Transport Total: "+this.GlobalTransport);

     this.ArrayMyListoBudget = [this.MyTransport, this.MyLogement, this.MyLoisir, this.MyTotal];
     this.ArrayBudgetMoyen = [this.MoyenneTransport,this.MoyenneLogement, this.MoyenneLoisir,this.MoyenneTotal];
     this.ArrayBudgetTotal = [this.GlobalTransport,this.GlobalLogement, this.GlobalLoisir, this.GlobalTotal];
     
     
     for (var i = 0; i < this.ArrayParametre.length; i++) {
        var nouvelleLigne = body.insertRow(i);
        //nouvelleLigne.style.backgroundColor = "#829eeb";
        nouvelleLigne.style.border = "1px solid black"; 
      
        var nouvelleCellule0 = nouvelleLigne.insertCell(0);
        nouvelleCellule0.innerHTML = this.ArrayParametre[i];
        nouvelleCellule0.style.border = "1px solid black"; 

        var nouvelleCellule1 = nouvelleLigne.insertCell(1);
        nouvelleCellule1.innerHTML = this.ArrayMyListoBudget[i];
        nouvelleCellule1.style.border = "1px solid black"; 

        var nouvelleCellule2 = nouvelleLigne.insertCell(2);
        nouvelleCellule2.innerHTML = this.ArrayBudgetMoyen[i];
        nouvelleCellule2.style.border = "1px solid black"; 
        
        var nouvelleCellule3 = nouvelleLigne.insertCell(3)
        nouvelleCellule3.innerHTML = this.ArrayBudgetTotal[i];
        nouvelleCellule3.style.border = "1px solid black";


      }


  


  }

}
