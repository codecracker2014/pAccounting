angular.module('starter.services')

.service('trEventService',function(){


this.contacts=[];
this.loadContacts=function()
{
    this.contacts=JSON.parse(localStorage.getItem('contacts'));
}
this.saveContacts=function()
{
    localStorage.setItem('contacts',angular.toJson(this.contacts));
}
this.loadContacts();
})
