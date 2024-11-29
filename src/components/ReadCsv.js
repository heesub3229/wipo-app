export const fetchRegion = async (file, setData) => {
  try {
    const response = await fetch(file);
    const csvText = await response.text();
    const rows = csvText.split("\n").map((row) => row.trim());
    const headers = rows[0].split(",");

    const parsedData = rows.slice(1).map((row, index) => {
      const values = row.split(",");
      return {
        id: index + 1,
        province: values[headers.indexOf("province")],
        city: values[headers.indexOf("city")],
        town: values[headers.indexOf("town")],
      };
    });

    setData(parsedData);
  } catch (error) {
    console.error("Error reading CSV file:", error);
  }
};
