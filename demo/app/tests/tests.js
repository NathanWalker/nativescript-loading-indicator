var LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;
var loadingIndicator = new LoadingIndicator();

describe("greet function", function() {
    it("exists", function() {
        expect(loadingIndicator.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(loadingIndicator.greet()).toEqual("Hello, NS");
    });
});