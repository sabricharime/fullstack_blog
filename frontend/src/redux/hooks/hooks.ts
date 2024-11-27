import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux"
import { AppDispatch } from "../store"
import { RootState } from "../store"


export const useAppDispatch = ()=> useDispatch<AppDispatch>()
export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector
