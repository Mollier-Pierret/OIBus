import React, { useState } from 'react'
import { nanoid } from 'nanoid'
import { Button, Popover, PopoverBody } from 'reactstrap'
import { ConfigContext } from '../context/configContext.jsx'
import NewDataSourceRow from '../South/NewDataSourceRow.jsx'
import validationSouth from '../South/Form/South.validation'

const NewSouth = () => {
  const { newConfig, dispatchNewConfig, protocolList } = React.useContext(ConfigContext)
  const [openPopover, setOpenPopover] = useState(false)
  const dataSources = newConfig?.south?.dataSources ?? []

  const togglePopover = () => setOpenPopover(!openPopover)

  const addDataSource = ({ name, protocol }) => {
    if (!dataSources.find((dataSource) => dataSource.name === name)) {
      togglePopover(null)
      dispatchNewConfig({
        type: 'addRow',
        name: 'south.dataSources',
        value: {
          id: nanoid(),
          name,
          protocol,
          enabled: false,
        },
      })
    }
  }

  return (
    <>
      <Button
        id="add-south"
        className="inline-button autosize oi-south-button"
        size="sm"
        outline
      >
        + South
      </Button>
      <Popover
        className="pop-container"
        trigger="legacy"
        placement="right"
        target="add-south"
        isOpen={openPopover}
        toggle={togglePopover}
      >
        <PopoverBody>
          <NewDataSourceRow
            protocolList={protocolList}
            addDataSource={addDataSource}
            dataSourceList={dataSources?.map((dataSource) => dataSource.name) ?? []}
            valid={validationSouth.protocol.isValidName}
          />
        </PopoverBody>
      </Popover>
    </>
  )
}

export default NewSouth
