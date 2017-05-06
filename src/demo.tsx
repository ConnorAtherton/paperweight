import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Form, {
  EmailField,
  TextField
} from './paperweight'

const App = () => (
  <Form>
    <TextField
      label='Text'
      name='text' />
    <TextField
      label='Contact name'
      name='contact[name]' />
    <TextField
      label='Contact phone'
      name='contact[phone]' />
    <EmailField
      label='Email'
      name='email' />
  </Form>
)

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
