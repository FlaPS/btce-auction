import React from 'react'
import {AccountVO} from '../../store/valueObjects'
import {prop, take, uniqBy} from 'ramda'
import compose from 'lazy-compose'
import SVGLibrary from '../../styles/SVGLibrary'
import styled from '../../styles'
import {Div} from '@sha/react-fp'
import AccountIcon from '../AccountIcon'
import {AccountsContext} from '../../contexts'

/**
 * Map accountIds to a list of icons. Show less or equal 5 isons
 * @param accounts
 * @param props
 */
export default ({
                    accountIds = [],
                    showAccounts,
                    ...props
                }: NetworksTrayProps) => (
    <Layout {...props}>
        {(showAccounts ? renderAccounts : renderNetworks)(
            selectAccounts(accountIds),
        )}
    </Layout>
)

const selectAccounts = (accountIds: string[]) =>
    AccountsContext.subscribe(accounts =>
        accounts.filter(({accountId}) => accountIds.includes(accountId)),
    )

const renderNetworks = (accounts: ReadonlyArray<AccountVO> = []) => {
    return take5(getUniqueNetworks(accounts)).map((item, index) =>
        getIcon(item.network)({key: index, width: '2em', height: '2em'}),
    )
}

const renderAccounts = (accounts: ReadonlyArray<AccountVO> = []) =>
    take5(accounts).map((item, index) => <AccountIcon {...item} key={index}/>)

type NetworksTrayProps = {
    accountIds: string[]
    showAccounts?: boolean
}

const Layout = styled(Div)`
  display: inline-flex;
  flex-direction: row-reverse;
`

/**
 * AccountVO[] -> network sgv icons
 */
const getUniqueNetworks = compose(
    uniqBy<AccountVO, string>(prop<'network', string>('network')),
)

// Twitter by default, hence twitter network or any other unknown network would render as twitter icon
const icons = {
    instagram: SVGLibrary.Instagram,
    facebook: SVGLibrary.Facebook,
    youtube: SVGLibrary.Youtube,
    googlePlus: SVGLibrary.GooglePlus,
    twitter: SVGLibrary.Twitter,
}

const getIcon = (network: string): React.FunctionComponent<any> =>
    icons[network] || icons.twitter

const take5 = take<AccountVO>(5)
