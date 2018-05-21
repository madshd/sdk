import { Callback } from 'ffi'

import { VCXInternalError } from '../errors'
import { rustAPI } from '../rustlib'
import { createFFICallbackPromise } from '../utils/ffi-helpers'
import { VCXBase } from './VCXBase'

export type PaymentAddress = string
export type PaymentAmount = number
export type PaymentHandle = number
/**
 * @interface An interface representing a record that can be added to the wallet
 */
export interface IRecord {
  type_: string,
  id: string,
  value: any,
  tags: any,
}

/**
 * @class Class representing a Wallet
 */
export class Wallet {

  /**
   * @memberof Wallet
   * @description Gets wallet token info
   * @static
   * @async
   * @param {paymentAddress} address
   * @returns {Promise<string>} Wallet info, balance, addresses, etc
   */
  static async getTokenInfo ( handle: PaymentHandle): Promise<string> {
    try {
      return await createFFICallbackPromise<string>(
        (resolve, reject, cb) => {
          const rc = rustAPI().vcx_wallet_get_token_info(0, handle, cb)
          if (rc) {
            reject(rc)
          }
        },
        (resolve, reject) => Callback('void', ['uint32','uint32','string'], (xhandle, err, info) => {
          if (err) {
            reject(err)
            return
          } else {
            resolve(info)
          }
        })
      )
    } catch (err) {
      throw new VCXInternalError(err, VCXBase.errorMessage(err), 'vcx_wallet_get_token_info')
    }
  }

  /**
   * @memberof Wallet
   * @description Sends token to a specified address
   * @static
   * @async
   * @param {PaymentAddress} payment
   * @param {PaymentAmount} amount
   * @returns {Promise<string>} The receipt
   */
  static async sendTokens ( payment: PaymentHandle, tokens: PaymentAmount, recipient: PaymentAddress): Promise<string> {
    try {
      return await createFFICallbackPromise<string>(
        (resolve, reject, cb) => {
          const rc = rustAPI().vcx_wallet_send_tokens(0, payment, tokens, recipient, cb)
          if (rc) {
            reject(rc)
          }
        },
        (resolve, reject) => Callback('void', ['uint32','uint32','string'], (xhandle, err, receipt) => {
          if (err) {
            reject(err)
            return
          } else {
            resolve(receipt)
          }
        })
      )
    } catch (err) {
      throw new VCXInternalError(err, VCXBase.errorMessage(err), 'vcx_wallet_send_tokens')
    }
  }

  /**
   * @memberof Wallet
   * @description Adds a record to the wallet for storage
   * @static
   * @async
   * @param {Record} record
   * @returns {Promise<void>}
   */
  static async addRecord ( record: IRecord): Promise<void> {
    const commandHandle = 0
    try {
      await createFFICallbackPromise<number>(
        (resolve, reject, cb) => {
          const rc = rustAPI().vcx_wallet_add_record(commandHandle,
            record.type_,
            record.id, record.value,
            JSON.stringify(record.tags),
            cb)
          if (rc) {
            reject(rc)
          }
        },
        (resolve, reject) => Callback('void', ['uint32','uint32','string'], (xhandle, err, receipt) => {
          if (err) {
            reject(err)
            return
          } else {
            resolve(receipt)
          }
        })
      )
    } catch (err) {
      throw new VCXInternalError(err, VCXBase.errorMessage(err), 'vcx_wallet_add_record')
    }
  }

  /**
   * @memberof Wallet
   * @description Updates a record already in the wallet
   * @static
   * @async
   * @param {Record} record
   * @returns {Promise<void>}
   */
  static async updateRecordValue ( record: IRecord): Promise<void> {
    const commandHandle = 0
    try {
      await createFFICallbackPromise<number>(
        (resolve, reject, cb) => {
          const rc = rustAPI().vcx_wallet_update_record_value(commandHandle,
            record.type_,
            record.id, record.value,
            cb)
          if (rc) {
            reject(rc)
          }
        },
        (resolve, reject) => Callback('void', ['uint32','uint32','string'], (xhandle, err, receipt) => {
          if (err) {
            reject(err)
            return
          } else {
            resolve(receipt)
          }
        })
      )
    } catch (err) {
      throw new VCXInternalError(err, VCXBase.errorMessage(err), 'vcx_wallet_wallet_update_value')
    }
  }

