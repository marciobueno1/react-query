import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
 
const queryClient = new QueryClient();


export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  )
}

function Example() {
  const { isLoading, error, data } = useQuery('repoData', () =>
    fetch('https://swapi.dev/api/people/').then(res =>
      res.json()
    )
  )

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  console.log('data', data)

  if (data.message === "Not Found") return 'Página não encontrada...'

  return (
    <div>
      <h1>Name: {data.name}</h1>
      <p>Altura: {data.height} cm</p>
      <a href={data.homeworld}>Mundo Natal</a>
    </div>
  )

}