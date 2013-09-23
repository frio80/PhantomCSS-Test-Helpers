'use strict';

exports.getTestCase = function() {
    return test_case;
};

var tests = [];
var test_name = 'users';
var tests_data = [
    {
        input : '.secondary-nav',
        /*        timeToWait : 3000,*/
        hideSelector : '.modal-backdrop',
        test_name : test_name + '_secondary-nav',
        test_type : 'findAndShoot'
    },
    {
        input : '#thead',
        test_name : test_name + "_tablehead",
        test_type : 'findAndShoot'
    },
    {
        test_type : 'findClickAndShoot',
        test_name : test_name + "_secondary-nav-delete",
        input : {
            find : '#thead thead th input[type=checkbox]',
            click : '#thead thead th input[type=checkbox]',
            shoot : '.secondary-nav'
        }
    }
];

var BaseTestCase = require('./source/BaseTestCase').getBaseTestCase();
var test_case = new BaseTestCase(test_name);

test_case.setup(tests_data);

// Override the runTests function if you need to navigate to a page before running the tests
test_case.runTests = function(phantomcss, casper) {
    var args = arguments;
    var self = this;

    // Navigate to the Users page
    casper.click('#nav_users a');
    casper.
        then(function() {
            casper.waitForSelector('#Management',
                function success() {
                    this.test.assertExists('#Management', 'Users screen Loaded');
                    BaseTestCase.prototype.runTests.apply(self, args);
                },
                function timeout() {
                    this.test.assertExists('#Management', 'Users screen Loaded');
                    casper.test.fail('Should see ' + '#Management');
                }
            );
        });
};