import React from 'react'
import styled, {constants, fontSize, GlobalStyle, layouts} from '../styles'
import {Div, ExtractProps, Renderable, renderChildren} from '@sha/react-fp'
import {MenuButton} from './post/buttons'
import {IGestureStatus} from 'rc-gesture'
import {getScrollBarWidth} from '../utils/getScrollBarWidth'

const Page = ({sideBar, children, title, ...props}: PageProps) => {
    const [isOpen, setOpen] = React.useState(false)

    const closeCallback = React.useCallback(
        (e: React.SyntheticEvent<any> | IGestureStatus) => {
            if (e['stopPropagation']) e['stopPropagation']()
            setOpen(false)
        },
        [],
    )

    const openCallback = React.useCallback(
        (e: React.SyntheticEvent<any> | IGestureStatus) => {
            if (e['stopPropagation']) e['stopPropagation']()
            setOpen(true)
        },
        [],
    )

    return (
        <Layout {...props}>
            <GlobalStyle/>
            <div className='main'>
                <header className='header'>
                    <MenuButton onClick={openCallback}/>
                    <PageTitle>{title}</PageTitle>
                </header>
                <main className='content ov-scroll'>{renderChildren(children)}</main>
            </div>
            <div
                className={getShadowClassName(isOpen)}
                onClick={isOpen ? closeCallback : undefined}
            />
            <aside
                className={getAsideClassName(isOpen)}
                onClick={isOpen ? closeCallback : undefined}
            >
                {sideBar}
            </aside>
        </Layout>
    )
}

const getAsideClassName = (isOpen: boolean) =>
    'sidebar ' + (isOpen ? 'open' : '')

const getShadowClassName = (isOpen: boolean) =>
    'shadow ' + (isOpen ? 'shadow-open' : '')

type PageProps = ExtractProps<typeof Layout> & {
    sideBar: Renderable
    children: Renderable
    title: Renderable
}

const bar = getScrollBarWidth()

const subtartAndDevide = sub => div =>
    '--plan-size: calc((100vw - ' + sub + 'px ) / ' + div + ' );'

const createEmSize = subtartAndDevide(16)

const Layout = styled(Div)`
  position: absolute;

  .main {
    position: fixed;
    left: ${constants.sideBarWidth};
    height: 100vh;
    transition: left 0.2s ease-in;
    overflow-y: auto;
  }

  .main .header {
    ${layouts.primaryHeader}
    display: none;
    width: 100vw;
    height: 5em;
  }

  .shadow {
    position: fixed;
    width: 100vw;
    height: 100vh;
    display: none;
    background-color: rgba(0, 0, 0, 0);
    transition: all 0.2s ease-in;
  }

  .sidebar {
    overflow: auto;
    position: fixed;
    color: white;
    left: 0em;
    height: 100vh;
    background-color: #1f1f1f;
    width: ${constants.sideBarWidth};
    transition: left 0.2s ease-in;
  }

  .main .content {
    height: 100%;
    width: calc(100wh - 200px);
    //width: calc(100% - ${constants.sideBarWidth});
  }



  --card-width: 20em;
  --card-height: 20em;

  // XS
  @media (max-width: 420px) {
    --card-width: 40em;
    --card-height: 20em;
    ${createEmSize(44)}
  }


  // M
  @media (min-width: 420px) and (max-width: 720px) and (max-resolution: 300dpi)  {
    --card-width: 20em;
    --card-height: 20em;
    ${createEmSize(44)}
  }
  @media (min-width: 420px) and (max-width: 720px) and (min-resolution: 300dpi) {
    --card-width: 40em;
    --card-height: 20em;
    ${createEmSize(44)}
  }

  // L
  @media (min-width: 720px) and (max-width: 1024px) and (max-resolution: 300dpi){
    ${createEmSize(64)}
  }
  @media (min-width: 720px) and (max-width: 1024px) and (min-resolution: 300dpi) {
    ${createEmSize(44)}
  }


  // XL
  @media (min-width: 1024px) and (max-width: 1280px) and (max-resolution: 300dpi){
    ${createEmSize(84)}
  }
  @media (min-width: 1024px) and (max-width: 1280px) and (min-resolution: 300dpi) {
    ${createEmSize(64)}
  }


  // XXL
  @media (min-width: 1280px)and (max-resolution: 300dpi) {
    --plan-size: calc((1280px - 216px ) / 84 );
    
  }
  @media (min-width: 1280px) and (min-resolution: 300dpi) {
    ${subtartAndDevide(216)(84)}
  }

  @media (max-width: 1280px) {
        .shadow-open {
          display: block;
          background-color: rgba(0, 0, 0, 0.3);
        }
        .sidebar {
            left: -20em;
        }
        .open {
            left: 0em;
            box-shadow: rgba(0, 0, 0, 0.6) 0px 0px 30px;
        }
        .main {
            left: 0em;
        }
        .main .header {
            display: flex;
        }
        .main .content {
            top: 5em;
            width: 100vw;
            height: calc(100% - 5em);
        }
    }
`

const PageTitle = styled.div`
  text-transform: uppercase;
  ${fontSize.regular}
`

export default Page
