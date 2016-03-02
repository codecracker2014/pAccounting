angular.module('starter.services')

.service('statusService', function(dao){
		this.items=[];
    this.dataPoints=[];
    this.mStatus=[];
    this.total=0;
    this.width="300px";
    this.height="100%";
    this.fr=[];
    this.startDate=new Date();
    this.startDate.setDate(1);
    this.endDate=new Date();

		this.monthlyStatus=function()
		{
			var st=[];

//      console.log("st"+st);
			var keys=JSON.parse(localStorage.getItem("keys"));
      keys=filterKeys(keys,this.startDate,this.endDate);
      this.total=0;
			this.fr=[];
      for(var i=0;i<keys.length;i++)
			{
				var logs=JSON.parse(localStorage.getItem(keys[i]));


				for(var j=0;j<logs.length;j++)
				{
          if(this.items.indexOf(logs[j].name)==-1)
          this.items.push(logs[j].name);

          if(st[logs[j].name]==null)
          {
              st[logs[j].name]=0;
          }
					st[logs[j].name]=parseInt(st[logs[j].name])+parseInt(logs[j].amount);
          this.total=this.total+parseInt(logs[j].amount);
          if(this.fr[logs[j].name]!=null)
              this.fr[logs[j].name]=parseInt(this.fr[logs[j].name])+1;
          else {
            this.fr[logs[j].name]=1;
          }
				}
			}
      for(var i=0;i<this.items.length;i++)
      {
            var obj={};
//            console.log(this.items[i]);
          this.dataPoints.push({y:st[this.items[i]],indexLabel:this.items[i]});
      }
      this.width="300px";
      this.height="100%";
      console.log("points"+this.dataPoints);
      createChart("Expense chart",this.dataPoints);
      this.width="300px";
      this.height="100%";
			this.mStatus= st;
			dao.itmList=this.items;
    }
    this.refresh=function()
    {
      console.log("Refreshing");
      this.items=[];
      this.dataPoints=[];
      this.mStatus=[];
      try{
      this.monthlyStatus();
    }catch(err){
      this.items=[];
      this.dataPoints=[];
      this.mStatus=[];

    }
      dao.loadSaved();
      console.log("p:"+this.dataPoints);
    //  createChart("Expense chart",this.dataPoints);
    }
});
