import React from 'react'
import { Col, Row, Form } from 'reactstrap'
import { EngineContext } from '../context/configContext.jsx'
import { AlertContext } from '../context/AlertContext.js'
import { OIbInteger, OIbText, OIbPassword } from '../components/OIbForm'
import Filters from './Filters.jsx'
import Logging from './Logging.jsx'
import ScanModes from './ScanModes.jsx'
import Proxies from './Proxies.jsx'
import Caching from './Caching.jsx'

const Engine = () => {
  // const [configJson, setConfigJson] = React.useState()
  // const [validate, setValidate] = React.useState()
  const { state: configState /* , dispatch: configDispatch */ } = React.useContext(EngineContext)

  const { setAlert } = React.useContext(AlertContext)

  /**
   * Submit the updated engine
   * @param {*} engine The changed engine
   * @returns {void}
   */
  /*
 const handleSubmit = async (engine) => {
   console.log(engine)
   try {
     await apis.updateEngine(engine)
   } catch (error) {
     console.error(error)
     setAlert({ text: error.message, type: 'danger' })
   }
}
  const validateEmail = (e) => {
    // eslint-disable-next-line max-len
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\
      [[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (emailRex.test(e.target.value)) {
      // setValidate('has-success')
    } else {
      // setValidate('has-danger')
    }
  }
  */

  const onChange = (name, value) => {
    console.info('set json avec la nouvelle valeur', name, value)
    /*
    setConfigJson((json) => {
      json[name] = value
      return json
    })
    */
  }
  console.info(configState)
  if (configState && configState.error) setAlert({ text: configState.error, type: 'danger' })
  return configState.config ? (
    <>
      <Form>
        <h1>Engine Parameters</h1>
        <Row form>
          <Col md={4}>
            <OIbInteger
              id="port"
              label="Port"
              value={configState.config.engine.port || 2223}
              min={1}
              max={65535}
              help={<div>The port to access the Admin interface</div>}
              onChange={onChange}
            />
          </Col>
          <Col md={4}>
            <OIbText
              id="user"
              label="Admin user name"
              value={configState.config.engine.user || 'admin'}
              onChange={onChange}
              help={<div>The username of the Admin user</div>}
            />
          </Col>
          <Col md={4}>
            <OIbPassword
              label="Admin Password"
              id="password"
              onChange={onChange}
              value={configState.config.engine.password || 'd74ff0ee8da3b9806b18c877dbf29bbde50b5bd8e4dad7a3a725000feb82e8f1'}
              help={<div>The password of the Admin user</div>}
            />
          </Col>
        </Row>
        <Logging onChange={onChange} logParameters={configState.config.engine.logParameters} />
        <Filters onChange={onChange} filters={configState.config.engine.filter} />
        <Caching onChange={onChange} caching={configState.config.engine.caching} />
        <Row>
          <Proxies onChange={onChange} proxies={configState.config.engine.proxies} />
        </Row>
        <Row>
          <ScanModes onChange={onChange} scanModes={configState.config.engine.scanModes} />
        </Row>
      </Form>
      <pre>{JSON.stringify(configState)}</pre>
    </>
  ) : null
}

export default Engine
