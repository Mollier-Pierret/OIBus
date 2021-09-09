import React from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Form, Row } from 'reactstrap'
import { nanoid } from 'nanoid'
import { OIbSelect, OIbText } from '../components/OIbForm/index'

const NewApplicationRow = ({ applicationList, apiList, addApplication, valid }) => {
  const [name, setName] = React.useState('')
  const [api, setApi] = React.useState(apiList[0])

  /**
   * Updates the application's state
   * @returns {void}
   */
  const handleAddApplication = () => {
    if (!valid(name, applicationList)) {
      addApplication({ id: nanoid(), name, api })
    }
  }

  const handleChange = (attributeName, value) => {
    switch (attributeName) {
      case 'name':
        setName(value)
        break
      case 'api':
      default:
        setApi(value)
        break
    }
  }
  return (
    <Form>
      <Row>
        <Col md="7">
          <OIbText
            label="Application Name"
            value={name}
            name="name"
            onChange={handleChange}
            defaultValue=""
            valid={() => valid(name, applicationList)}
          />
        </Col>
        <Col md="5">
          <OIbSelect label="API" value={api} name="api" options={apiList} defaultValue={apiList[0]} onChange={handleChange} />
        </Col>
      </Row>
      <br />
      <Col md="2">
        <Button size="sm" id="icon-add" className="oi-add-button" color="primary" onClick={() => handleAddApplication()}>
          Add
        </Button>
      </Col>
    </Form>
  )
}

NewApplicationRow.propTypes = {
  apiList: PropTypes.arrayOf(PropTypes.string).isRequired,
  applicationList: PropTypes.arrayOf(PropTypes.string).isRequired,
  addApplication: PropTypes.func.isRequired,
  valid: PropTypes.func.isRequired,

}
export default NewApplicationRow
