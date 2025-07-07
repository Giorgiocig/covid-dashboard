export const formatter = new Intl.NumberFormat("it-IT", {
  notation: "compact",
  compactDisplay: "short",
});

/**
  const input = [{ region: { iso: "IT" } }, { region: { iso: "FR" } }];
  const keys = "region.iso".split("."); // ["region", "iso"]
  acc = { region: { iso: "IT" } }, key = "region" → acc = acc["region"] → { iso: "IT" }
  acc = { iso: "IT" }, key = "iso" → acc = acc["iso"] → "IT"
 */
const populateArray = (
  inputArray: { [key: string]: any }[],
  objectKey: string
): any[] => {
  const keys = objectKey.split(".");
  return inputArray.map((item) => keys.reduce((acc, key) => acc?.[key], item));
};

export const summa = (inputArray: number[]) => {
  let summa = 0;
  for (let i = 0; i < inputArray.length; i++) {
    summa += inputArray[i];
  }
  return summa;
};

export const computeSumma = (inputArray: any, objKey: string) => {
  const populatedArray = populateArray(inputArray, objKey);
  return summa(populatedArray);
};

const sortArrayOfObjAscendingOrder = (
  inputArray: { [key: string]: any }[],
  objKey: string
) => {
  return inputArray.sort((a, b) => b[objKey] - a[objKey]);
};

const sliceArray = (
  inputArray: { [key: string]: any }[],
  start = 0,
  end = 10
) => {
  return inputArray.slice(start, end);
};

export const sortAndSliceArray = (
  inputArray: { [key: string]: any }[],
  objKey: string
) => {
  const sortInputArray = sortArrayOfObjAscendingOrder(inputArray, objKey);
  return sliceArray(sortInputArray);
};

export const computeLabelsAndDataGraphs = (
  inputArray: { [key: string]: any }[],
  objKeyForLabels: string,
  objKeyForData?: string
) => {
  const labels = populateArray(inputArray, objKeyForLabels);
  const data = objKeyForData ? populateArray(inputArray, objKeyForData) : [];
  return [labels, data];
};

export const computeSingleCardValue = (
  arrayOfNationsData: { [key: string]: any }[],
  objKey: string
) => {
  let singleNationData = 0;
  if (arrayOfNationsData.length === 1)
    singleNationData = arrayOfNationsData[0][objKey];
  else {
    const [_, data] = computeLabelsAndDataGraphs(
      arrayOfNationsData,
      "region.name",
      objKey
    );
    singleNationData = summa(data);
  }
  return singleNationData;
};
