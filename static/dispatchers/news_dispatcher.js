var NewsDispatcher = function(em){
    var self = this;

    console.log(em);
    em.on("render",function(d){
        var newsCollectionView = NewsCollectionView(em);
        newsCollectionView.render(d);
    });

    return self;
};
