import { APIResponse } from '../store/api/APITypes'
import { useEffect, useState } from 'react'
import { AsyncState, AsyncStatus } from '@sha/fsa'


export default <R>(api: () => Promise<APIResponse<R>>): AsyncState<R, any, any> => {
  const [state, setState] = useState({ status: 'unset' as AsyncStatus, value: undefined} as AsyncState<R, any, any>)

  const fetchData = async () => {
    setState({value: undefined, errors: undefined, status: 'started', params: undefined})
    const {result, errors} = await api()

    setState({value: result, errors, status: 'done', params: undefined})
  }

  useEffect(fetchData, [])

  return state
}
