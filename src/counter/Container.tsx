import {Counter} from './Counter'
import {connect} from 'react-redux'
import {Dispatch} from 'redux'
import {decrementAmount, fetchRequestFinish, fetchRequestStart, incrementAmount} from './module'
import {ReduxAction, ReduxState} from '../store'

export class ActionDispatcher {
  constructor(private dispatch: (action: ReduxAction) => void) {}

  myHeaders = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  })

  public increment(amount: number): void {
    this.dispatch(incrementAmount(amount))
  }

  public decrement(amount: number): void {
    this.dispatch(decrementAmount(amount))
  }

  public async asyncIncrement(): Promise<void> {
    this.dispatch(fetchRequestStart())

    try {
      const response: Response = await fetch('/api/count', {
        method: 'GET',
        headers: this.myHeaders
      })

      if (response.status === 200) { //2xx
        const json: {amount: number} = await response.json()
        this.dispatch(incrementAmount(json.amount))
      } else {
        throw new Error(`illegal status code: ${response.status}`)
      }
    } catch (err) {
      console.error(err)
    } finally {
      this.dispatch(fetchRequestFinish())
    }
  }
}

export default connect(
  (state: ReduxState) => ({value: state.counter}),
  (dispatch: Dispatch<ReduxAction>) => ({actions: new ActionDispatcher(dispatch)})
)(Counter)