function numericsToAlpha(numbers) {
  const alphaNumerics = [];
  numbers.forEach(number => {
    const numberObj = {
      number: number,
      alpha: numericToAlpha(number)
    };
    alphaNumerics.push(numberObj);
  });
  return alphaNumerics;
}

function numericToAlpha(number) {
  if (number === 0) return "Zero";

  const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
  const teens = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  function convertBelow100(num) {
    if (num < 10) {
      return ones[num];
    } else if (num < 20) {
      return teens[num - 10];
    }
    const ten = Math.floor(num / 10);
    const rest = num % 10;
    return tens[ten] + (rest ? " " + ones[rest] : "");
  }

  function convertBelow1000(num) {
    const hundred = Math.floor(num / 100);
    const rest = num % 100;
    let result = "";
    if (hundred) {
      result += ones[hundred] + " Hundred";
    }
    if (rest) {
      result += (result ? " " : "") + convertBelow100(rest);
    }
    return result;
  }

  function convertBelow10000(num) {
    if (num < 1000) {
      return convertBelow1000(num);
    }
    const thousand = Math.floor(num / 1000);
    const rest = num % 1000;
    let result = ones[thousand] + " Thousand";
    if (rest) {
      result += " " + convertBelow1000(rest);
    }
    return result;
  }

  const isNegative = number < 0;
  const absNum = Math.abs(number);
  return (isNegative ? "Negative " : "") + convertBelow10000(absNum);
}

module.exports = {
  numericsToAlpha
};
