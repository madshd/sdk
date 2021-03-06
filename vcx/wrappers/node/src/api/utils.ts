import { Callback } from 'ffi'

import { VCXInternalError } from '../errors'
import { initRustAPI, rustAPI } from '../rustlib'
import { createFFICallbackPromise } from '../utils/ffi-helpers'
import { IInitVCXOptions } from './common'
// import { resolve } from 'url';

export async function provisionAgent (configAgent: string, options: IInitVCXOptions = {}): Promise<string> {
  /**
   * Provision an agent in the agency, populate configuration and wallet for this agent.
   *
   * Example:
   * ```
   * enterpriseConfig = {
   *     'agency_url': 'https://enym-eagency.pdev.evernym.com',
   *     'agency_did': 'YRuVCckY6vfZfX9kcQZe3u',
   *     'agency_verkey': "J8Yct6FwmarXjrE2khZesUXRVVSVczSoa9sFaGe6AD2v",
   *     'wallet_name': 'LIBVCX_SDK_WALLET',
   *     'agent_seed': '00000000000000000000000001234561',
   *     'enterprise_seed': '000000000000000000000000Trustee1',
   *     'wallet_key': '1234'
   *  }
   * vcxConfig = await provisionAgent(JSON.stringify(enterprise_config))
   */
  try {
    initRustAPI(options.libVCXPath)
    return await createFFICallbackPromise<string>(
      (resolve, reject, cb) => {
        const rc = rustAPI().vcx_agent_provision_async(0, configAgent, cb)
        if (rc) {
          reject(rc)
        }
      },
      (resolve, reject) => Callback(
        'void',
        ['uint32','uint32','string'],
        (xhandle: number, err: number, config: string) => {
          if (err) {
            reject(err)
            return
          }
          resolve(config)
        })
    )
  } catch (err) {
    throw new VCXInternalError(err)
  }
}

export async function updateAgentInfo (options: string): Promise<string> {
  try {
    return await createFFICallbackPromise<string>(
      (resolve, reject, cb) => {
        const rc = rustAPI().vcx_agent_update_info(0, options, cb)
        if (rc) {
          reject(rc)
        }
      },
      (resolve, reject) => Callback(
        'void',
        ['uint32','uint32','string'],
        (xhandle: number, err: number, config: string) => {
          if (err) {
            reject(err)
            return
          }
          resolve(config)
        })
    )
  } catch (err) {
    throw new VCXInternalError(err)
  }
}

export function getVersion (): string {
  return rustAPI().vcx_version()
}

export async function getLedgerFees (): Promise<string> {
  /**
   * Get ledger fees from the sovrin network
   */
  try {
    const ledgerFees = await createFFICallbackPromise<string>(
      (resolve, reject, cb) => {
        const rc = rustAPI().vcx_ledger_get_fees(0, cb)
        if (rc) {
          reject(rc)
        }
      },
      (resolve, reject) => Callback(
        'void',
        ['uint32','uint32','string'],
        (xhandle: number, err: number, fees: string) => {
          if (err) {
            reject(err)
            return
          }
          resolve(fees)
        })
    )
    return ledgerFees
  } catch (err) {
    throw new VCXInternalError(err)
  }
}

export function shutdownVcx (deleteWallet: boolean): number {
  return rustAPI().vcx_shutdown(deleteWallet)
}

export interface IUpdateInstitutionConfigs {
  name: string,
  logoUrl: string
}
export function updateInstitutionConfigs ({ name, logoUrl }: IUpdateInstitutionConfigs): number {
  const rc = rustAPI().vcx_update_institution_info(name, logoUrl)
  if (rc) {
    throw new VCXInternalError(rc)
  }
  return rc
}

export interface IDownloadMessagesConfigs {
  status: string,
  uids: string,
  pairwiseDids: string
}

export async function downloadMessages
({ status, uids, pairwiseDids }: IDownloadMessagesConfigs): Promise<string> {
  try {
    return await createFFICallbackPromise<string>(
      (resolve, reject, cb) => {
        const rc = rustAPI().vcx_messages_download(0, status, uids, pairwiseDids, cb)
        if (rc) {
          reject(rc)
        }
      },
      (resolve, reject) => Callback(
        'void',
        ['uint32','uint32','string'],
        (xhandle: number, err: number, messages: string) => {
          if (err) {
            reject(err)
            return
          }
          resolve(messages)
        })
    )
  } catch (err) {
    throw new VCXInternalError(err)
  }
}

export interface IUpdateMessagesConfigs {
  msgJson: string
}

export async function updateMessages ({ msgJson }: IUpdateMessagesConfigs): Promise<number> {
  try {
    return await createFFICallbackPromise<number>(
      (resolve, reject, cb) => {
        const rc = rustAPI().vcx_messages_update_status(0, 'MS-106', msgJson, cb)
        if (rc) {
          reject(rc)
        }
      },
      (resolve, reject) => Callback(
        'void',
        ['uint32','uint32'],
        (xhandle: number, err: number) => {
          if (err) {
            reject(err)
            return
          }
          resolve(err)
        })
    )
  } catch (err) {
    throw new VCXInternalError(err)
  }
}
