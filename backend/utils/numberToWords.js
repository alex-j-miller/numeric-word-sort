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
  const scales = ["", "Thousand", "Million", "Billion", "Trillion"];

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

  const isNegative = number < 0;
  let absNum = Math.abs(number);
  let words = [];
  let scaleIdx = 0;

  while (absNum > 0) {
    const chunk = absNum % 1000;
    if (chunk) {
      let chunkWords = convertBelow1000(chunk);
      if (scales[scaleIdx]) {
        chunkWords += " " + scales[scaleIdx];
      }
      words.unshift(chunkWords);
    }
    absNum = Math.floor(absNum / 1000);
    scaleIdx++;
  }

  return (isNegative ? "Negative " : "") + words.join(" ").trim();
}

module.exports = {
  numericsToAlpha
};
