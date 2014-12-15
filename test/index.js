var less = require("less");
var lessTest = require("less/test/less-test");
var lessTester = lessTest();
var plugin = require('../lib');
var stylize = less.lesscHelper.stylize;
var path = require("path");

console.log("\n" + stylize("LESS - Plugins", 'underline') + "\n");


function getErrorPathReplacementFunction(dir) {
    return function(input) {
        return input && input.replace(
                "{path}", path.join(process.cwd(), "/test/less/" + dir + "/"))
            .replace("{pathrel}", path.join("test", "less", dir + "/"))
            .replace("{pathhref}", "")
            .replace("{404status}", "")
            .replace(/\r\n/g, '\n');
    };
}


lessTester.runTestSet(
    { strictMath: true, relativeUrls: true, plugins: [plugin] },
    "property-order/");

lessTester.runTestSet(
    { strictMath: true, relativeUrls: true, plugins: [plugin] },
    "errors/", lessTester.testErrors, null, getErrorPathReplacementFunction("errors"));
