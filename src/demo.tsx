import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Form from './paperweight'

const App = () =>
  <Form>
    <input name='first' />

    <section>
      <input name='second' />
    </section>
  </Form>

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
