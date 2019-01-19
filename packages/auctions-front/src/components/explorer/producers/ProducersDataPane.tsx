import React from 'react'
import styled, { colors, SVGLibrary } from '../../../styles'
import { ExplorerTable } from '../ExplorerTable'
import { ColumnProps, columnsBuilder } from '../../table/ColumnProps'
import { proxiesApi, ProxyRow } from '../../../store/api/explorer/proxies'
import moment from 'moment'
import { FrontState } from '../../../store/reducer'
import { EOSPlorerBaseURL } from '../../../store/api/http'
import { AsyncState } from '@sha/fsa'
import useAsyncState from '../../../hooks/useAsyncState'
import { DefaultCellLayout, TableCell } from '../../table/TableCell'
import { ProducerRow, producersApi } from '../../../store/api/explorer/producers'

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
    height: 5em;
    margin-right: 2em;
  }
  span {
    font-size: 1.6em;
    font-weight: bold;
  }
`

const GoldCellLayout = styled(DefaultCellLayout)`
  border-radius: 0.5em;
  border: 1px solid #FFAE00;
  text-align: center;
  color: ${colors.accent};
  span {
    
  }
`

const Green = styled.div`
  width: 1em;
  height: 1em;
  background-color: #0EC500;
  border-radius: 0.5em;
  margin: auto;
`

const Red = styled(Green)`
  background-color: #FF2200;

`

const Links = styled.div`
  a {
    cursor: pointer;
    margin-right: 1em;
  }
`

const proxyColumns: ColumnProps<ProducerRow, keyof ProducerRow> = columnsBuilder<ProducerRow>()
  .add(
    {
      title: 'rank',
      dataIndex: 'rank',
      width: '5%',
    })
  .add({
    title: 'BP Name',
    dataIndex: 'name',
    width: '30%',
    render: (value, record) =>
      <NameCellLayout>
        <img src={record.branding.logo_svg} />
        <span>{value}</span>
      </NameCellLayout>,
  })
  .add({
    title: 'status',
    dataIndex: 'rank',
    width: '6%',
    render: (value) => {

      return (Number(value) <= 21)
        ? <GoldCellLayout><span>TOP 21</span></GoldCellLayout>
        : value
    },
  })
  .add({
    title: 'network',
    dataIndex: 'is_active',
    width: '7%',
    render: (value) =>
      value
        ? <Green />
        : <Red />
    ,
  })
  .add(
    {
      title: 'location',
      dataIndex: 'location',
      width: '11%',
      render: (value) =>
        <CountryCellLayout>
          <img src={'https://www.countryflags.io/' + value.country.toLowerCase() + '/flat/64.png'}></img>
          <span>{value.country}</span>
        </CountryCellLayout>,
    })
  .add(
    {
      title: 'links',
      dataIndex: 'url',
      width: '12%',
      render: (value, record) =>
        <Links>
          {
            value &&
            <a href={value}>W</a>
          }
          {
            record.social.telegram &&
            <a href={record.social.telegram}>T</a>
          }
        </Links>

    })
  .add(
    {
      title: 'total votes',
      dataIndex: 'total_votes',
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


export const ProducersDataPane = () => {

  const state = useAsyncState(producersApi.getAll)

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
