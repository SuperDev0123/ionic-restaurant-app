import axios from "axios";

export async function fetchData(apiUrl, filters) {
  const params = { format: "json", ...filters };

  const keys = Object.keys(params);
  
  keys.forEach((key) => {
    let property = params[key];
    if(Array.isArray(property)) params[key] = property.join(",");
  });

  const response = await axios.get(apiUrl, { params });

  return response.data;
}

export function getSortFilterValue(sortBy) {
  const attribute = sortBy.id.replace(/\./g, "__");
  const direction = sortBy.desc ? "desc" : "asc";

  return `${direction} ${attribute}`;
}

export function convertPropsToArray(obj, propertiesKeys) {
  if(typeof obj !== "object") return;
  if(!Array.isArray(propertiesKeys)) throw new Error("The propertiesKeys parameter must be an array");

  const newObj = { ...obj };

  propertiesKeys.forEach((key) => {
    const propValue = newObj[key];

    if(propValue === undefined) return;

    if(typeof propValue === "string") {
      newObj[key] = propValue.split(",").map(value => value.trim());
      return;
    }

    if(!Array.isArray(propValue)) newObj[key] = [propValue];
  });

  return newObj;
}

export function convertArraysToString(obj) {
  const newObj = { ...obj }; 

  Object.keys(newObj).forEach((key) => {
    const value = newObj[key];

    if(Array.isArray(value)) {
      newObj[key] = value.join(",");
    }
  });

  return newObj;
}

export function removeEmptyProperties(obj) {
  const newObj = { ...obj };

  Object.keys(newObj).forEach((key) => {
    const value = newObj[key];
    const isAnEmptyArray = (Array.isArray(value) && value.length === 0);

    if (value === null || value === "" || value === " " || isAnEmptyArray) {
      delete newObj[key];
    }
  });

  return newObj;
}