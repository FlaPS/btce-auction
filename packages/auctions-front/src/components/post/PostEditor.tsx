import React, {useCallback, useEffect} from 'react'
import styled from '../../styles'
import {PostVO} from '../../store/valueObjects'
import {WithValueProps} from '../inputs/helpers'
import {Div, ExtractProps} from '@sha/react-fp'
import PostHeader from './PostHeader'
import {AccentButton, PrimaryButton} from './buttons'
import {AccountSelect, DateTimeInput, TextAreaAutosizeInput} from '../inputs/index'
import {DAY_MILIS, MINUTE_MILIS, now} from '@sha/utils'
import {postDuck} from '../../store/postDuck'
import {DisabledContext} from '../../contexts'
import Modal from './Modal'
import {media} from '../../styles/media'
import useOnClickOutside from 'use-onclickoutside'
import {Key} from 'ts-keycode-enum'
import { useGLobalKeyDown } from '../../hooks'

const PostEditor = ({
                        onClose,
                        value,
                        onValueChange,
                        isOpen,
                        isNew,
                        onRemove,
                        ...props,
                    }: PostViewProps) => {
    const [postState, dispatch] = React.useReducer(postDuck.reducer, value)

    if (!value) return null

    const label = isPublished(postState)
        ? 'Published post'
        : isNew
            ? 'New post'
            : postState.isDraft
                ? 'Edit draft'
                : 'Edit post'

    const minTime = isPublished(value)
        ? value.timestamp
        : now() + MINUTE_MILIS * 5

    const ref = React.useRef(null)

    useOnClickOutside(ref, onClose)


    const autofocusRef = React.useRef(null)

    useEffect(() => {
            autofocusRef.current && autofocusRef.current.focus()
        },
        [autofocusRef.current],
    )


    useGLobalKeyDown(
        useCallback( e => {
                console.log('Post edit', e.keyCode === Key.Backspace, Key.Backspace, e)
                return (e.keyCode === Key.Escape) && onClose()
            },
            [onClose],
        ),
    )

    return (
        <Modal role='dialog'>
            <Layout {...props}>
                <form className='popUp' ref={ref}>
                    <PostHeader onClose={onClose}>{label}</PostHeader>
                    <DisabledContext.Provider value={isPublished(postState)}>
                        <div className={'formBody'}>
                            <DateTimeInput
                                label={
                                    isPublished(value) ? 'Published on:' : 'When to publish:'
                                }
                                minValue={minTime}
                                maxValue={now() + DAY_MILIS * 7}
                                value={postState.timestamp}
                                onValueChange={React.useCallback(
                                    timestamp => dispatch({timestamp}),
                                    [dispatch],
                                )}
                            />
                            <Content>
                                <AccountSelect
                                    value={postState.accountIds}
                                    onValueChange={React.useCallback(
                                        accountIds => dispatch({accountIds}),
                                        [dispatch],
                                    )}
                                />
                                <TextAreaAutosizeInput
                                    ref={autofocusRef}
                                    placeholder={'Text and links'}
                                    value={postState.content}
                                    onValueChange={React.useCallback(
                                        content => dispatch({content}),
                                        [dispatch],
                                    )}
                                />
                            </Content>
                            {!isPublished(value) && (
                                <Footer>
                                    <AccentButton
                                        onClick={React.useCallback(
                                            e => (isNew ? onClose() : onRemove(postState)),
                                            [postState],
                                        )}
                                        disabled={isPublished(value)}
                                    >
                                        Delete post
                                    </AccentButton>
                                    <PrimaryButton
                                        onClick={React.useCallback(
                                            e =>
                                                onValueChange(
                                                    postDuck.reducer(postState, {isDraft: true}),
                                                ),
                                            [postState],
                                        )}
                                    >
                                        Save as draft
                                    </PrimaryButton>
                                    <PrimaryButton
                                        onClick={React.useCallback(
                                            e =>
                                                onValueChange(
                                                    postDuck.reducer(postState, {isDraft: false}),
                                                ),
                                            [postState],
                                        )}
                                        disabled={
                                            !postDuck.isValid(postState) || isPublished(value)
                                        }
                                    >
                                        Schedule post
                                    </PrimaryButton>
                                </Footer>
                            )}
                        </div>
                    </DisabledContext.Provider>
                </form>
            </Layout>
        </Modal>
    )
}

const isPublished = (post: Partial<PostVO>) =>
    post && post.timestamp && now() > post.timestamp

const Layout = styled(Div)`
  padding: 2em 0em;
  .popUp {
    margin: auto;
    width: 60em;
    background-color: #f5f5f5;
    .formBody {
      width: 100%;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
  }
  
  @media (min-width: 720px) {
    font-size: 1.5vmin;
  }
  
  @media (max-width: 720px) {
    font-size: 1rem;
  }
  
  ${media.portraitMax`
      padding: 0em 0em;
      .popUp {
          width: 100vw;
          .formBody {
              width: 100vw;
              background-color: #f5f5f5;
              height: calc(100vh - 5em);
              overflow-y: auto;
          }

      }
  `}
`

const Content = styled(Div)`
  padding: 0em 2em 2em 2em;
  ${media.portraitMax`
       padding: 0em 0em 0em 0em;
  `}
`

const Footer = styled(Div)`
  padding: 2rem 2rem 2rem 2em;
  display: flex;

  justify-content: space-between;
  ${media.phone`
    flex-direction: column-reverse;
    padding: 2rem 2rem 5rem 2rem;

    align-items: center;
    * {
      margin-bottom: 1rem;
      width: 30em;
    }
  `}
`

type PostViewProps = ExtractProps<typeof Layout> &
    WithValueProps<Partial<PostVO>> & {
    isNew?: boolean
    isOpen?: boolean
    onRemove: (value?: Partial<PostVO>) => any | void
    onClose?: (value?: PostVO) => any | void
}

export default PostEditor
