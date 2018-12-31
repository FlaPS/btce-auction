import React from 'react'
import {identity} from 'ramda'
import {useSubscribe} from '../contexts'
import {Omit} from 'utility-types'

const useWithContext = <T, K extends string = 'value', R = T>(
    context: React.Context<T>,
    property: K,
    contextMapper: (value: T) => R = (identity as any) as (value: T) => R,
) => <P extends { [key in K]?: R }>(Component: React.ComponentType<P>) =>
    (
        React.forwardRef((props: P, ref) => {
            const value = useSubscribe(context, contextMapper)
            const forwardProps =
                !props || !props.hasOwnProperty(property)
                    ? {
                        ...props,
                        ref,
                        [property]: value,
                    }
                    : props

            return React.createElement(Component, forwardProps)
        })) as any as React.FunctionComponent<Omit<P, K> & { [key in K]?: R }>

export default useWithContext
