import { createFileRoute } from '@tanstack/react-router'
import '../App.css'


export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a href="/issue?number=6185982271467&numeric=723421968459640832&sameAsNumericWithoutQuotes=router" style={{ color: 'white' }}>A link from the internet</a>
        <br />
        <br />
        <br />
        <div>
          It should open `/issue?number=6185982271467&numeric=723421968459640832&sameAsNumericWithoutQuotes=router`
        </div>
        <br />
        <br />
        <br />
        <div>
          BUT WILL BE `/issue?number=6185982271467&numeric=<span style={{ color: 'red' }}>"</span>7234219684596408<span style={{ color: 'red' }}>00"</span>&sameAsNumericWithoutQuotes=router`
        </div>
        <br />
        <br />
        <br />
        <div>
          And no issue at all with params
        </div>
        <br />
        <a href="/withParam/723421968459640832" style={{ color: 'white' }}>A link from the internet</a>
      </header>
    </div>
  )
}
