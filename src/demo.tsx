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

const HeaderText = ({ children }) =>
  <section style={{ padding: '0 40px', borderBottom: '1px solid #eaeaea' }}>
    <h3 style={{ color: '#f79a59' }}>{children}</h3>
  </section>

class App extends React.Component<null, AppState> {
  private onValueChange = (formState) => {
    this.setState(formState)
  }

  public render () {
    return (
      <section style={{
        width: '1000px',
        background: 'white',
        margin: '50px auto',
        boxShadow: '0 2px 4px rgba(50,50,93,.1)',
        borderRadius: '3px',
        display: 'flex'
      }}>
        <div style={{
          flex: 1,
          borderRight: '1px solid #eaeaea'
        }}>
          <HeaderText>State</HeaderText>

          <section style={{ margin: '40px' }}>
            <pre>
             {JSON.stringify(this.state, null, 2)}
            </pre>
          </section>
        </div>
        <div style={{ flex: 1 }}>
          <HeaderText>UI</HeaderText>

          <section style={{ margin: '40px' }}>
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
                name='contact.phone'
                required={false} />
              <EmailField
                label='Email'
                name='contact.email' />
            </Form>
          </section>
        </div>
      </section>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
