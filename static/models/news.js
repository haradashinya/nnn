
var NewsModel = function(){
    var em = new EventEmitter();
    var newsDispatcher = NewsDispatcher(em);

    var self = {
        name: "hello",
        currentNumber: 0,
        items: []
    };
    var pushToItems = function(data){
        data.forEach(function(d){
            self.items.push(d);
        },self);
        em.emit("render",self.items);
    };



    em.on("pushToItems",function(res){
        self.currentNumber -= 1;
        onCurrentNumber(self.currentNumber);
    },self);


    // if received currentNumber,then fetch the news.
    em.on("currentNumber",function(res){
        onCurrentNumber(self.currentNumber);
    });
    em.on("receivedNews",function(res){
        if (self.items.length === 0){
            pushToItems(res["data"]);
        }else {
            self.items = [];
            pushToItems(res["data"]);
            em.emit("hideMore");
        }
    });

    self.fetchLatest = function(callback){
        $.ajax({
            type: "GET",
            url: "http://pickalize.info:3001/latest_number",
            dataType: "json",
            success:function(data){
                self.currentNumber = data["data"];
                em.emit("currentNumber",data);
            }
        });

    };
    var onCurrentNumber = function(num){
        var requestNews = function(){
                    $.ajax({
            type: "GET",
            url: "http://pickalize.info:3001/latest/"+ num,
            dataType: "json",
            success:function(data){
                console.log(data);
                em.emit("receivedNews",data);
            }
        });

        };
        return requestNews();
    };





    return self;
};


var newsModel = new NewsModel();
newsModel.fetchLatest();
