import { CarInterface } from "../carRentalSlice/carRentalSliceTypes"
import { CreateOrderResponse } from "../ordersSlice/ordersSliceType"

export interface adminStateTypes {
    adminSearchResult: oneUserTypes[] | CarInterface[] | CreateOrderResponse[],
    usersList: oneUserTypes[],
}

export interface oneUserTypes {
    _id: string
    firstName: string
    lastName: string
    password: string
    email: string
    role: string
    token: string
    terms: boolean
    createdAt: string
    updatedAt: string
}