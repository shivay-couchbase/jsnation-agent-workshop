const objToXml = (obj: Record<string, any>): string => {
  let xml = "";

  for (const prop in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, prop)) continue;

    const value = obj[prop];

    if (Array.isArray(value)) {
      for (const item of value) {
        xml += `<${prop}>${objToXml(item)}</${prop}>`;
      }
    } else if (typeof value === "object" && value !== null) {
      xml += `<${prop}>${objToXml(value)}</${prop}>`;
    } else {
      xml += `<${prop}>${value}</${prop}>`;
    }
  }

  return xml.replace(/<\/?[0-9]+>/g, "");
};

export default objToXml;
