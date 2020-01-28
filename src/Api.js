import axios from "axios";
import moment from "moment";

export const fetchResultCases = async setter => {
  const result = await axios(
    "https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/1/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Confirmed%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D&cacheHint=true"
  );
  setter(result.data.features[0].attributes.value);
};
export const fetchResultDeaths = async setter => {
  const result = await axios(
    "https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/1/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Deaths%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D&cacheHint=true"
  );
  setter(result.data.features[0].attributes.value);
};
export const fetchResultRecovered = async setter => {
  const result = await axios(
    "https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/1/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Recovered%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D&cacheHint=true"
  );
  setter(result.data.features[0].attributes.value);
};
export const fetchTableData = async (setter1, setter2, setter3) => {
  const result = await axios(
    "https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/2/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Confirmed%20desc&resultOffset=0&resultRecordCount=100&cacheHint=true"
  );

  const sgResult = result.data.features.find(
    country => country.attributes.Country_Region === "Singapore "
  );

  setter1(result.data.features);
  setter2(sgResult);
  setter3(
    moment
      .utc(sgResult.attributes.Last_Update)
      .add(13, "hours")
      .format(`MMM DD, YYYY. hh:mm a dddd`)
  );
};
export const fetchMapData = async setter => {
  const result = await axios(
    "https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/1/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Confirmed%20desc&resultOffset=0&resultRecordCount=1000&cacheHint=true"
  );
  setter(result.data.features);
};
export const fetchStatsData = async setter => {
  const result = await axios(
    "https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/cases_time/FeatureServer/0/query?f=json&where=Report_Date%3C%3D%272020-01-28%2015%3A59%3A59%27&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Report_Date%20asc&resultOffset=0&resultRecordCount=2000&cacheHint=true"
  );
  const formattedData = [];
  result.data.features.map(
    statistic =>
      statistic.attributes.Total_Confirmed &&
      formattedData.push(statistic.attributes)
  );
  setter(formattedData);
};
