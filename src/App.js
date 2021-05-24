import React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
 
const queryClient = new QueryClient();

export default function App() {
    return (
      <QueryClientProvider client={queryClient}>
        <Todos />
      </QueryClientProvider>
    )
  }

function Todos() {
    const [page, setPage] = React.useState(1)
    const fetchProjects = (page = 1) => fetch('https://swapi.dev/api/people/?page=' + page).then((res) => res.json())
 
    const {
      isLoading,
      isError,
      error,
      data,
      isFetching,
      isPreviousData,
    } = useQuery(['projects', page], () => fetchProjects(page), { keepPreviousData : true })

    return (
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Error: {error.message}</div>
        ) : (
          <div>
            {data.results.map(project => (
              <p key={project.name}>{project.name}</p>
            ))}
          </div>
        )}
 
        <span>Current Page: {page}</span>
 
        <button
          onClick={() => setPage(old => Math.max(old - 1, 1))}
          disabled={page === 1}
        >
          Previous Page
        </button>{' '}
 
        <button
          onClick={() => {
            if (!isPreviousData && data && data.next) {
              setPage(old => old + 1)
            }
          }}
 
          // Disable the Next Page button until we know a next page is available
          disabled={isPreviousData || (data && !data.next)}
        >
          Next Page
        </button>
 
        {isFetching ? <span> Loading...</span> : null}{' '}

      </div>
    )
  }