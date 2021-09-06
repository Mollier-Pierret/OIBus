import React from 'react'
import PropTypes from 'prop-types'
import { nanoid } from 'nanoid'
import { Button, Col, Form, Row } from 'reactstrap'
import { OIbSelect, OIbText } from '../components/OIbForm/index'

const NewDataSourceRow = ({ dataSourceList, protocolList, addDataSource, valid }) => {
  const [name, setName] = React.useState('')
  const [protocol, setProtocol] = React.useState(protocolList[0])

  /**
   * Updates the dataSource's state
   * @returns {void}
   */
  const handleAddDataSource = () => {
    if (!valid(name, dataSourceList)) {
      addDataSource({ id: nanoid(), name, protocol })
    }
  }

  const handleChange = (attributeName, value) => {
    switch (attributeName) {
      case 'name':
        setName(value)
        break
      case 'protocol':
      default:
        setProtocol(value)
        break
    }
  }

  return (
    <Form>
      <Row>
        <Col md="7">
          <OIbText
            label="New DataSource Name"
            value={name}
            name="name"
            onChange={handleChange}
            defaultValue=""
            valid={() => valid(name, dataSourceList)}
          />
        </Col>
        <Col md="5">
          <OIbSelect
            label="Protocol"
            value={protocol}
            name="protocol"
            options={protocolList}
            defaultValue={protocolList[0]}
            onChange={handleChange}
          />
        </Col>
      </Row>
      <br />
      <Col md="2">
        <Button size="sm" className="oi-add-button" color="primary" onClick={() => handleAddDataSource()}>
          Add
        </Button>
      </Col>
    </Form>
  )
}

NewDataSourceRow.propTypes = {
  protocolList: PropTypes.arrayOf(PropTypes.string).isRequired,
  dataSourceList: PropTypes.arrayOf(PropTypes.string).isRequired,
  addDataSource: PropTypes.func.isRequired,
  valid: PropTypes.func.isRequired,
}
export default NewDataSourceRow
