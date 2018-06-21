import '../module-resolver-helper'

import { assert } from 'chai'
import * as ffi from 'ffi'
import { shouldThrow } from 'helpers/utils'
import { initVcx, VCXCode, VCXRuntime } from 'src'

describe('vcxInit', () => {
  it('should throw if invalid path provided', async () => {
    const err = await shouldThrow(() => initVcx('invalidPath'))
    assert.equal(err.vcxCode, VCXCode.INVALID_CONFIGURATION)
  })

  it('should throw if null path provided', async () => {
    const err = await shouldThrow(() => initVcx(null as any))
    assert.equal(err.vcxCode, VCXCode.INVALID_CONFIGURATION)
  })
})

// these tests were created to only test that the ffi could be called with each function

describe('Using the vcx ffi directly', () => {
  const path = '/usr/lib/libvcx.so'
  const run = new VCXRuntime({ basepath: path })

  it('a call to vcx_connection_create should return 0', () => {
    const result = run.ffi.vcx_connection_create(
      0,
      '1',
      ffi.Callback(
        'void',
        ['uint32', 'uint32', 'uint32'],
        (xhandle: number, err: number, connectionHandle: number) => null
      )
    )
    assert.equal(result, 0)
  })

  it('a call to vcx_connection_connect without the ability to connect should return 1', () => {
    const result = run.ffi.vcx_connection_connect(
      0,
      '1',
      JSON.stringify({ connection_type: 'sms', phone: 123 }),
      ffi.Callback(
        'void',
        ['uint32', 'uint32', 'uint32'],
        (xhandle: number, err: number, connectionHandle: number) => null
      )
    )
    assert.equal(result, 1)
  })

  it('a call to vcx_connection_serialize should return 1', () => {
    const result = run.ffi.vcx_connection_serialize(
      0,
      '1',
      ffi.Callback(
        'void',
        ['uint32', 'uint32', 'string'],
        (xhandle: number, err: number, data: string) => null
      )
    )
    assert.equal(result, 1)
  })

  it('a call to vcx_connection_get_state should return 1', () => {
    const result = run.ffi.vcx_connection_update_state(
      0,
      '1',
      ffi.Callback(
        'void',
        ['uint32', 'uint32', 'uint32'],
        (xhandle: number, err: number, state: number) => null
      )
    )
    assert.equal(result, 1)
  })

  it('a call to vcx_connection_release without ability to release should return 1', () => {
    assert.equal(run.ffi.vcx_connection_release('2'), 1)
  })
})
