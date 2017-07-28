import { USER_ADD_BOOK } from "../types";
import axios from "axios";
import * as localData from "../../localData/userLocalData";

export const userAddBook = (bookId) => {
    return { type: USER_ADD_BOOK, payload: bookId }
}