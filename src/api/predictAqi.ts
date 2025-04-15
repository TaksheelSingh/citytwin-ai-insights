import axios from 'axios';

export const predictAQI = async (pollutants: {
  PM25: number;
  PM10: number;
  NO2: number;
  CO: number;
  SO2: number;
  Ozone: number;
}) => {
  const response = await axios.post('http://localhost:5000/predict-aqi', pollutants);
  return response.data.predicted_aqi;
};
