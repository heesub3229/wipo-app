const apiKey = process.env.REACT_APP_PLACE_KEY;
const apiUrl =
  "/addrlink/addrLinkApi.do?currentPage=1&countPerPage=20&resultType=json";

export const getSearchedPlaces = async (data) => {
  try {
    const response = await fetch(
      `${apiUrl}&keyword=${data}&confmKey=${apiKey}`
    );
    if (!response.ok) {
      if (response.status === 400) {
        const errorText = await response.json();
        throw new Error(errorText.errCode);
      }
    }
    const res = await response.json();
    if (res.results.juso) {
      const uniqueData = res.results.juso
        .reduce((acc, row) => {
          if (!acc.some((item) => item.placeName === row.bdNm)) {
            acc.push({ placeName: row.bdNm });
          }
          return acc;
        }, [])
        .slice(0, 10);

      const dataArray = uniqueData.map((row, index) => ({
        id: index,
        placeName: row.placeName,
      }));
      return dataArray;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return { status: 500, message: { data: "서버에러" } };
  }
};
