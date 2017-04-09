angular.module('starter.services')

.service('eventsRepo',function($cordovaContacts){
  //console.log("eventsRepoService.js");
  

this.contacts=[];
this.formDate=new Date();
this.find=function()
{

}

this.loadContacts=function()
{
    this.contacts=JSON.parse(localStorage.getItem('contacts'));

}
this.saveContacts=function(contacts)
{

    localStorage.setItem('contacts',angular.toJson(contacts));
}
this.loadContacts();
})
