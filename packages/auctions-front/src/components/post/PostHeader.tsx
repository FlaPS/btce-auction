import React from 'react'
import styled, {fontSize, layouts} from '../../styles'
import {Div, ExtractProps} from '@sha/react-fp'
import {CloseButton} from './buttons'
import {media} from '../../styles/media'

const Layout = styled(Div)`
  height: 5em;
  justify-content: space-between;


  
  .title {
    padding-left: 2em;
    min-width: 50%;
    ${fontSize.regular};
  }
  
  ${layouts.primaryHeader}

  ${media.portraitMax`
        position: sticky;
        width: 100vw;

  `}
  
`

type PostHeaderProps = ExtractProps<typeof Layout> & {
    onClose?: ExtractProps<typeof CloseButton>['onClick']
}

export default ({children, onClose, ...props}: PostHeaderProps) => (
    <Layout {...props}>
        <span className="title">{children}</span>
        <CloseButton onClick={onClose}/>
    </Layout>
)
