var order = [
    'position',
    'top',
    'right',
    'bottom',
    'left',
    'z-index',
    'display',
    'float',
    'width',
    'height',
    'max-width',
    'max-height',
    'min-width',
    'min-height',
    'padding',
    'padding-top',
    'padding-right',
    'padding-bottom',
    'padding-left',
    'margin',
    'margin-top',
    'margin-right',
    'margin-bottom',
    'margin-left',
    'margin-collapse',
    'margin-top-collapse',
    'margin-right-collapse',
    'margin-bottom-collapse',
    'margin-left-collapse',
    'overflow',
    'overflow-x',
    'overflow-y',
    'clip',
    'clear',
    'font',
    'font-family',
    'font-size',
    'font-smoothing',
    'osx-font-smoothing',
    'font-style',
    'font-weight',
    'hyphens',
    'src',
    'line-height',
    'letter-spacing',
    'word-spacing',
    'color',
    'text-align',
    'text-decoration',
    'text-indent',
    'text-overflow',
    'text-rendering',
    'text-size-adjust',
    'text-shadow',
    'text-transform',
    'word-break',
    'word-wrap',
    'white-space',
    'vertical-align',
    'list-style',
    'list-style-type',
    'list-style-position',
    'list-style-image',
    'pointer-events',
    'cursor',
    'background',
    'background-attachment',
    'background-color',
    'background-image',
    'background-position',
    'background-repeat',
    'background-size',
    'border',
    'border-collapse',
    'border-top',
    'border-right',
    'border-bottom',
    'border-left',
    'border-color',
    'border-image',
    'border-top-color',
    'border-right-color',
    'border-bottom-color',
    'border-left-color',
    'border-spacing',
    'border-style',
    'border-top-style',
    'border-right-style',
    'border-bottom-style',
    'border-left-style',
    'border-width',
    'border-top-width',
    'border-right-width',
    'border-bottom-width',
    'border-left-width',
    'border-radius',
    'border-top-right-radius',
    'border-bottom-right-radius',
    'border-bottom-left-radius',
    'border-top-left-radius',
    'border-radius-topright',
    'border-radius-bottomright',
    'border-radius-bottomleft',
    'border-radius-topleft',
    'content',
    'quotes',
    'outline',
    'outline-offset',
    'opacity',
    'filter',
    'visibility',
    'size',
    'zoom',
    'transform',
    'box-align',
    'box-flex',
    'box-orient',
    'box-pack',
    'box-shadow',
    'box-sizing',
    'table-layout',
    'animation',
    'animation-delay',
    'animation-duration',
    'animation-iteration-count',
    'animation-name',
    'animation-play-state',
    'animation-timing-function',
    'animation-fill-mode',
    'transition',
    'transition-delay',
    'transition-duration',
    'transition-property',
    'transition-timing-function',
    'background-clip',
    'backface-visibility',
    'resize',
    'appearance',
    'user-select',
    'interpolation-mode',
    'direction',
    'marks',
    'page',
    'set-link-source',
    'unicode-bidi',
    'speak'
];

var hackPrefixes = [
    '_', // ie7
    '*' // ie6
];

var HACK_PREFIX = new RegExp('^(' + hackPrefixes.join('|').replace(/[-[\]{}()*+?.,\\^$#\s]/g, "\\$&") + ')');

module.exports = function(less) {
    function PropertyOrder() {
        this._visitor = new less.visitors.Visitor(this);
    }

    PropertyOrder.prototype = {
        isReplacing: false,
        isPreEvalVisitor: true,
        run: function (root) {
            return this._visitor.visit(root);
        },
        visitRuleset: function (rulesetNode, visitArgs) {
            if (! rulesetNode.root) {
                var nodeRules = rulesetNode.rules;
                var lastIndex = -1;
                nodeRules.forEach(function(rule) {
                    // console.log(nodeRules);
                    if (rule.name.length > 1) {
                        console.log(rule);
                    }
                    var ruleName = rule.name[0].value;
                    var indexInOrder = order.indexOf(ruleName);
                    if (indexInOrder === -1) {
                        return;
                    }
                    if (lastIndex > indexInOrder) {
                        throw {
                            message: ruleName + ' should be before ' + order[lastIndex],
                            index: rule.index,
                            filename: rule.currentFileInfo ? rule.currentFileInfo.filename : null
                        };
                    }
                    lastIndex = indexInOrder;
                });
            }
        }
    };
    return PropertyOrder;
};
