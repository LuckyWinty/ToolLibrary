import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import isEqual from 'lodash/isEqual'
import { arrayToObject } from '../../utils'

const SelectTable = (props)=> {
  const { rowKey } = props
  const propsRowSelection = props.rowSelection || {}
  const rowOnChange = propsRowSelection.onChange ? propsRowSelection.onChange : (() => {})

  const [selectedMap, setSelectedMap] = useState(arrayToObject(propsRowSelection.selectedRows, rowKey))
  const [selectedRowKeys, setSelectedRowKeys] = useState(Object.keys(selectedMap))

  const handleSelectChange = (map) => {
    const tempRows = Object.values(map)
    const tempKeys = Object.keys(map)
    setSelectedRowKeys(tempKeys)
    rowOnChange(tempKeys, tempRows)
  }
  const setOneSelectRow = (record, selected)=> {
    const tempSelectedMap = { ...selectedMap }
    if (selected) {
      tempSelectedMap[record[rowKey]] = record
    } else {
      delete tempSelectedMap[record[rowKey]]
    }
    setSelectedMap(tempSelectedMap)
    handleSelectChange(tempSelectedMap)
  }
  const setAllSelectRow = (selected, selectRows, changeRows) => {
    const tempSelectedMap = { ...selectedMap }
    if (selected) {
      selectRows.forEach((row) => {
        tempSelectedMap[row[rowKey]] = row
      })
    } else {
      changeRows.forEach((row) => {
        delete tempSelectedMap[row[rowKey]]
      })
    }
    setSelectedMap(tempSelectedMap)
    handleSelectChange(tempSelectedMap)
  }

  useEffect(() => {
    const propsKeys = propsRowSelection.selectedRows.map(row => row[rowKey])
    if (propsKeys && (!isEqual(propsKeys, selectedRowKeys))) {
      setSelectedMap(arrayToObject(propsRowSelection.selectedRows, rowKey))
      setSelectedRowKeys(propsKeys)
    }
  }, [propsRowSelection.selectedRowKeys, propsRowSelection.selectedRows, rowKey, selectedRowKeys])

  const {
    xscorll, list = [], rowSelection, ...rest
  } = props

  return (
    <>
      <Table
        align="center"
        scroll={{ x: xscorll || 'max-content' }}
        dataSource={list}
        {...rest}
        rowSelection={{
          ...rowSelection,
          type: 'checkbox',
          selectedRowKeys,
          onSelect: setOneSelectRow,
          onSelectAll: setAllSelectRow,
        }}
      />
    </>
  )
}
export default SelectTable
