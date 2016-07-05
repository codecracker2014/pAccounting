angular.module('starter.services')

.service('contactService',function(){


this.contacts=[];
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
