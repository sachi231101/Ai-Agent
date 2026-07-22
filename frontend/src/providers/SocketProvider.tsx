import { createContext, useContext, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { WS_URL } from '@/app/config';
import { useAuthStore } from '@/store/auth.store';

interface SocketContextValue {
  socket: Socket | null;
  connected: boolean;
}

const SocketContext = createContext<SocketContextValue>({ socket: null, connected: false });

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const socketRef = useRef<Socket | null>(null);
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) return;

    const socket = io(WS_URL, {
      withCredentials: true,
      auth: { token: localStorage.getItem('accessToken') },
      transports: ['websocket'],
    });

    socket.on('connect', () => console.debug('Socket connected:', socket.id));
    socket.on('disconnect', () => console.debug('Socket disconnected'));

    socketRef.current = socket;

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current, connected: !!socketRef.current?.connected }}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => useContext(SocketContext);
