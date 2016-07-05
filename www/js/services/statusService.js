angular.module('starter.services')

.service('statusService', function(dao){
		this.items=[];
<<<<<<< HEAD
		this.itemsI=[];
    this.dataPoints=[];
		this.dataPointsI=[];
    this.mStatus=[];
		this.mStatusI=[];
    this.total=0;
		this.totalI=0;
    this.width="300px";
    this.height="100%";
    this.fr=[];
		this.frI=[];
=======
    this.dataPoints=[];
    this.mStatus=[];
    this.total=0;
    this.width="300px";
    this.height="100%";
    this.fr=[];
>>>>>>> 64cfcf48d717ff02916c9f4570b85c864e521c18
    this.startDate=new Date();
    this.startDate.setDate(1);
    this.endDate=new Date();

		this.monthlyStatus=function()
		{
			var st=[];

//      console.log("st"+st);
			var keys=JSON.parse(localStorage.getItem("keys"));
<<<<<<< HEAD
			if(keys!=null)
      keys=filterKeys(keys,this.startDate,this.endDate);
			else {
				return;
			}
=======
      keys=filterKeys(keys,this.startDate,this.endDate);
>>>>>>> 64cfcf48d717ff02916c9f4570b85c864e521c18
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
<<<<<<< HEAD
			this.width="300px";idth="300px";
      this.height="100%";
      console.log("points"+this.dataPoints);
      createChart("chartContainer","Expense chart",this.dataPoints);
=======
      this.width="300px";
      this.height="100%";
      console.log("points"+this.dataPoints);
      createChart("Expense chart",this.dataPoints);
>>>>>>> 64cfcf48d717ff02916c9f4570b85c864e521c18
      this.width="300px";
      this.height="100%";
			this.mStatus= st;
			dao.itmList=this.items;
<<<<<<< HEAD
		}
		this.monthlyStatusI=function()
		{
						var st=[];

			//      console.log("st"+st);
						var keys=JSON.parse(localStorage.getItem("ikeys"));
						if(keys!=null)
			      keys=filterKeys(keys,this.startDate,this.endDate);
						else {
							return;
						}
			      this.totalI=0;
						this.frI=[];
			      for(var i=0;i<keys.length;i++)
						{
							var logs=JSON.parse(localStorage.getItem(keys[i]));


							for(var j=0;j<logs.length;j++)
							{
			          if(this.itemsI.indexOf(logs[j].name)==-1)
			          this.itemsI.push(logs[j].name);

			          if(st[logs[j].name]==null)
			          {
			              st[logs[j].name]=0;
			          }
								st[logs[j].name]=parseInt(st[logs[j].name])+parseInt(logs[j].amount);
			          this.totalI=this.totalI+parseInt(logs[j].amount);
			          if(this.frI[logs[j].name]!=null)
			              this.frI[logs[j].name]=parseInt(this.frI[logs[j].name])+1;
			          else {
			            this.frI[logs[j].name]=1;
			          }
							}
						}
			      for(var i=0;i<this.itemsI.length;i++)
			      {
			            var obj={};
			//            console.log(this.items[i]);
			          this.dataPointsI.push({y:st[this.itemsI[i]],indexLabel:this.itemsI[i]});
			      }

      this.width="300px";
      this.height="100%";
      console.log("points"+this.dataPointsI);
      createChart("chartContainerI","Income chart",this.dataPointsI);
      this.width="300px";
      this.height="100%";
			this.mStatusI= st;
			dao.itmListI=this.itemsI;
=======
>>>>>>> 64cfcf48d717ff02916c9f4570b85c864e521c18
    }
    this.refresh=function()
    {
      console.log("Refreshing");
      this.items=[];
      this.dataPoints=[];
      this.mStatus=[];
      try{
      this.monthlyStatus();
<<<<<<< HEAD
			this.monthlyStatusI();
=======
>>>>>>> 64cfcf48d717ff02916c9f4570b85c864e521c18
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
