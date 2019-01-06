import { styled } from '../../../styles'
import { domeDuck, AuctionRow } from '../../../store/btce/dome/domeDuck'
import React, { useCallback } from 'react'
import { useDispatch } from '../../../hooks'


const DislikeCellLayout = styled.div`

  color: #D80147;
  
  div {
    cursor: pointer;
    .value {
      font-size: 1.6em;
    }
    .disliked {
      opacity: 0.3
    }
    svg {
      margin-left: 0.3em;
    }
  }
  .inactive {
    pointer-events: none;

  }
`

export const DislikeCell = (record?: AuctionRow) => {
  const dispatch = useDispatch()

  const onClick = useCallback(() => {
      dispatch(domeDuck.actions.postDislike.started(record.id))
    },
    [dispatch, record],
  )

  return (
    <DislikeCellLayout>
      <div
        // @ts-ignore
        className={(!record || record.isDislikedByMe) ? 'inactive' : ''}
        onClick={record && !record.isDislikedByMe && onClick}
      >
        <span className={'value'}>{record ? record.dislikes : 'N/A'}</span>
        <svg
          width='1.3em'
          height='1.1em'
          viewBox='0 0 15 13'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          // @ts-ignore
          className={(record  && record.isDislikedByMe) ? 'disliked' : ''}
        >
          <path
            fill={'currentColor'}
            d='M13.9609 1.77343C14.3984 2.21093 14.6992 2.73046 14.8633 3.33203C15.0273 3.93359 15.0273 4.53515 14.918 5.13671C14.7812 5.73828 14.5352 6.28515 14.1523 6.75L8.35546 12.7383C8.24609 12.8477 8.10937 12.875 7.97265 12.875C7.83593 12.875 7.72656 12.8477 7.64453 12.7383L1.84765 6.75C1.46484 6.28515 1.1914 5.73828 1.08202 5.13671C0.945304 4.53515 0.972648 3.93359 1.13671 3.33203C1.30077 2.73046 1.60155 2.21093 2.03905 1.77343L2.12109 1.6914C2.72265 1.06249 3.48827 0.707024 4.36327 0.652337C5.23828 0.597649 6.05859 0.816399 6.76953 1.30859L7.5625 3.68749L4.93749 5.4375L8.875 9.375L7.5625 5.875L10.1875 4.125L9.25781 1.30859C9.96875 0.816399 10.7617 0.597649 11.6367 0.652337C12.5117 0.707024 13.25 1.06249 13.8789 1.6914L13.9609 1.77343Z'/>
        </svg>
      </div>
    </DislikeCellLayout>
  )
}
