angular.module('starter.services')

.service('levelService', function(dao,statusService){
  //console.log("LevelService.js");
  
      this.cList=[];
      this.cItems=[];
      this.cData=[];
      this.levelData=[];
      this.currentList=[];
      this.currentItems=[];
      this.total=0;

      this.getTotal=function()
      {
          this.total=0;
          for(i=0;i<this.currentItems.length;i++)
          {
            this.total=this.total+parseInt(this.currentList[this.currentItems[i]]);
          }
      }
      this.initData=function()
      {
        //Load level 1 data
        var data={};
        data.list=statusService.mStatus;
        data.items=statusService.items;
        data.level=1;
        this.levelData["Level-1"]=data;

      }
      this.loadList=function()
      {
        var data={};
        levelNumber=dao.level.substr(6,1);
        ////console.log("#"+levelNumber);
        this.initData();

        for(var k=2;k<=levelNumber;k++)
        {
          //  //console.log("L:"+k);
            var catList=JSON.parse(localStorage.getItem("Level-"+k+"-cat"));
            var lst=[];
            ////console.log("catList"+catList);
            if(catList!=null)
            {
              for(var i=0;i<catList.length;i++)
              {
                var subList=JSON.parse(localStorage.getItem("Level-"+k+catList[i]));
              ////console.log("sublist"+subList);
                lst[catList[i]]=0;
                if(subList!=null)
                {
                  lst[catList[i]]=0;
                  x=k-1;
              ////console.log("x:"+x);
                  for(var j=0;j<subList.length;j++)
                  {
                ////console.log("lvlD"+this.levelData["Level-"+x]);
                ////console.log("value"+parseInt(this.levelData["Level-"+x].list[subList[j]]));

                    if(this.levelData["Level-"+x].list[subList[j]]!=null)
                    lst[catList[i]]=parseInt(lst[catList[i]])+parseInt(this.levelData["Level-"+x].list[subList[j]]);
                  }
                }
              ////console.log(catList[i]+" "+lst[catList[i]]);
              ////console.log("lst:"+lst);

              }
            }
            data.list=lst;
            data.itms=catList;
            data.level=levelNumber;
            this.levelData["Level-"+k]=data;

          }
          this.currentList=this.levelData[dao.level].list;
          this.currentItems=this.levelData[dao.level].itms;
          this.getTotal();
      /*  if(levelNumber>1)
        {
          var catList=JSON.parse(localStorage.getItem("Level-"+levelNumber+"-cat"));
          //console.log(statusService.mStatus);
          var levelData=[];
          lst=[];
          if(levelNumber==2)
          {
            for(var i=0;i<catList.length;i++)
            {
              var subList=JSON.parse(localStorage.getItem("Level-"+levelNumber+catList[i]));
              //console.log("sublist"+subList);
              lst[catList[i]]=0;
              for(var j=0;j<subList.length;j++)
              {
                //console.log("value"+parseInt(statusService.mStatus[subList[j]]));
                if(statusService.mStatus[subList[j]]!=null)
                lst[catList[i]]=parseInt(lst[catList[i]])+parseInt(statusService.mStatus[subList[j]]);
              }
              //console.log(catList[i]+" "+lst[catList[i]]);
              //console.log("lst:"+lst);
              data.list=lst;
              data.itms=catList;
              data.level=levelNumber;
              this.levelData.push(data);

            }
          }
          //console.log(catList);
        }*/
      }
      this.refresh=function()
      {

        this.loadList();
        this.currentList=this.levelData[dao.level].list;
        this.currentItems=this.levelData[dao.level].itms;
        this.getTotal();
      }


})
