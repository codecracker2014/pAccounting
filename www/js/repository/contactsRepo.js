angular.module('starter.services')

.service('contactsRepo',function($cordovaContacts){


this.contacts=[];
this.contacts.refresh=false;
this.phoneContacts=[];
this.find=function()
{

}

this.loadContacts=function()
{

    this.contacts=JSON.parse(localStorage.getItem('contacts'));
    if(this.contacts==null||this.contacts.length==0)
    {
      this.fetchContacts();
    }
}
this.saveContacts=function(contacts)
{
    localStorage.setItem('contacts',angular.toJson(contacts));
}
this.onSuccess=function(pContacts) {
  alert('Total contacts r '+pContacts.length)
  var contacts=[];
  for (var i = 0; i < pContacts.length; i++)
  {
    try{
      if(pContacts[i]!=null&&pContacts[i].phoneNumbers!=null && pContacts[i].name!=null && pContacts[i].phoneNumbers[0]!=null&&pContacts[i].phoneNumbers[0].value!=null)
     {
      var contact = {"name":pContacts[i].name.formatted,"mob":pContacts[i].phoneNumbers[0].value};
      //alert("Adding "+contact.name);

      contacts.push(contact);

     }
     else {
     }
   }catch(err)
   {
     alert(err.message);
   }

  }
  alert(angular.toJson(contacts));
  localStorage.setItem('contacts',angular.toJson(contacts));
  localStorage.setItem('refrCnt',"false");
 };
this.onError=function(contactError) {
       alert(contactError);
};

this.fetchContacts=function()
{
  var options = {};
  $cordovaContacts.find(options).then(this.onSuccess, this.onError);
  this.contacts=JSON.parse(localStorage.getItem('contacts'));
}
this.loadContacts();
})
