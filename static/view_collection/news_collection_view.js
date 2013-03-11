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
        $(".items").off("tap");
        $(".items").on("tap",function(e){
            var $this = $(this);
            e.preventDefault();
            var href = $this.data("href");
            $this.addClass("selected");
            $("#main-view").animate({
                opacity: 0.0
            },500,"ease-out");
            window.location.href = href;
        },self);



        // manage more button.
        $(".more").on("tap",function(e){
            $(".more").off("tap");
            console.log("tapped");
            var $this = $(this);
            $this.addClass("selectedMore");
            em.emit("pushToItems",null);
            $(".selectedMore").html("Loading...");
        },self);




    });







    return self;
};