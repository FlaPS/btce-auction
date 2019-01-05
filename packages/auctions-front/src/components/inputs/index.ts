import AccountCheckboxRaw from './AccountCheckbox'
import AccountSelectRaw from './AccountSelect'
import DateTimeInputRaw from './DateTimeInput'
import SelectInputRaw from './SelectInput'
import TextAreaAutosizeInputRaw from './TextAreaAutosizeInput'
import { useWithContext } from '../../hooks'
import { DisabledContext } from '../../contexts'

const makeDisableble = useWithContext(DisabledContext, 'disabled')

export const AccountCheckbox = makeDisableble(AccountCheckboxRaw)
export const AccountSelect = makeDisableble(AccountSelectRaw)
export const DateTimeInput = makeDisableble(DateTimeInputRaw)
export const SelectInput = makeDisableble(SelectInputRaw)
export const TextAreaAutosizeInput = makeDisableble(TextAreaAutosizeInputRaw)
