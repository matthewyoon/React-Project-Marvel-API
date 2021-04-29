import { createSlice } from '@reduxjs/toolkit';

const rootSlice = createSlice({
    name: "root",
    initialState: {
        name: "Thor",
        description: "God of Thunder",
        super_power: "Controls Thunder and Godly Strength",
        comics_appeared_in: "500"
    },
    reducers: {
        chooseName: (state, action) => { state.name = action.payload},
        chooseSuperPower: (state, action) => { state.super_power = action.payload}
    }
})

// Export Reducer
export const reducer = rootSlice.reducer;
export const { chooseName, chooseSuperPower, } = rootSlice.actions;