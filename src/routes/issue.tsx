import { createFileRoute } from '@tanstack/react-router'
import z from 'zod'

const zodSchema = z.object({
  // real world example: 6185982271467
  number: z.number().optional(),
  // real world example: 723421968459640832
  numeric: z.coerce.string().optional(),
  // not a number value: router
  sameAsNumericWithoutQuotes: z.coerce.string().optional(),
})

export const Route = createFileRoute('/issue')({
  component: RouteComponent,
  validateSearch: zodSchema,
  beforeLoad: () => {
    const url = new URLSearchParams(window.location.search)
    
    const string = url.get('string')
    const number = url.get('number')
    const numeric = url.get('numeric')
    const sameAsNumericWithoutQuotes = url.get('sameAsNumericWithoutQuotes')

    return {
      searchParamsFromURL: {
        string,
        number,
        numeric,
        sameAsNumericWithoutQuotes,
      }
    }
  },
})

function RouteComponent() {
  const search = Route.useSearch()
  const { searchParamsFromURL } = Route.useRouteContext()

  const parsed = zodSchema.parse({
    string: searchParamsFromURL.string,
    number: Number(searchParamsFromURL.number),
    numeric: searchParamsFromURL.numeric,
    sameAsNumericWithoutQuotes: searchParamsFromURL.sameAsNumericWithoutQuotes,
  })

  return (
    <pre style={{ padding: '2rem' }}>
      <div>EXPECT number: {search.number} should be 6185982271467 {search.number === 6185982271467 ? '✅' : '❌'}</div>
      <br />
      <div>EXPECT numeric: <span style={{ color: 'red', fontWeight: 'bold' }}>{search.numeric}</span> should be 723421968459640832 {search.numeric === '723421968459640832' ? '✅' : '❌'}</div>
      <br />
      <div>EXPECT sameAsNumericWithoutQuotes: {search.sameAsNumericWithoutQuotes} should be 'router' {search.sameAsNumericWithoutQuotes === 'router' ? '✅' : '❌'}</div>
      <br />
      <br />
      MAYBE IT'S A ZOD ISSUE? — No
      <br />
      <br />
      <br />
      {parsed.numeric === '723421968459640832' ? 
        <>
          <div>EXPECT number: {parsed.number} should be 6185982271467 {parsed.number === 6185982271467 ? '✅' : '❌'}</div>
          <br />
          <div>EXPECT numeric: <span style={{ color: 'green', fontWeight: 'bold' }}>{parsed.numeric}</span> should be 723421968459640832 {parsed.numeric === '723421968459640832' ? '✅' : '❌'}</div>
          <br />
          <div>EXPECT sameAsNumericWithoutQuotes: {parsed.sameAsNumericWithoutQuotes} should be 'router' {parsed.sameAsNumericWithoutQuotes === 'router' ? '✅' : '❌'}</div>
          <br />
          <br />
          <div>NOW REFRESH A PAGE TO SEE WHAT'S PARSED FROM SEARCH STRING</div>
        </> : 
        <>
          <div>EXPECT number: {parsed.number} should be 6185982271467 {parsed.number === 6185982271467 ? '✅' : '❌'}</div>
          <br />
          <div>EXPECT numeric: <span style={{ color: 'red', fontWeight: 'bold' }}>{parsed.numeric}</span> should be 723421968459640832 {parsed.numeric === '723421968459640832' ? '✅' : '❌'}</div>
          <br />
          <div>EXPECT sameAsNumericWithoutQuotes: {parsed.sameAsNumericWithoutQuotes} should be 'router' {parsed.sameAsNumericWithoutQuotes === 'router' ? '✅' : '❌'}</div>
        </>}
        <br />
        <br />
        <strong>ZOD SCHEMA:</strong>
        <pre>
          {`z.object({ 
  number: z.number().optional(),
  numeric: z.coerce.string().optional(),
  sameAsNumericWithoutQuotes: z.coerce.string().optional(),
})`}
        </pre>
    </pre>
  )
}
