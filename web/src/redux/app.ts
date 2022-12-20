import { generateId } from '../utils/generateId';
import { TInferActions } from './store';

const actions = {
    ADD_NOTIFY: 'app/NOTIFY',
    REMOVE_NOTIFY: 'app/REMOVE_NOTIFY',
    TOGGLE_LOADING_POPUP: 'app/TOGGLE_LOADING_POPUP'
}

export interface INotifyMessage {
    id: number
    message: string 
    type: string
}

export const notifyMessageType = {
    error: 'error',
    warning: 'warning',
    info: 'info',
    success: 'success'
}


const initialState = {
    isLoading: false,
    notify: [] as Array<INotifyMessage>
}

type TIntialState = typeof initialState
type TAction = TInferActions<typeof action>

export const appReducer = (state = initialState, action: TAction): TIntialState => {
    switch (action.type) {
        case actions.ADD_NOTIFY:
            const newMessage: INotifyMessage = {
                id: generateId(),
                message: action.message,
                type: action.messageType
            }
            return {
                ...state, 
                notify: [newMessage, ...state.notify]
            }
        case actions.REMOVE_NOTIFY:

            return {
                ...state, 
                notify: state.notify.filter(message => message.id !== action.id)
            }
        case actions.TOGGLE_LOADING_POPUP: 
            return {
                ...state,
                isLoading: action.isLoading
            }
        
        
        default: 
            return state
    }
}


export const action = {
    addNotify: (messageType: string, message: string ) => ({type: actions.ADD_NOTIFY, messageType, message} as const),
    removeNotify: (id: number) => ({type: actions.REMOVE_NOTIFY, id} as const),
    toggleLoadingPopup: (isLoading: boolean) => ({type: actions.TOGGLE_LOADING_POPUP, isLoading} as const)
}

