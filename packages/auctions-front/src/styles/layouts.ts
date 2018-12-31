import {fontSize} from './index'
import {media} from './media'

export const primary = `
    background: #FFFFFF;
    border: 1px solid #E3E3E3;
    box-sizing: border-box;
    margin: 0rem 0px -1px 0em;
    overflow: hidden;
`

export const reset = `
    margin: 0;
	padding: 0;
	border: 0;
	font-size: inherit;
	font: inherit;
	vertical-align: baseline;
`
export const primaryHeader = `
    background: #FFFFFF;
    box-shadow: inset 0px -1px 0px rgba(0, 0, 0, 0.1);
    align-items: center;
    font-weight: bold;
    display: flex;

`
export const autoSizeText = `
    line-height: 2.3em;
    resize: none;
    font-family: Stem;
    width: 100%;
    min-height: 12em;

    ${media.phone`
       padding: 1rem 0.5rem 0.5rem 1em;
    `}
    padding: 1rem 1.5rem 1.5rem 2em;
    &::placeholder {
      color: #CDCCCC;
    }
    ${primary}
    ${fontSize.regular}
`
