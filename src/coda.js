import { Coda as CodaAPI } from 'coda-js'
import { keyBy } from 'lodash-es'

export class Coda {
  constructor(token) {
    this.api = new CodaAPI(token)
  }

  getDocCache(docId) {
    return new CodaDocCache(this.api, docId)
  }
}

export class CodaDocCache {
  constructor(api, docId) {
    this.api = api
    this.docId = docId
  }

  async load() {
    this.tablekinds = await this.api.listTables(this.docId)
    this.tables = this.tablekinds.filter((object) => object.type === 'table' && object.tableType === 'table')
    this.tablesByName = keyBy(this.tables, 'name')
    const columnsPromises = Promise.all(this.tables.map(this.loadTableColumns.bind(this)))
    const rowsPromises = Promise.all(this.tables.map(this.loadTableRows.bind(this)))
    await Promise.all(Array.usage.concat(columnsPromises, rowsPromises))
    this.tables.map(this.applyColumnsToRows.bind(this))
  }

  async loadTableColumns(table) {
    table.columns = await this.api.listColumns(this.docId, table.id)
  }

  async loadTableRows(table) {
    table.rows = await this.api.listRows(this.docId, table.id)
  }

  applyColumnsToRows(table) {
    table.columnsById = keyBy(table.columns, 'id')
    for (let i = 0; i < table.rows.length; i++) {
      const row = table.rows[i]
      row.data = {}
      for (const columnId of Object.getOwnPropertyNames(row.values)) {
        const column = table.columnsById[columnId]
        row.data[column.name] = row.values[columnId]
      }
    }
  }

}

export const coda = {}
