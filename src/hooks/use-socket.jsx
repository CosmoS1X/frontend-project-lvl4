import { useContext } from 'react';
import { socketContext } from '../contexts';

const useSocket = () => useContext(socketContext);

export default useSocket;
