import { useEffect } from 'react';
import { connectWebSocket, disconnectWebSocket } from '@/lib/websocket';

export const useWebSocket = (assignmentId?: string) => {
  useEffect(() => {
    if (assignmentId) {
      connectWebSocket(assignmentId);
    } else {
      connectWebSocket();
    }
    
    return () => {
      disconnectWebSocket();
    };
  }, [assignmentId]);
};

export default useWebSocket;
