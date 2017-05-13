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
      name='text'
      validators={[
        {
          func: val => val.length < 10,
          message: 'Text must be less than 10 chars'
        }
      ]} />
    <TextField
      label='Contact name'
      name='contact[name]' />
    <TextField
      label='Contact phone'
      name='contact[phone]' />
    <EmailField
      label='Email'
      name='email' />
    <section>
      <EmailField
        label='Email'
        name='email' />
    </section>
  </Form>
)

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
