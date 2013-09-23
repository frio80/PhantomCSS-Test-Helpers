'use strict';

var test_structures = {};

exports.getStructures = function() {
    return test_structures;
};

exports.getTest = function(name) {
    return test_structures[name];
};

/**
 * PhantomCSS test structure that will wait for an
 * element and then take a snapshot of an element
 *
 * @param selector
 * @param timeToWait
 * @param hideSelector
 * @param name
 * @returns {Function}
 */
test_structures.findAndShoot = function(selector, timeToWait, hideSelector, name) {
    var selector_config = {
        "object" : function setUp(obj) {
            return {
                find : obj.find,
                shoot : obj.shoot
            };
        },
        "string" : function setUp(s) {
            return {
                find : s,
                shoot : s
            };
        }
    };
    var selectors = selector_config[typeof selector](selector);

    return function(phantomcss, casper) {
        return function() {
            casper.waitForSelector(selectors.find,
                function success() {
                    phantomcss.screenshot(selectors.shoot, timeToWait, hideSelector, name);
                },
                function timeout() {
                    casper.test.fail('Should see ' + name);
                }
            );
        };
    };
};

/**
 * PhantomCSS test structure that will wait for an element,
 * type into an element and then take a snapshot of an element
 *
 * @param selector
 * @param timeToWait
 * @param hideSelector
 * @param name
 * @returns {Function}
 */
test_structures.findTypeAndShoot = function(selector, timeToWait, hideSelector, name) {
    var selector_config = {
        "object" : function setUp(obj) {
            return {
                find : obj.find,
                type : obj.type,
                shoot : obj.shoot
            };
        },
        "string" : function setUp(s) {
            return {
                find : s,
                type : s,
                shoot : s
            };
        }
    };
    var selectors = selector_config[typeof selector](selector);

    return function(phantomcss, casper) {
        return function() {
            casper.waitForSelector(selectors.find,
                function success() {
                    casper.sendKeys(selectors.type, key);
                    phantomcss.screenshot(selector.shoot, name);
                },
                function timeout() {
                    casper.test.fail('Should see ' + name);
                }
            );
        };
    };
};

/**
 * PhantomCSS test structure that will wait for an element,
 * click an element and then take a snapshot of an element
 *
 * @param selector
 * @param timeToWait
 * @param hideSelector
 * @param name
 * @returns {Function}
 */
test_structures.findClickAndShoot = function(selector, timeToWait, hideSelector, name) {
        var selector_config = {
        "object" : function setUp(obj) {
            return {
                find : obj.find,
                click : obj.click,
                shoot : obj.shoot
            };
        },
        "string" : function setUp(s) {
            return {
                find : s,
                click : s,
                shoot : s
            };
        }
    };
    var selectors = selector_config[typeof selector](selector);

    return function(phantomcss, casper) {
        return function() {
            casper.waitForSelector(selectors.find,
                function success() {
                    casper.click(selectors.click);
                    phantomcss.screenshot(selectors.shoot, name);
                },
                function timeout() {
                    casper.test.fail('Should see ' + name);
                }
            );
        };
    };
};

/**
 * PhantomCSS test structure that will click an element, wait
 * for an element and then take a snapshot of a different element
 *
 * @param selector
 * @param timeToWait
 * @param hideSelector
 * @param name
 * @returns {Function}
 */
test_structures.clickFindAndShoot = function(selector, timeToWait, hideSelector, name) {
        var selector_config = {
        "object" : function setUp(obj) {
            return {
                find : obj.find,
                click : obj.click,
                shoot : obj.shoot
            };
        },
        "string" : function setUp(s) {
            return {
                find : s,
                click : s,
                shoot : s
            };
        }
    };
    var selectors = selector_config[typeof selector](selector);

    return function(phantomcss, casper) {
        return function() {
            casper.click(selectors.click);
            casper.waitForSelector(selectors.find,
                function success() {
                    phantomcss.screenshot(selectors.shoot, name);
                },
                function timeout() {
                    casper.test.fail('Should see ' + name);
                }
            );
        };
    };
};
