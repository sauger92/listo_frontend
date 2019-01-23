import { Component,Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GroupService } from './../services/group.service';
import {ListService} from './../services/list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  group: any[];
  TodoList : any[];
  table: any;
  @Input() tripId: string;
  @Input() userName: string;

  constructor(private groupService : GroupService, private listservice : ListService) { }

  ngOnInit() {
    this.TodoList = this.listservice.TodoList;
    this.groupService.AffichageUserInGroup(this.tripId).then(
      () => {
        console.log (this.groupService.Group);
        this.group = this.groupService.Group;
      } 
    );
    //this.CreateTodoList(this.TodoList);
  
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    const Task = form.value['task'];
  
    const Responsable = form.value['responsable'];
    const ListType = form.value['listtype'];
 
      this.listservice.AddTaskinList(Task,Responsable,ListType);
      this.CreateList(this.TodoList,ListType);
  }

  OnDelete()
  {
    //List.splice(0);
  }

  CreateList(List : any[], ListType: string)
  {
    if (ListType == "TodoList")
        {
          this.table = document.getElementById("MytableTodoList");
        }
        else if (ListType == "BringList")
        {   
          this.table = document.getElementById("MytableBringList");
        }

    //this.table = document.getElementById("MytableTodoList");
    
    
    var body = this.table.createTBody();
    

    for(var i=0; i<List.length;i++)
    {
      var nouvelleLigne = body.insertRow(i);
      nouvelleLigne.style.border = "1px solid black"; 

      var nouvelleCellule0 = nouvelleLigne.insertCell(0);
      nouvelleCellule0.innerHTML = List[i].task;

      var nouvelleCellule1 = nouvelleLigne.insertCell(1);
      nouvelleCellule1.innerHTML = List[i].responsable;

      var nouvelleCellule2 = nouvelleLigne.insertCell(2);
      nouvelleCellule2.innerHTML = List[i].status;

      var nouvelleCellule3 = nouvelleLigne.insertCell(3);
      nouvelleCellule3.insertAdjacentHTML('afterbegin', '<div id="OptionCell"><div><input type="checkbox" id="status" name="status"><label for="status">Task Done</label></div><button class="btn btn-lg btn-primary"  (click)="OnDelete()">Delete</button></div>');  
      

     
    }
    

  }

}
