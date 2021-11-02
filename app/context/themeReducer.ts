import { ThemeState } from "../theme/colorScheme";

type ThemeAction =
    | { type: 'set_light_theme', payload: ThemeState}
    | { type: 'set_dark_theme', payload: ThemeState }

export function themeReducer(state: ThemeState, action: ThemeAction): ThemeState {

    switch (action.type) {
        case 'set_light_theme':

            return {
                ...action.payload,
                dark: false,
            };

        case 'set_dark_theme':

            return {
                ...action.payload,
                dark: true,
            };

        default:
            return state;
    }

}