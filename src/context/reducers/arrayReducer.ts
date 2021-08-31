//Functions
import { cloneArray } from '@/components/utils/utilFunctions'

interface ActionType<T> {
    type: string;
    payload: T | T[];
    index?: number;
}

interface StateType<T> {
    dataList: T[];
}

function ArrayReducer<T>(state: StateType<T>, action: ActionType<T>): StateType<T> {
    switch(action.type) {
        case 'SET': {
            return {
                dataList: action.payload as unknown as T[]
            }
        };
        case 'PUSH': {
            if(!Array.isArray(action.payload)) {
                const dataListBuffer = cloneArray(state?.dataList) as unknown as T[]
                dataListBuffer.push(action.payload)
                return {
                    dataList: dataListBuffer
                }
            }
        };
        case 'POP': {
            if(!Array.isArray(action.payload)) {
                const dataListBuffer = cloneArray(state?.dataList) as unknown as T[]
                dataListBuffer.splice((action.index as number), 1)
                return {
                    dataList: dataListBuffer
                }
            }
        };
        default: return state
    }
}

export default ArrayReducer