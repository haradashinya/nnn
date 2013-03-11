var NewsCollectionView = function(em){
    var self = this;
    self.items = [];
    // go to detail page.
    em.on("tap",function(d){
        console.log(d);
    });
    em.on("hideMore",function(res){
        $(".selectedMore").hide();
    });
    self.render = function(items){
        var d = $("#main-view").find(".content");
        items.forEach(function(item){
            var newsView = NewsView(em,item);
            var t = $(newsView.render().template);
            d.append(t);
        },self);
        d.append("<li class='more'>Load More...</li>");
        // if render template method is finished , then watch event.
        em.emit("endTemplate",null);
    };

    em.on("endTemplate",function(res){
        // manage news Items.
        $(".items").off("touchstart");
        $(".items").on("touchstart",function(e){
            e.preventDefault();
            alert("super ");
            var $this = $(this);

            var href = $this.data("href");
            $this.addClass("selected");

//            window.location.href = href;
        },self);






        $(".more").on("touchstart",function(e){
            console.log("Start");
            $(".more").off("touchstart");
            var $this = $(this);
            $this.addClass("selectedMore");
            console.log("clicked");
            em.emit("pushToItems",null);
            $(".selectedMore").html("Loading...");
        },self);

        });









    return self;
};