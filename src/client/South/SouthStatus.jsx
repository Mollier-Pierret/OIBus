import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Breadcrumb, BreadcrumbItem, Container } from 'reactstrap'
import { AlertContext } from '../context/AlertContext.jsx'
import Table from '../components/table/Table.jsx'
import { ConfigContext } from '../context/configContext.jsx'

/**
 * Generate row entry for the status table.
 * @param {string} key - The key
 * @param {string} value - The value
 * @return {[{name: *, value: *}, {name: string, value: *}]} - The table row
 */
const generateRowEntry = (key, value) => [
  {
    name: key,
    value: key,
  },
  {
    name: 'value',
    value,
  },
]

const SouthStatus = () => {
  const { newConfig } = React.useContext(ConfigContext)

  const [connectorData, setConnectorData] = React.useState([])
  const { setAlert } = React.useContext(AlertContext)
  const { id } = useParams() // the dataSource id passed in the url
  const [dataSource, setDataSource] = React.useState(null)

  React.useEffect(() => {
    const currentDataSource = newConfig.south?.dataSources?.find((element) => element.id === id)
    setDataSource(currentDataSource)
    const source = new EventSource(`/south/${id}/sse`)
    source.onerror = (error) => {
      setAlert({ text: error.message, type: 'danger' })
    }
    source.onmessage = (event) => {
      if (event && event.data) {
        const myData = JSON.parse(event.data)
        const tableRows = []
        Object.keys(myData).forEach((key) => {
          tableRows.push(generateRowEntry(key, myData[key]))
        })
        setConnectorData(tableRows)
      }
    }
    return (() => source.close())
  }, [newConfig])

  return dataSource ? (
    <>
      <Breadcrumb tag="h5">
        <BreadcrumbItem tag={Link} to="/" className="oi-breadcrumb">
          Home
        </BreadcrumbItem>
        <BreadcrumbItem tag={Link} to="/south" className="oi-breadcrumb">
          South
        </BreadcrumbItem>
        <BreadcrumbItem tag={Link} to={`/south/${id}`} className="oi-breadcrumb">
          {dataSource.name}
        </BreadcrumbItem>
        <BreadcrumbItem active tag="span">
          Live-status
        </BreadcrumbItem>
      </Breadcrumb>
      <Row>
        <Container>{connectorData.length > 0 && <Table headers={[]} rows={connectorData} />}</Container>
      </Row>
    </>
  ) : null
}
export default SouthStatus
