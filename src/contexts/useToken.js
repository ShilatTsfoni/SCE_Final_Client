import { useContext } from 'react';
import TokenContext from './TokenContext';

const useToken = () => {
  return useContext(TokenContext);
};

export default useToken;
