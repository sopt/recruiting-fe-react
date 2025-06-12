import '@/App.css';
import queryClient from '@/apis/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <div>DASH</div>
      </QueryClientProvider>
    </>
  );
}

export default App;
