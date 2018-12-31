import styled from '../styles'
import {Div, ExtractProps} from '@sha/react-fp'
import SVGLibrary from '../styles/SVGLibrary'
import React from 'react'
import {AccountVO} from '../store/valueObjects'

const AccountIcon = ({
                         avatar,
                         network,
                         avatarBig,
                         accountId,
                         ...props
                     }: ExtractProps<typeof Layout> & Partial<AccountVO>) => (
    <Layout
        {...props}
        style={{
            background: `url(${avatar}) 100% 100% no-repeat`,
            backgroundSize: 'cover',
        }}
    >
        {getColoredIcon(network)({className: 'network'})}
    </Layout>
)

const Layout = styled(Div)`
  position: relative;
  width: 2em;
  height: 2em;
  margin-right: 2px;
  background-size: cover;
  .network {
    position: absolute;
    right: 0em;
    bottom: 0em;
  }
`

const coloredIcons = {
    instagram: SVGLibrary.InstagramColored,
    facebook: SVGLibrary.FacebookColored,
    googlePlus: SVGLibrary.GooglePlusColored,
    twitter: SVGLibrary.TwitterColored,
}

/**
 * Twitter as default colour icon for unknown networks
 * @param network
 */
const getColoredIcon = (network: string): React.FunctionComponent<any> =>
    coloredIcons[network] || coloredIcons.twitter

export default AccountIcon
