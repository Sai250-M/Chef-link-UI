import { publicApi } from "../../../services/api";

export const getPublicChefs = (params) => publicApi.getChefs(params);
export const getPublicChefById = (id) => publicApi.getChefById(id);
