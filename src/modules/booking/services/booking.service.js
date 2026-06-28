import { publicApi } from "../../../services/api";

export const submitGuestBooking = (data) => publicApi.submitBooking(data);
