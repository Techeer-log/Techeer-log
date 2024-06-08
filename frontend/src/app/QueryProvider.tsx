import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

export const QueryProvider = ({ children }: { children: ReactNode }) =>{
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client = {queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  )

}