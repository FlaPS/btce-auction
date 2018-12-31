import * as React from 'react'
import styled, {SVGLibrary} from '../../styles'
import {Div, ExtractProps} from '../../../../react-fp/src'
import {InputProps, onCheckboxChangeHandler} from './helpers'
import {AccountVO} from '../../store/valueObjects'
import AccountIcon from '../AccountIcon'
import {useWithValue} from '../../hooks/'
console.log('React', React)
window['react'] = React
export const AccountCheckbox = ({
                                    value,
                                    onValueChange,
                                    label,
                                    onChange,
                                    account,
                                    disabled,
                                    tabIndex,
                                    ...props
                                }: AccountCheckboxProps) => (
    <Layout {...props} tabIndex={tabIndex}>
        <div className={'container ' + (disabled ? 'disabled' : '')}>
            <input
                tabIndex={tabIndex}
                disabled={disabled}
                type='checkbox'
                checked={value}
                onChange={React.useCallback(
                    (event: React.ChangeEvent<HTMLInputElement>) =>
                        // @ts-ignore   derived onChange prop is for label
                        // but used for an input here
                        onCheckboxChangeHandler(onChange, onValueChange, event),
                    [onChange, onValueChange],
                )}
            />
            <AccountIcon
                avatar={account.avatarBig}
                network={account.network}
                className="account"
            />
            <div className="border"/>

            <SVGLibrary.AccountCheckMark className="checkmark"/>
        </div>
    </Layout>
)

type AccountCheckboxProps = ExtractProps<typeof Layout> &
    InputProps<boolean> & {
    account: AccountVO
}

// Inset border needed, hense shadow-box used
const greenBorder = 'box-shadow: inset 0 0 0 2px #0CBD97;'

const Layout = styled(Div)`
  /* The container */
  .container {
    cursor: pointer;
    user-select: none;
    width: 4em;
    height: 4em;
    content: ' ';
    position: relative;
    background-size: cover;
    /* Hide the browser's default checkbox */
    input {
      margin: 0em;
      position: absolute;
      top: 0em;
      opacity: 0;
      cursor: pointer;
      height: 100%;
      width: 100%;
      z-index: 200;
    }

    .account {
      transition: all 0.3s ease-in-out;
      outline: none;
      width: 100%;
      height: 100%;
      opacity: 0.3;
    }
    /* Create left-top corner checkmark*/
    .checkmark {
      display: none;
      position: absolute;
      top: -6px;
      left: -6px;
      height: 16px;
      width: 16px;
      box-sizing: border-box;
    }
    .border {
      transition: all 0.3s ease-in-out;
      position: absolute;
      top: 0em;
      left: 0em;
      width: 100%;
      height: 100%;
    }
    //padding: 3px 0px 3px 3px;
    //margin: 5px 1px 3px 0px;

    input:focus ~ .border {
      box-shadow: 0 7px 14px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22);
      //padding: 3px 0px 3px 3px;
      //margin: 5px 1px 3px 0px;
      //border: 1px solid rgba(81, 203, 238, 1);;;;
    }
    input:hover ~ .border {
      box-shadow: 0 7px 14px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22);
    }
    /* On mouse-over, add a grey background color */
    input:hover ~ .account {
      opacity: 1;
      ${greenBorder}
    }

    input:checked ~ .account {
      opacity: 1;
      ${greenBorder}
    }

    /* When the checkbox is checked, add a backgound & change borders */
    > input:checked ~ .checkmark {
      display: block;
    }
  }

  .disabled {
    pointer-events: none;
  }
`

export default useWithValue(true)(AccountCheckbox)
