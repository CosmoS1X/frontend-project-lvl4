import axios from 'axios';

export default async (route, data) => {
  const response = await axios.post(route, data);
  localStorage.setItem('userId', JSON.stringify(response.data));
};
