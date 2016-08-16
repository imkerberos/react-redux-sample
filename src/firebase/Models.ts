import {decrementAction, incrementAction, fetchAmountAction} from "./ActionCreators";

export interface CounterState {
    num: number;
    loadingCount: number;
}

export interface JsonObject {
    amount: number;
}

export interface MyAction {
    type: string;
    amount?: number;
    error?: Error;
}

export class DispatchActions {
    private dispatch: (action: any) => any;
    constructor(dispatch: (action: any) => any){
        this.dispatch = dispatch
    }

    public increment(amount: number) {
        this.dispatch(incrementAction(amount))
    }

    public decrement(amount: number) {
        this.dispatch(decrementAction(amount))
    }

    public fetchAmount() {
        this.dispatch(fetchAmountAction())
    }
}

export class ActionTypes{
    static INCREMENT = 'LOGIN';
}