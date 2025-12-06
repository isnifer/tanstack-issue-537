import { createFileRoute } from '@tanstack/react-router'
import z from 'zod'

export const Route = createFileRoute('/withParam/$id/{-$number}')({
  params: z.object({ 
    id: z.coerce.string(), // SAME AS FOR SEARCH PARAMS
    number: z.coerce.number().optional(),
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const { id, number } = Route.useParams()

  return (
    <div style={{ padding: '2rem' }}>
      Hello "/withParam/{id}"{' '}
      {number ? 
        <>
          <span style={{ color: 'red' }}>
            with wrong (but expected) due to parsing number <strong>{number}</strong>
          </span>
          <br />
          <br />
          <span>However, params looks like do not parse in URL at all. That's why optional parameter stay correct in URL.</span>
        </> : 
        <>
          <br />
          <a href={`/withParam/${id}/${id}`}>Now open with optional parameter</a>
        </>
      }
      <br />
      <br />
      <strong>ZOD SCHEMA:</strong>
      <pre>
        {`params: z.object({ 
  id: z.coerce.string(), // SAME AS FOR SEARCH PARAMS
  number: z.coerce.number().optional(),
})`}
      </pre>
    </div>
  )
}
