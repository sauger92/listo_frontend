import { Component,Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GroupService } from './../services/group.service';
import {ListService} from './../services/list.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  group: any[];
  TodoList : any[];
  BringList : any[];
  table: any;
  StatusTrue : boolean;
  @Input() tripId: string;
  @Input() userName: string;
  ListTypeTodo : string;
  ListTypeBring : string;
 list: string;



  constructor(private groupService : GroupService, private listservice : ListService, private route: ActivatedRoute) {
    this.list = "list";
   }

  ngOnInit() {

    this.ListTypeBring ="bringList";
    this.ListTypeTodo = "toDoList";
    this.StatusTrue = true;
    
    

    this.groupService.affichageUserInGroup(this.tripId).then(
      () => {
        this.group = this.groupService.Group;
      } 
    );

    this.listservice.GetListinDataBase(this.tripId,"toDoList").then(
      () => {
        console.log("inside Get Todo List");
        this.TodoList = this.listservice.TodoList;
        } 
    );

    this.listservice.GetListinDataBase(this.tripId,"bringList").then(
      () => {
        console.log("inside Get Bring List");
        this.BringList = this.listservice.BringList;
        } 
    );
  
  }

  onSubmit(form: NgForm) {
    


    const Task = form.value['task'];
    const Responsable = form.value['responsable'];
    const Difficulté = form.value['difficulte'];
    const ListType = form.value['listtype'];

    console.log('Responsable IN LIST: ', Responsable);
    console.log('Responsable IN LIST: ', typeof Responsable);
    

      this.listservice.AddTaskinDataBase(Task,Responsable,ListType,Difficulté,this.tripId).then(
        () => {
          console.log ("AJOUT ITEMS LIST" + ListType);
          this.listservice.GetListinDataBase(this.tripId,"toDoList").then(
            () => {
              console.log("inside Get Todo List");
              this.TodoList = this.listservice.TodoList;
              console.log('this.TodoList: ', this.TodoList);
              } 
          );
      
          this.listservice.GetListinDataBase(this.tripId,"bringList").then(
            () => {
              console.log("inside Get Bring List" );
              this.BringList = this.listservice.BringList;
              console.log('this.BringList: ', this.BringList);
              } 
          );
        } 
      );


  }

  OnDelete(id : string, ListType : string)
  {

    this.listservice.DeleteItemsListinDataBase(this.tripId,ListType,id).then(
      () => {
        console.log("Delete Element " + ListType);
        this.listservice.GetListinDataBase(this.tripId,"toDoList").then(
          () => {
            console.log("inside Get Todo List");
            this.TodoList = this.listservice.TodoList;
            } 
        );
    
        this.listservice.GetListinDataBase(this.tripId,"bringList").then(
          () => {
            console.log("inside Get Bring List");
            this.BringList = this.listservice.BringList;
            } 
        );
        } 
    );

    this.listservice.GetListinDataBase(this.tripId,"toDoList").then(
      () => {
        console.log("inside Get Todo List");
        this.TodoList = this.listservice.TodoList;
        } 
    );

    this.listservice.GetListinDataBase(this.tripId,"bringList").then(
      () => {
        console.log("inside Get Bring List");
        this.BringList = this.listservice.BringList;
        } 
    );

  
  }

  OnDone(id : string,  ListType : string, Task:string, Responsable: string, Difficulté : number, StatusChange:boolean)
  {
    this.listservice.ModifyItemsListinDataBase_Done(this.tripId,ListType,id,Task,Responsable,Difficulté,StatusChange).then(
      () => {
        console.log("Modify the status");
        
        this.listservice.GetListinDataBase(this.tripId,"toDoList").then(
          () => {
            console.log("inside Get Todo List");
            this.TodoList = this.listservice.TodoList;
            } 
        );
    
        this.listservice.GetListinDataBase(this.tripId,"bringList").then(
          () => {
            console.log("inside Get Bring List");
            this.BringList = this.listservice.BringList;
            } 
        );

        } 
    );
     
  }

  onModify(form: NgForm, id : string,  ListType : string, StatusChange:boolean)
  {
    const Task = form.value['task'];
    const Responsable = form.value['responsable'];
    const Difficulté = form.value['difficulte'];

    this.listservice.ModifyItemsListinDataBase_Done(this.tripId,ListType,id,Task,Responsable,Difficulté,StatusChange).then(
      () => {
        console.log("Modify the status");
        
        this.listservice.GetListinDataBase(this.tripId,"toDoList").then(
          () => {
            console.log("inside Get Todo List");
            this.TodoList = this.listservice.TodoList;
            } 
        );
    
        this.listservice.GetListinDataBase(this.tripId,"bringList").then(
          () => {
            console.log("inside Get Bring List");
            this.BringList = this.listservice.BringList;
            } 
        );

        } 
    );
  }



}
