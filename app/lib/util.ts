const currencyPattern = /(^[1-9]\d+)/
function IsCurrency(input: string) {
  return currencyPattern.test(input);
}

// UNCOMMENT THIS TO RUN APPLICATION
export { IsCurrency };

// UNCOMMENT TO TEST THE SCRIPT
// console.log(isCurrency("asfd123123"));
// CARA JALANIN SCRIPT TS
// npx ts-node data.ts

// console.log(parseFloat("4.35"));