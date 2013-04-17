/*
 * table-to-csv
 * https://github.com/latentflip/table-to-csv
 *
 * Copyright (c) 2012 Philip Roberts
 * Licensed under the MIT license.
 */
 /*
  * options:
  *   currency: 'money'
  *   currencyInvert: '.invert'
  *   ignore: '#node-expense .money'
  */


(function($) {
  function convertCell($cell, options) {
    options = options || {};

    var text = $cell.text().trim();

    if(options.currencyInvert && $cell.is(options.currencyInvert)) {
      text = text.replace(/[^\-\d\.]/g, '');
      text = (-1.0*Math.abs(parseFloat(text))).toFixed(2);
    } else if (options.currency && $cell.is(options.currency)) {
      text = text.replace(/[^\-\d\.]/g, '');
      text = parseFloat(text).toFixed(2);
    }

    if(options.modifyCell) {
      for(var m in options.modifyCell) { 
        m = options.modifyCell[m];
        if ($cell.is(m.selector)) {
          if (m.prepend) { text = m.prepend + text; }
          if (m.append) { text += m.append; }
        }
      }
    }

    if (options.ignore && $cell.is(options.ignore)) {
      text = '';
    }

    return text;
  }

  function buildCSV($table, options) { 
    options = options || {};

    var csv = $table.find('tr').map(function() {
      return $(this).find('th, td').map(function() {

        return convertCell($(this), options);

      }).get().join(',');
    }).get();

    if (options.header) {
      var header = options.header.map(function(r) {
        return r.join(',');
      });
      header.push("");
      csv = header.concat(csv);
    }

    return csv;
  }

  // Collection method.
  $.fn.tableToCSV = function(options, callback) {
    var csvs = [];
    return this.each(function() {
      var csv = '';
      var $table = $(this);

      csvs.push(buildCSV($(this), options));

      if (callback) {
        callback(csvs);
      }
    });
  };


}(jQuery));
