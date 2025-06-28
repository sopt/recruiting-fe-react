import '@sopt-makers/ui/dist/index.css';

import queryClient from '@/apis/queryClient';
import { router } from '@/routes/Router.tsx';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom';
import '@/App.css';
import { DialogProvider } from '@sopt-makers/ui';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <DialogProvider>
        <RouterProvider router={router} />
      </DialogProvider>
    </QueryClientProvider>
  );
}

export default App;
