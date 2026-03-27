import { useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import useAuth from "./useAuth";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_SITE,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { user, signOutFunc, loading } = useAuth();
  const navigate = useNavigate();
  console.log("user", user);
  useEffect(() => {
    if (!loading && user?.accessToken) {
      // Add request interceptor
      const requestInterceptor = axiosInstance.interceptors.request.use(
      async  (config) => {
            if (user) {
      const token = await user.getIdToken(); // 🔥 correct
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
          // config.headers.Authorization = `Bearer ${user?.accessToken}`;
          // console.log(user?.accessToken);
          // return config;
        },
      );

      // Add response interceptor
      const responseInterceptor = axiosInstance.interceptors.response.use(
        (res) => res,
        (err) => {
          if (err?.response?.status === 401 || err?.response?.status === 403) {
            signOutFunc()
              .then(() => {
                console.log("Logged out successfully.");
              })
              .catch(console.error);
            navigate("/login");
          }
          return Promise.reject(err);
        },
      );

      // Cleanup to prevent multiple interceptors on re-renders
      return () => {
        axiosInstance.interceptors.request.eject(requestInterceptor);
        axiosInstance.interceptors.response.eject(responseInterceptor);
      };
    }
  }, [user, loading, signOutFunc, navigate]);

  return axiosInstance;
};
export default useAxiosSecure;
