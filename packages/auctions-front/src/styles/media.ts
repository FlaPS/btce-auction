import {css} from './styled'

export const sizes = {
    desktop: 1024,
    tablet: 720,
    phone: 420,
}

const dividerCoarse = 10
const dividerFine = 16

export const media = {
    desktopMin: (...as: any[]) => css`
    @media (min-width: ${sizes.desktop / dividerCoarse}rem) {
      // @ts-ignore
      ${css(...as)}
    }
  `,

    desktopMax: (...as: any[]) => css`
    @media (max-width: ${sizes.desktop / dividerCoarse}rem) {
      // @ts-ignore
      ${css(...as)}
    }
  `,

    ['824Max']: (...as: any[]) => css`
    @media (max-width: ${1024 / dividerCoarse}rem) {
      // @ts-ignore
      ${css(...as)}
    }
  `,

    landscapeMax: (...as: any[]) => css`
    @media (max-width: ${sizes.desktop / dividerCoarse}rem) {
      // @ts-ignore
      ${css(...as)}
    }
  `,
    landscapeMin: (...as: any[]) => css`
    @media (min-width: ${sizes.tablet / dividerCoarse}rem) {
      // @ts-ignore
      ${css(...as)}
    }
  `,
    portraitMax: (...as: any[]) => css`
    @media (max-width: ${sizes.tablet / dividerCoarse}rem) {
      // @ts-ignore
      ${css(...as)}
    }
  `,
    portraitMin: (...as: any[]) => css`
    @media (min-width: ${sizes.phone / dividerCoarse}rem) {
      // @ts-ignore
      ${css(...as)}
    }
  `,
    phone: (...as: any[]) => css`
    @media (max-width: ${sizes.phone / dividerCoarse}rem) {
      // @ts-ignore
      ${css(...as)}
    }
  `,
}
