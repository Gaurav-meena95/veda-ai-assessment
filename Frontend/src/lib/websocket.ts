import { useAssignmentStore } from '@/store/useAssignmentStore';

let ws: WebSocket | null = null;
let reconnectTimer: NodeJS.Timeout | null = null;

export const connectWebSocket = (assignmentId?: string) => {
  const store = useAssignmentStore.getState();
  
  if (ws) {
    if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
      return ws;
    }
    ws.close();
  }

  const baseWsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3000';
  const url = assignmentId 
    ? `${baseWsUrl}?assignmentId=${assignmentId}`
    : baseWsUrl;
    
  try {
    ws = new WebSocket(url);

    ws.onopen = () => {
      store.setWsConnected(true);
      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
        reconnectTimer = null;
      }
      console.log('WebSocket Connected to VedaAI');
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('WebSocket Message Received:', data);
        
        switch (data.type) {
          case 'job:queued':
            store.setGenerationStatus('queued');
            break;
          case 'job:processing':
            store.setGenerationStatus('processing');
            break;
          case 'job:progress':
            store.setGenerationProgress(data.progress || 0);
            if (store.generationStatus !== 'processing') {
              store.setGenerationStatus('processing');
            }
            break;
          case 'job:done':
            store.setGenerationStatus('done');
            store.setGenerationProgress(100);
            if (data.assignment) {
              store.setCurrentAssignment(data.assignment);
              // Also update in lists
              const updatedAssignments = store.assignments.map(a => 
                a._id === data.assignment._id ? data.assignment : a
              );
              store.setAssignments(updatedAssignments);
            }
            break;
          case 'job:failed':
            store.setGenerationStatus('failed');
            break;
          default:
            break;
        }
      } catch (err) {
        console.error('Error parsing WebSocket message:', err);
      }
    };

    ws.onclose = () => {
      store.setWsConnected(false);
      console.log('WebSocket Disconnected, reconnecting in 3 seconds...');
      reconnectTimer = setTimeout(() => {
        connectWebSocket(assignmentId);
      }, 3000);
    };

    ws.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };
  } catch (error) {
    console.error('WebSocket initialization error:', error);
  }

  return ws;
};

export const disconnectWebSocket = () => {
  if (reconnectTimer) {
    clearTimeout(reconnectTimer);
    reconnectTimer = null;
  }
  if (ws) {
    ws.close();
    ws = null;
  }
};
