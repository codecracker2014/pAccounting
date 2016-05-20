angular.module('starter.services')

.service('planningService',function(){

    this.flag=false;
    this.flag1="Hello"
    this.flag2=this.flag1;
    this.obj={"name":"Gajendra","age":20};
    this.obj2=this.obj;
    this.change=function()
    {
        this.flag=true;
        this.flag1="Hi";
    }
})
