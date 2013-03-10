var NewsDispatcher = function(em){
    var self = this;

    em.on("render",function(d){
        var newsCollectionView = NewsCollectionView(em);
        newsCollectionView.render(d);
    });

    return self;
};
