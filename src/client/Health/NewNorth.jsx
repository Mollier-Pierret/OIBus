import React, { useState } from 'react'
import { Button, Popover, PopoverBody } from 'reactstrap'
import { nanoid } from 'nanoid'
import { ConfigContext } from '../context/configContext.jsx'
import NewApplicationRow from '../North/NewApplicationRow.jsx'
import validationNorth from '../North/Form/North.validation'

const NewNorth = () => {
  const { newConfig, dispatchNewConfig, apiList } = React.useContext(ConfigContext)
  const [openPopover, setOpenPopover] = useState(false)
  const applications = newConfig?.north?.applications ?? []

  const togglePopover = () => setOpenPopover(!openPopover)

  const addApplication = ({ name, api }) => {
    if (!applications.find((application) => application.name === name)) {
      togglePopover(false)
      dispatchNewConfig({
        type: 'addRow',
        name: 'north.applications',
        value: {
          id: nanoid(),
          name,
          api,
          enabled: false,
        },
      })
    }
  }

  return (
    <>
      <Button
        id="add-north"
        className="inline-button autosize oi-north-button"
        size="sm"
        outline
      >
        + North
      </Button>
      <Popover
        className="pop-container"
        trigger="legacy"
        placement="left"
        target="add-north"
        isOpen={openPopover}
        toggle={togglePopover}
      >
        <PopoverBody>
          <NewApplicationRow
            apiList={apiList}
            addApplication={addApplication}
            applicationList={applications?.map((application) => application.name) ?? []}
            valid={validationNorth.application.isValidName}
          />
        </PopoverBody>
      </Popover>
    </>

  )
}

export default NewNorth