  /**
   * @memberof Wallet
   * @description Updates a record's tags already in the wallet
   * @static
   * @async
   * @param {Record} record
   * @returns {Promise<void>}
   */
  static async updateRecordTags ( record: IRecord): Promise<void> {
    const commandHandle = 0
    try {
      await createFFICallbackPromise<number>(
        (resolve, reject, cb) => {
          const rc = rustAPI().vcx_wallet_update_record_tags(commandHandle,
            record.type_,
            record.id,
            JSON.stringify(record.tags),
            cb)
          if (rc) {
            reject(rc)
          }
        },
        (resolve, reject) => Callback('void', ['uint32','uint32','string'], (xhandle, err, receipt) => {
          if (err) {
            reject(err)
            return
          } else {
            resolve(receipt)
          }
        })
      )
    } catch (err) {
      throw new VCXInternalError(err, VCXBase.errorMessage(err), 'vcx_wallet_wallet_update_tags')
    }
  }

  /**
   * @memberof Wallet
   * @description Adds tags to a record already in the wallet
   * @static
   * @async
   * @param {Record} record
   * @returns {Promise<void>}
   */
  static async addRecordTags ( record: IRecord): Promise<void> {
    const commandHandle = 0
    try {
      await createFFICallbackPromise<number>(
        (resolve, reject, cb) => {
          const rc = rustAPI().vcx_wallet_add_record_tags(commandHandle,
            record.type_,
            record.id,
            JSON.stringify(record.tags),
            cb)
          if (rc) {
            reject(rc)
          }
        },
        (resolve, reject) => Callback('void', ['uint32','uint32','string'], (xhandle, err, receipt) => {
          if (err) {
            reject(err)
            return
          } else {
            resolve(receipt)
          }
        })
      )
    } catch (err) {
      throw new VCXInternalError(err, VCXBase.errorMessage(err), 'vcx_wallet_wallet_update_tags')
    }
  }

  /**
   * @memberof Wallet
   * @description Tags to delete from a record already in the wallet
   * @static
   * @async
   * @param {Record} record
   * @param {List} tagList
   * @returns {Promise<void>}
   */
  static async deleteRecordTags ( record: IRecord, tagList: string[]): Promise<void> {
    const commandHandle = 0
    try {
      await createFFICallbackPromise<number>(
        (resolve, reject, cb) => {
          const rc = rustAPI().vcx_wallet_delete_record_tags(commandHandle,
            record.type_,
            record.id,
            JSON.stringify(tagList),
            cb)
          if (rc) {
            reject(rc)
          }
        },
        (resolve, reject) => Callback('void', ['uint32','uint32','string'], (xhandle, err, receipt) => {
          if (err) {
            reject(err)
            return
          } else {
            resolve(receipt)
          }
        })
      )
    } catch (err) {
      throw new VCXInternalError(err, VCXBase.errorMessage(err), 'vcx_wallet_wallet_update_tags')
    }
  }

  /**
   * @memberof Wallet
   * @description Delete a record already in the wallet
   * @static
   * @async
   * @param {Record} record
   * @param {List} tagList
   * @returns {Promise<void>}
   */
  static async deleteRecord (type: string, id: string): Promise<void> {
    const commandHandle = 0
    try {
      await createFFICallbackPromise<number>(
        (resolve, reject, cb) => {
          const rc = rustAPI().vcx_wallet_delete_record(commandHandle,
            type,
            id,
            cb)
          if (rc) {
            reject(rc)
          }
        },
        (resolve, reject) => Callback('void', ['uint32','uint32','string'], (xhandle, err, receipt) => {
          if (err) {
            reject(err)
            return
          } else {
            resolve(receipt)
          }
        })
      )
    } catch (err) {
      throw new VCXInternalError(err, VCXBase.errorMessage(err), 'vcx_wallet_delete_record')
    }
  }

