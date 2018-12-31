type CardType = 'post' | 'slot'

const dataTypeAttribute = 'data-type'
const dataValueAttribute = 'data-value'


export const createCardDataAttributes = (type: CardType, timestampOrId: string | number = 0) =>
    ({
        [dataTypeAttribute]: type,
        [dataValueAttribute]: timestampOrId,
    })


export const parseCardDataSetAttirbutes = (element: HTMLElement) =>
    element &&
    element.dataset &&
    element.dataset.hasOwnProperty('type') &&
    {
        type: element.dataset['type'],
        value: element.dataset['value'],
    }
