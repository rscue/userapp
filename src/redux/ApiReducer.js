import { createActions } from 'reduxsauce';

const { Types, Creators} = createActions({
  setAuthHeader: ['token']
});

export const ApiTypes = Types;
export default Creators;
