import React from 'react'
import styled, {layouts} from '../../styles'
import {ExtractProps, Li, Ul} from '@sha/react-fp/src'
import {InputProps, OnValueChangeHandler} from './helpers'
import {AccountVO} from '../../store/valueObjects'
import {AccountCheckbox} from './AccountCheckbox'
import {uniq, without} from 'ramda'
import {useWithContext, useWithValue} from '../../hooks/'
import {AccountsContext} from '../../contexts'
import shallowEqual from '../../hooks/shallowEqual'

const onItemValueChangeHandler = (
    value: string[],
    itemValue: string,
    onValueChange?: OnValueChangeHandler<string[]>,
    checked?: boolean,
) =>
    onValueChange &&
    onValueChange(
        checked ? uniq(value.concat([itemValue])) : without([itemValue], value),
    )

export const memoizedItemValueChangeHandler = (
    value: string[],
    itemValue: string,
    onValueChange?: OnValueChangeHandler<string[]>,
) =>
    React.useCallback(
        (state: boolean) =>
            onItemValueChangeHandler(value, itemValue, onValueChange, state),
        [value, itemValue, onValueChange],
    )

const AccountSelect = ({
                           value,
                           onValueChange,
                           data,
                           disabled,
                           ...props
                       }: AccountSelectProps) => (
    <List>
        {data
            .filter(
                account =>
                    !disabled ||
                    value.includes(account.accountId),
            )
            .map((account, index) => (
                <Item key={index} >
                    <AccountCheckbox
                        disabled={disabled}
                        value={value.includes(account.accountId)}
                        account={account}
                        onValueChange={memoizedItemValueChangeHandler(
                            value,
                            account.accountId,
                            onValueChange,
                        )}
                    />
                </Item>
            ))}
    </List>
)

const List = styled(Ul)`
  list-style: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  li {
    margin-right: 1em;
    margin-bottom: 1em;
  }
  padding: 1em;
  ${layouts.primary}
`
const Item = styled(Li)`
  ${layouts.reset}
`

type AccountSelectProps = InputProps<string, AccountVO, true> &
    ExtractProps<typeof List>

export default useWithContext(AccountsContext, 'data')(
    useWithValue([])(
        React.memo(
            AccountSelect,
            ({data: dataA, ...a}, {data: dataB, ...b}) =>
                shallowEqual(a, b) && shallowEqual(dataA, dataB),
        ),
    ),
)