  /**
   * @memberof Wallet
   * @description Retrieve a record already in the wallet
   * @static
   * @async
   * @param {String} type
   * @param {String} id
   * @returns {Promise<string>}
   */
  static async getRecord (type: string, id: string): Promise<string> {
    const commandHandle = 0
    try {
      return await createFFICallbackPromise<string>(
        (resolve, reject, cb) => {
          const rc = rustAPI().vcx_wallet_get_record(commandHandle,
            type,
            id,
            cb)
          if (rc) {
            reject(rc)
          }
        },
        (resolve, reject) => Callback('void', ['uint32','uint32','string'], (xhandle, err, info) => {
          if (err) {
            reject(err)
            return
          } else {
            resolve(info)
          }
        })
      )
    } catch (err) {
      throw new VCXInternalError(err, VCXBase.errorMessage(err), 'vcx_wallet_get_record')
    }
  }

   /**
    * @memberof Wallet
    * @description Open a search handle
    * @static
    * @async
    * @param {String} type
    * @param {String} id
    * @returns {Promise<string>}
    */
  static async openSearch (type: string, queryJson: string, options: string): Promise<number> {
    const commandHandle = 0
    try {
      return await createFFICallbackPromise<number>(
        (resolve, reject, cb) => {
          const rc = rustAPI().vcx_wallet_open_search(commandHandle,
            type,
            queryJson,
            options,
            cb)
          if (rc) {
            reject(rc)
          }
        },
        (resolve, reject) => Callback('void', ['uint32','uint32','uint32'], (xhandle, err, handle) => {
          if (err) {
            reject(err)
            return
          } else {
            resolve(handle)
          }
        })
      )
    } catch (err) {
      throw new VCXInternalError(err, VCXBase.errorMessage(err), 'vcx_wallet_open_search')
    }
  }

  /**
   * @memberof Wallet
   * @description Open a search handle
   * @static
   * @async
   * @param {String} type
   * @param {String} id
   * @returns {Promise<string>}
   */
  static async closeSearch (handle: number): Promise<void> {
    const commandHandle = 0
    try {
      await createFFICallbackPromise<void>(
        (resolve, reject, cb) => {
          const rc = rustAPI().vcx_wallet_close_search(commandHandle,
            handle,
            cb)
          if (rc) {
            reject(rc)
          }
        },
        (resolve, reject) => Callback('void', ['uint32','uint32'], (xhandle, err) => {
          if (err) {
            reject(err)
            return
          } else {
            resolve(handle)
          }
        })
      )
    } catch (err) {
      throw new VCXInternalError(err, VCXBase.errorMessage(err), 'vcx_wallet_open_search')
    }
  }

  /**
   * @memberof Wallet
   * @description Initiate or continue a search
   * @static
   * @async
   * @param {number} searchHandle
   * @param {number} count
   * @returns {Promise<string>}
   */
  static async searchNextRecords (handle: number, count: number): Promise<string> {
    const commandHandle = 0
    try {
      return await createFFICallbackPromise<string>(
        (resolve, reject, cb) => {
          const rc = rustAPI().vcx_wallet_search_next_records(commandHandle,
            handle,
            count,
            cb)
          if (rc) {
            reject(rc)
          }
        },
        (resolve, reject) => Callback('void', ['uint32','uint32','string'], (xhandle, err, info) => {
          if (err) {
            reject(err)
            return
          } else {
            resolve(info)
          }
        })
      )
    } catch (err) {
      throw new VCXInternalError(err, VCXBase.errorMessage(err), 'vcx_wallet_search_next_records')
    }
  }
}
