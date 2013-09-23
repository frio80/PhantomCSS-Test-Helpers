'use strict';

exports.getBaseTestCase = function() {
    return BaseTestCase;
};

var test_structures = require('./../CommonTestStructures');

/**
 @constructor
*/
function BaseTestCase(name) {
    this.tests = [];

    /** @type {string} */
    this.test_name = name;
}

/**
 * Get Test name
 *
 * @returns {string}
 */
BaseTestCase.prototype.getName = function() {
    return this.test_name;
};

/**
 * Get the tests
 *
 * @returns {string}
 */
BaseTestCase.prototype.getTests = function() {
    return this.tests;
};

/**
 * Set the tests
 *
 * @param {array} tests An array of PhantomCSS tests
 */
BaseTestCase.prototype.setTests = function(tests) {
    this.tests = tests;
};

/**
 * A setup function for the class.  This function prepares the test data
 * into a PhatomCSS familiar format.
 *
 * @param {array} tests_data An array of PhantomCSS tests
 */
BaseTestCase.prototype.setup = function(tests_data) {
	var tests = [];

	tests_data.forEach(function(obj) {
        var the_test = test_structures.getTest(obj.test_type);

        // The arguments will always have selectors first
        var args = [obj.input];

        if (isNaN(Number(obj.timeToWait))) {
            args.push(obj.timeToWait);
            args.push(obj.hideSelector);
        }

        // The arguments will always have name
        args.push(obj.test_name);

	    // Assign test name and configure test
	    var tmp = {
	        name : obj.test_name,
	        test : the_test.apply(the_test, args)
	    };

	    tests.push(tmp);
	});

	// Set the tests
	this.setTests(tests);
};

/**
 * The function that will execute the tests with CapserJS and PhantomCSS
 *
 * @param phantomcss
 * @param casper
 */

BaseTestCase.prototype.runTests = function(phantomcss, casper) {
    var self = this;

    casper.
        then(function() {
            self.getTests().forEach(function(test_case) {
                casper.then(test_case.test(phantomcss, casper));
            });
        });
};