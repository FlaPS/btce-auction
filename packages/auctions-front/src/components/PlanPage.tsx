import React from 'react'
import {DivProps} from '@sha/react-fp'
import {PlanVO, PostVO} from '../store/valueObjects'
import {ExtractAction} from '../store/helpers'
import {planDuck} from '../store/planDuck'
import {AccountsContext} from '../contexts'
import NowProvider from '../contexts/NowProvider'
import PlanView from './plan/PlanView'
import {parseCardDataSetAttirbutes} from './plan/cardDataSet'
import PostEditor from './post/PostEditor'
import {generateGuid} from '@sha/random'
import {trace} from '@sha/utils'
import {WithReducerProps} from '../hooks/'

const log = trace('PlanPage', 'debug')

const PlanPage = ({
                      state,
                      dispatch = console.log,
                      ...props
                  }: PlanPageProps) => {
    const [post, setPost] = React.useState<Partial<PostVO>>(undefined)

    const clickHandler = React.useCallback(
        (event: React.MouseEvent<HTMLElement>) => {
            if (post) {
                closeHandler()
                return
            }

            const data = parseCardDataSetAttirbutes(
                (event.target as any) as HTMLElement,
            )

            if (data) {
                event.target.blur()
                let post: PostVO
                if (data.type === 'post') {
                    post = state.posts.find(({id}) => id === data.value)
                } else if (data.type === 'slot') {
                    post = {
                        id: generateGuid(),
                        statistics: {},
                        timestamp: Number(data.value),
                    }
                }

                console.warn('set post', post)
                setPost(post)
            }
        },
        [state, dispatch, post],
    )

    const saveHandler = React.useCallback(
        (post: Partial<PostVO>) => {
            dispatch(planDuck.actions.update(post))
            closeHandler()
        },
        [dispatch, post],
    )
    const removeHandler = React.useCallback(
        () => {
            dispatch(planDuck.actions.remove(post))
            closeHandler()
        },
        [dispatch, post],
    )

    const closeHandler = React.useCallback(
        (e?: any): any => setPost(undefined),
        [],
    )


    return (
        <div>
            <AccountsContext.Provider value={state.accounts}>
                <NowProvider>
                    <PlanView onClick={clickHandler} plan={state}/>
                    {post && (
                        <PostEditor
                            onRemove={removeHandler}
                            value={post}
                            onValueChange={saveHandler}
                            onClose={closeHandler}
                        />
                    )}
                </NowProvider>
            </AccountsContext.Provider>
        </div>
    )
}

type PlanPageProps = DivProps &
    WithReducerProps<PlanVO, ExtractAction<typeof planDuck.reducer>>


export default PlanPage
