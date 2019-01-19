import React from 'react'
import styled, { colors } from '../../../styles'
import { ExplorerTable } from '../ExplorerTable'
import { ColumnProps, columnsBuilder } from '../../table/ColumnProps'
import { proxiesApi, ProxyRow } from '../../../store/api/explorer/proxies'
import moment from 'moment'
import { FrontState } from '../../../store/reducer'
import { EOSPlorerBaseURL } from '../../../store/api/http'
import { AsyncState } from '@sha/fsa'
import useAsyncState from '../../../hooks/useAsyncState'
import { DefaultCellLayout, TableCell } from '../../table/TableCell'

const selector = (state: FrontState): AsyncState<ProxyRow[]> => {
  const result = {
    ...state.app.explorer.proxies,
    value: state.app.explorer.proxies.value = [],
  }

  return result
}

const NameCellLayout = styled(DefaultCellLayout)`
  display: flex;
  align-items: center;
  img {
    width: 3em;
    height: 3em;
    margin-right: 1em;
  }
  span {
    font-size: 1.6em;
    font-weight: bold;
    color: ${colors.accent};
  }
`
const CountryCellLayout = styled(DefaultCellLayout)`
  display: flex;
  align-items: center;
  img {
    width: 5em;
    height: 4em;
    margin-right: 1em;
  }
  span {
    font-size: 1.6em;
    font-weight: bold;
  }
`
const proxyColumns: ColumnProps<ProxyRow, keyof ProxyRow> = columnsBuilder<ProxyRow>()
  .add(
  {
    title: 'rank',
    dataIndex: 'rank',
    width: '5%',
  })
  .add({
    title: 'Name',
    dataIndex: 'name',
    width: '30%',
    render: (value, record) =>
      <NameCellLayout>
        <img src={record.logo} />
        <span>{value}</span>
      </NameCellLayout>,
  })
  .add({
    title: 'account',
    dataIndex: 'account',
    width: '19%',
    link: value => EOSPlorerBaseURL + 'accounts/' + value,
  })
  .add(
  {
    title: 'account EOS',
    dataIndex: 'accountEOS',
    width: '11%',
  })
  .add(
  {
    title: 'proxied eos',
    dataIndex: 'proxiedEOS',
    width: '12%',
    mapValue: value => String(value)
  })
  .add(
    {
      title: 'total eos',
      dataIndex: 'totalEOS',
      width: '12%',
    })
  .add(
    {
      title: 'proxied accounts',
      dataIndex: 'proxiedAccounts',
      width: '10%',
    })
  .add(
    {
      title: 'candidate votes',
      dataIndex: 'candidateVotes',
      width: '10%',
    })
  .columns()


export const ProxiesDataPane = () => {

  const state = useAsyncState(proxiesApi.getAll)

  return React.createElement(
    ExplorerTable,
    {
      columns: proxyColumns,
      state,
      paginationConfig: {
        maxPagesToShow: 6,
        maxRowsOptions: [6],
      },
    },
  )
}
