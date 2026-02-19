import '@sopt-makers/ui/dist/index.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes/Router.tsx';
import '@/App.css';
import { DialogProvider, ToastProvider } from '@sopt-makers/ui';
import queryClient from '@/apis/queryClient';
import { NavProvider } from '@/contexts/NavContext';
import { SeasonGroupProvider } from '@/contexts/SeasonGroupContext';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <DialogProvider>
        <ToastProvider>
          <NavProvider>
            <SeasonGroupProvider>
              <RouterProvider router={router} />
            </SeasonGroupProvider>
          </NavProvider>
        </ToastProvider>
      </DialogProvider>
    </QueryClientProvider>
  );
}

export default App;
