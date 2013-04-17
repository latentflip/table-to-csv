/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function($) {

  /*
    ======== A Handy Little QUnit Reference ========
    http://docs.jquery.com/QUnit

    Test methods:
      expect(numAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      raises(block, [expected], [message])
  */

  module('jQuery#tableToCsv', {
    setup: function() {
      this.elems = $('#qunit-fixture').find('table');
    }
  });

  test('is chainable', 1, function() {
    // Not a bad test to run on collection methods.
    strictEqual(this.elems.tableToCSV(), this.elems, 'should be chaninable');
  });

  test('returns csv', 7, function() {
    this.elems.tableToCSV({
      currency: 'td.money',
      currencyInvert: 'tbody.outflow td.money',
      ignore: 'tr.parent td.money',
      modifyCell: [
        {
          selector: "tr[class^=child-of-node] td.description",
          prepend: " - "
        }
      ],
      header: [
        ['"Float cashflow"'],
        ['"exported just now"']
      ]
    }, function(csvs) {
      var csv = csvs[0];

      strictEqual(csv[0], '"Float cashflow"');
      strictEqual(csv[1], '"exported just now"');
      strictEqual(csv[2], "", "title should be added with seperator");

      strictEqual(csv[3], ",Sep,Oct,Nov,Dec,Jan '13,Feb,Mar,Apr,", "header rows should be correct");

      strictEqual(csv[4], "Starting Balance,-2402.20,-2402.20,8636.89,12776.89,16916.89,21056.89,25196.89,29336.89", "starting balance should be correct");

      strictEqual(csv[11], " - Rent,0.00,-860.00,-860.00,-860.00,-860.00,-860.00,-860.00,-860.00,", "starting balance should be correct");
      
      strictEqual(csv[6], "Cash In,,,,,,,,", "Header row cells should be ignored");
    });
  });

}(jQuery));
