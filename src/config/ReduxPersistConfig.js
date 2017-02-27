import ImmutablePersistenceTransform from './ImmutablePersistenceTransform';
import { AsyncStorage } from 'react-native';

const REDUX_PERSIST_CONFIG = {
  active: true,
  reducerVersion: '2',
  storeConfig: {
    storage: AsyncStorage,
    //blacklist: [], // reducer keys that you do NOT want stored to persistence here
    // whitelist: [], Optionally, just specify the keys you DO want stored to
    // persistence. An empty array means 'don't store any reducers'
    transforms: [ImmutablePersistenceTransform]
  }
};

export default REDUX_PERSIST_CONFIG;
