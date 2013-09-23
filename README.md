PhantomCSS-Test-Helpers
=======================

A JavaScript test class and common test cases for PhantomCSS tests.


BaseTestCase.js
---------------

Simply instantiate this class and declare the tests and selectors you want to run.


CommonTestStructures.js
--------------------


Example Code for your PhantomCSS runner
---------------------------------------

In your test runner, simply load the tests and execute them:
var example_tests = require('./ExampleTest.js');
var tests = [example_tests.getTestCase()];
var baseline_url_root = "<your URL>";

// Loop over all the tests and execute
tests.forEach(function(test) {
        casper.
            then(function() {
                console.log('Starting ' + test.getName() + ' tests');
            }).
            then(function() {
                casper.open(baseline_url_root);
            }).
            then(function() {
                test.runTests(phantomcss, casper);
            });
    }
);