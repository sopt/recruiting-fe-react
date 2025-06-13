import queryClient from '@/apis/queryClient';
import Header from '@/components/Header';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import '@/App.css';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Header />
    </QueryClientProvider>
  );
}

export default App;
