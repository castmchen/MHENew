import { Component, OnInit, TemplateRef } from '@angular/core';
import { TankModel, TriggerModel, ActionModel, FlowModel, FlowActionModel } from '../model/tank-model';
import { TankService } from '../service/tank-service.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-app-management',
  templateUrl: './app-management.component.html',
  styleUrls: ['./app-management.component.css']
})
export class AppManagementComponent implements OnInit {


  constructor(private tankService: TankService, private modalService: BsModalService) { }
  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };
  ngOnInit(){
    this.Build();
  }

  public Containers: Array<TankModel>;
  public newOneFlag: boolean = false;
  public newContainer: TankModel;
  public newTrigger: TriggerModel;
  public newAction: ActionModel;
  Build = function (){
    this.Containers = this.tankService.InitData();
  };

  addNewContainer = function(newContainerTemplate: TemplateRef<any>){
    this.BuildNewContainer();
    this.modalRef = this.modalService.show(newContainerTemplate, this.config);
  }

  addNewTrigger = function(){
    if(this.newContainer.Triggers == null || typeof(this.newContainer.Triggers) == undefined){
      this.newContainer.Triggers = new Array<TriggerModel>();
    }
     this.newTrigger =  new TriggerModel();
     this.newTrigger.TankId = this.newContainer.Id;
     this.newTrigger.Id = this.newContainer.Triggers.length > 0 ? this.newContainer.Triggers[this.newContainer.Triggers.length-1] : 1;
  }

  saveNewTrigger = function(){
    this.newContainer.Triggers.push(this.newTrigger);
    this.newTrigger = null;
  }

  addNewAction = function(triggerId : any){
    if(this.newContainer.Actions == null || typeof(this.newContainer.Actions) == undefined){
      this.newContainer.Actions = new Array<ActionModel>();
    }
    this.newAction = new ActionModel();
    this.newAction.TankId = this.newContainer.Id;
    this.newAction.TriggerId = triggerId;
    this.newAction.Id =  this.newContainer.Actions.length > 0 ? this.newContainer.Actions[this.newContainer.Actions.length-1] : 1;
  }

  saveNewAction = function(){
    this.newContainer.Actions.push(this.newAction);
    this.newAction = null;
  }

  BuildNewContainer = function(){
    this.newContainer = new TankModel();
    this.newContainer.Id = this.Containers[this.Containers.length - 1].Id + 1;
    this.newOneFlag = true;
  }

  saveNewContainer = function(){
    this.Containers.unshift(this.newContainer);
    debugger;
    // this.Containers.push(this.newContainer);
    this.closeContainer();
  }

  closeContainer = function(){
    this.modalRef.hide();
  }

}
