import axios from "axios";
import toast from "react-hot-toast";

export const axiosAPI = axios.create({
  withCredentials: false,
  baseURL:"http://localhost:3001",
});
axiosAPI.interceptors.response.use(
  (response) => {
    console.log(response)
    if (response.config.method !== "get") {
      toast.success(response.data?.message || "Success", {
        position: "bottom-center",
      });
    }
    return response;
  },
  (error) => {
    toast.error(error.response.data.message || error.response.data.error  || "Error", {
      position: "bottom-center",
    });
  }
);