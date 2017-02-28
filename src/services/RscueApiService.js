import { create } from 'apisauce';
import Config from 'react-native-config';
import Reactotron from 'reactotron-react-native';

const api = create({
  baseURL: Config.API_BASE_URL,
  headers: { 'Accept': 'application/json' },
  
});

api.addMonitor(Reactotron.apisauce);

const RscueApi = () => {

  const getClient = (id) => api.get(`/client/${id}`);
  const setAuthHeader = (token) => api.setHeader('Authorization', token);

  return {
    getClient,
    setAuthHeader
  };
};

export default RscueApi();
