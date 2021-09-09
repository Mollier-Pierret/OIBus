/**
 * @jest-environment jsdom
 */
import React from 'react'
import ReactDOM from 'react-dom'
import * as nanoid from 'nanoid'
import { act, Simulate } from 'react-dom/test-utils'
import SouthSettings from './SouthSettings.jsx'
import newConfig from '../../../tests/testConfig'

// mocking the nanoid method
jest.mock('nanoid')
jest.spyOn(nanoid, 'nanoid').mockReturnValue('generated-uuid')

// ReacFlow does not seem to be working with jest.
// so we have to mock this component
jest.mock('../../../node_modules/react-flow-renderer/dist/ReactFlow.js', () => () => ('ReactFlow'))

const dispatchNewConfig = jest.fn((link) => link)

const mockHistoryPush = jest.fn()

jest.mock('react-router-dom', () => (
  { useHistory: () => ({ push: mockHistoryPush }) }
))

const dataSource = newConfig.south.dataSources[0]

let container

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  document.body.removeChild(container)
  container = null
})

React.useContext = jest.fn().mockReturnValue({ newConfig, dispatchNewConfig })

describe('SouthSettings', () => {
  test('display SouthSettings page based on config', async () => {
    act(() => {
      ReactDOM.render(
        <SouthSettings dataSource={dataSource} renamingConnector={() => 1} />,
        container,
      )
    })
    expect(container).toMatchSnapshot()
  })

  test('check duplicate first dataSource', () => {
    act(() => {
      ReactDOM.render(
        <SouthSettings dataSource={dataSource} renamingConnector={() => 1} />, container,
      )
    })
    Simulate.click(document.getElementById('dropdown-toggle'))
    Simulate.click(document.getElementById('icon-duplicate'))
    expect(dispatchNewConfig).toBeCalledWith({
      type: 'addRow',
      name: 'south.dataSources',
      value: {
        ...dataSource,
        name: 'MQTTServer copy',
        enabled: false,
        id: 'generated-uuid',
      },
    })
    expect(container).toMatchSnapshot()
  })

  test('check edit first dataSource', () => {
    act(() => {
      ReactDOM.render(
        <SouthSettings dataSource={dataSource} renamingConnector={() => 1} />, container,
      )
    })
    Simulate.click(document.getElementById('dropdown-toggle'))
    Simulate.click(document.getElementById('icon-settings'))
    expect(mockHistoryPush).toBeCalledWith({ pathname: `/south/${newConfig.south.dataSources[0].id}` })
    expect(container).toMatchSnapshot()
  })

  test('check status first dataSource', () => {
    act(() => {
      ReactDOM.render(
        <SouthSettings dataSource={dataSource} renamingConnector={() => 1} />, container,
      )
    })
    Simulate.click(document.getElementById('dropdown-toggle'))
    Simulate.click(document.getElementById('icon-status'))
    expect(mockHistoryPush).toBeCalledWith({ pathname: `/south/${newConfig.south.dataSources[0].id}/live` })
    expect(container).toMatchSnapshot()
  })

  test('check delete first application', () => {
    act(() => {
      ReactDOM.render(
        <SouthSettings dataSource={dataSource} renamingConnector={() => 1} />, container,
      )
    })
    Simulate.click(document.getElementById('dropdown-toggle'))
    Simulate.click(document.getElementById('icon-delete'))
    Simulate.click(document.getElementById('icon-confirm'))
    expect(dispatchNewConfig).toBeCalledWith({
      type: 'deleteRow',
      name: 'south.dataSources.0',
    })
    expect(container).toMatchSnapshot()
  })

  test('check rename first dataSource', () => {
    act(() => {
      ReactDOM.render(
        <SouthSettings dataSource={dataSource} renamingConnector={() => 1} />, container,
      )
    })
    Simulate.click(document.getElementById('dropdown-toggle'))
    Simulate.click(document.getElementById('icon-rename'))
    expect(container).toMatchSnapshot()
  })
})
