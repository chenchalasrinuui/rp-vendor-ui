export const appReducer: any = (state: any, action: any) => {
    switch (action?.type) {
        case 'LOGIN':
            return {
                ...state,
                ...action.payload
            }
        case 'LOADER':
            return {
                ...state,
                isShowLoader: action.payload
            }
        case 'TOASTER':
            return {
                ...state,
                ...action.payload
            }

    }
    return state;

}