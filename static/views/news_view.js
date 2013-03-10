var NewsView = function(em,data){
    var self = this;
    self.template = "";

    self.render = function(){
        // inject data into main-view .content
//        var d = $("#main-view").find(".content");
        var opts = {
            content: data["content"],
            href: data["href"].replace('"','',"gim"),
            cls: "items"
        };
        self.template = _.template('<li class="<%= cls %>" data-href="<%= href %>"><a href="<%= href %>"><%= content %></a></li>',opts);
        return self;
    };











    return self;
};
