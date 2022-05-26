import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "http://api.torrent.dev.drcsystems.com/api",
});
axiosInstance.interceptors.request.use((config) => {
	if (config.url !== "/Login/Login" && config.url !== "/Login/LogOutLog") {
		config.headers["Authorization"] =
			"Bearer " + localStorage.getItem("LoginToken");
	}
	return config;
});

export default axiosInstance;
