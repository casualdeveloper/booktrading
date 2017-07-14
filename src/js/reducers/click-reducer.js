import { BUTTON_CLICKED } from "../actions/types"

export default function(state=0, action){
    switch(action.type) {
        case BUTTON_CLICKED:
            let clicks = action.payload;
            clicks++;
            return clicks;
    }
    return state;
}