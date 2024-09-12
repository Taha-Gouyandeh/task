//convert persian number to english number
export function ConvertToEnglishNumber(persianNumber: string) {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  return persianNumber
    .split("")
    .map((char) => {
      const index = persianDigits.indexOf(char);
      return index !== -1 ? index.toString() : char;
    })
    .join("");
}

//return just english number
export function ConvertNumber(text: string) {
  const validRegex = /[۰-۹0-9,+.-]+/g;

  const filteredText = text.replace(/[^۰-۹0-9,+.-]/g, "");

  if (validRegex.test(filteredText)) {
    let converted = filteredText;

    converted = ConvertToEnglishNumber(filteredText);

    return converted;
  } else {
    return "";
  }
}
