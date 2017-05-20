import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Form, {
  EmailField,
  TextField
} from './paperweight'

export interface AppState {
  values?: Object,
  validations?: Object
}

class App extends React.Component<null, AppState> {
  public state = {
    values: {},
    validations: {}
  }

  private onValueChange = (values, validations) => {
    this.setState({values, validations})
  }

  public render () {
    return (
      <section style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <pre>
           {JSON.stringify(this.state, null, 4)}
          </pre>
        </div>
        <div style={{ flex: 1 }}>
          <Form onValueChange={this.onValueChange}>
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
              name='contact.name' />
            <TextField
              label='Contact phone'
              name='contact.phone' />
            <EmailField
              label='Email'
              name='contact.email' />
          </Form>
        </div>
      </section>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
