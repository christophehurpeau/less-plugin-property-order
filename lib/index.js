var getPropertyOrderVisitor = require("./property-order");

module.exports = {
    install: function(less, pluginManager) {
        var PropertyOrderVisitor = getPropertyOrderVisitor(less);
        pluginManager.addVisitor(new PropertyOrderVisitor());
    }
};
