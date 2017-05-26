var Babel = (function(options){
  var defaults = {
    allowedChars: "abcdefghilmnopqrstuvz .,",
    xOffset: 1,
    yOffset: 1,
    lines: 10,
    rows: 40
  }
  var settings = $.extend({}, defaults, options);

  function convertString(string) {
    return string.split('').map(charToBabel).join('')
  }

  function convert(page) {
    var lines = page.split("\n").filter(function(line){return line.length > 0});
    var filledLines = fill(lines, settings.lines, [""]);
    var babelLines = filledLines.map(lineToBabel);
    return babelLines.join("<br>")
  }

  function fill(element, upTo, withWhat) {
    var current = element.length;
    var before = Math.floor((upTo - current) / 2);
    var after = Math.ceil((upTo - current) / 2);
    return sum(multiply(withWhat, before), element, multiply(withWhat, after))
  }
  function sum(one, two, three) {
    if (typeof(one) === "string") {
      return one + two + three
    } else {
      return one.concat(two, three)
    }
  }
  function multiply(element, times) {
    if (typeof(element) === "string") {
      return Array(times).fill(element).join("")
    } else {
      return Array(times).fill(element[0])
    }
  }

  function lineToBabel(line, offset) {
    var filledLine = fill(line, settings.rows, "*");
    return filledLine.split('').map(charToBabelWithOffset(offset * settings.xOffset)).join('')
  }
  function charToBabelWithOffset(offset) {
    return function(c, index) {
      return charToBabel(c, index + offset * settings.yOffset)
    }
  }
  function charToBabel(c, index) {
    var normalizedC = c.toLowerCase()
    if (settings.allowedChars.indexOf(normalizedC) === -1) {
      return '<span class="noise" data-delay="' + index + '">' + randomChar() + '</span>'
    } else {
      return '<span class="signal" data-delay="' + index + '">' + normalizedC + '</span>'
    }
  }
  
  function randomChar(){
    return sample(settings.allowedChars)
  }
  function sample(array) {
    return array[Math.floor(Math.random()*array.length)];
  }

  return {
    convert: convert,
    convertString: convertString
  }

})
