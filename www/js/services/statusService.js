angular.module('starter.services')

.service('statusService', function(dao){
		this.items=[];
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
    this.startDate=new Date();
    this.startDate.setDate(1);
    this.endDate=new Date();

		this.monthlyStatus=function()
		{
			var st=[];

//      console.log("st"+st);
			var keys=JSON.parse(localStorage.getItem("keys"));
			if(keys!=null)
			{
				keys=generateKeys(this.startDate,this.endDate);
				console.log(keys);
			}
			else {
				return;
			}
      this.total=0;
			this.fr=[];
      for(var i=0;i<keys.length;i++)
			{
				var logs=JSON.parse(localStorage.getItem(keys[i]));
        if(logs==null)
				    continue;
        console.log(logs+" , "+keys[i]);
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
			this.width="300px";idth="300px";
      this.height="100%";
      console.log("points"+this.dataPoints);
			
      createChart("chartContainer","Expense chart",this.dataPoints);
      this.width="300px";
      this.height="100%";
			this.mStatus= st;
			dao.itmList=this.items;
		}
		this.monthlyStatusI=function()
		{
						var st=[];

			//      console.log("st"+st);
						var keys=JSON.parse(localStorage.getItem("ikeys"));
						if(keys!=null)
			      keys=generateKeys(this.startDate,this.endDate);
						else {
							return;
						}
			      this.totalI=0;
						this.frI=[];
			      for(var i=0;i<keys.length;i++)
						{
							var logs=JSON.parse(localStorage.getItem("i"+keys[i]));
							if(logs==null)
									continue;

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
    }
    this.refresh=function()
    {
      console.log("Refreshing");
      this.items=[];
      this.dataPoints=[];
      this.mStatus=[];
      try{
      this.monthlyStatus();
			this.monthlyStatusI();
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
