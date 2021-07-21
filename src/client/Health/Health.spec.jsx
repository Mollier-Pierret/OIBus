/**
 * @jest-environment jsdom
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { act } from 'react-dom/test-utils'

// need BrowserRouter so Link component is not complaining
import { BrowserRouter } from 'react-router-dom'

import apis from '../services/apis'
import Health from './Health.jsx'

import activeConfig from '../../../tests/testConfig'

// ReacFlow does not seem to be working with jest.
// so we have to mock this component
jest.mock('../../../node_modules/react-flow-renderer/dist/ReactFlow.js', () => () => 'ReactFlow')

let container

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  document.body.removeChild(container)
  container = null
})

// sample status (object returned by Server to give various informations on the behavior)
const status = {
  version: '0.5.7-dev',
  architecture: 'x64',
  currentDirectory: 'C:\\Users\\jfh\\Documents\\GitHub\\OIBus\\tests',
  nodeVersion: 'v12.13.1',
  executable: 'C:\\Users\\jfh\\Documents\\GitHub\\OIBus\\dist\\win\\oibus.exe',
  configurationFile: 'C:\\Users\\jfh\\Documents\\GitHub\\OIBus\\tests\\oibus.json',
  memory: '564.89/2047.61/27.59 MB/%',
  rss: '127.80/128.79/354.32 MB',
  heapTotal: '79.55/81.54/281.62 MB',
  heapUsed: '60.54/60.54/261.28 MB',
  external: '1.99/2.16/3.16 MB',
  processId: 4916,
  uptime: '3 minutes',
  hostname: 'EC2AMAZ-OBJ8M6C',
  osRelease: '10.0.14393',
  osType: 'Windows_NT',
  apisCacheStats: [
    {
      name: 'Console (points)',
      count: 195410,
      cache: 614,
    },
    {
      name: 'Console (files)',
      count: 195410,
      cache: 0,
    },
  ],
  protocolsCacheStats: [
    {
      name: 'MQTTServer',
      count: 62,
    },
    {
      name: 'SimulationServer',
      count: 422,
    },
    {
      name: 'OPC-HDA',
      count: 194926,
    },
  ],
  copyright: '(c) Copyright 2019 Optimistik, all rights reserved.',
}
// mock get Status
let resolve
let reject
const setAlert = jest.fn()
apis.getStatus = () => new Promise((_resolve, _reject) => {
  resolve = _resolve
  reject = _reject
})
React.useContext = jest.fn().mockReturnValue({ activeConfig, setAlert })
describe('Health', () => {
  test('display Health page based on config and status', async () => {
    act(() => {
      ReactDOM.render(
        <BrowserRouter>
          <Health />
        </BrowserRouter>,
        container,
      )
    })
    expect(container).toMatchSnapshot()
    // resolve the call requested by useffect
    await act(async () => {
      resolve(status)
    })
    expect(container).toMatchSnapshot()
  })
  test('Health: manage error in status call', async () => {
    const originalError = console.error
    console.error = jest.fn()
    act(() => {
      ReactDOM.render(
        <BrowserRouter>
          <Health />
        </BrowserRouter>,
        container,
      )
    })
    // resolve the call requested by useffect with a reject
    await act(async () => {
      reject('error')
    })
    expect(setAlert).toHaveBeenCalled()
    console.error = originalError
  })
  test('display Health with config null', () => {
    React.useContext = jest.fn().mockReturnValue({ activeConfig: null, setAlert })
    act(() => {
      ReactDOM.render(
        <BrowserRouter>
          <Health />
        </BrowserRouter>,
        container,
      )
    })
    expect(container).toMatchSnapshot()
    React.useContext = jest.fn().mockReturnValue({ activeConfig, setAlert })
  })
})
