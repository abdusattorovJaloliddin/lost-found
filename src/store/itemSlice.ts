import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Item {
  id: string
  name: string
  avatar: string
  location: string
  date: string
  status: string
  islost: boolean
  description: string
}

interface ItemState {
  items: Item[]
}

const initialState: ItemState = {
  items: [],
}

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Item>) => {
      state.items.push(action.payload)
    },
    deleteItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    },
  },
})

export const { addItem, deleteItem } = itemSlice.actions
export default itemSlice.reducer
