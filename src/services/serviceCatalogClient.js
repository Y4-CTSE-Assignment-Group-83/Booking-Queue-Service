import axios from "axios";

export const getServiceByIdFromCatalog = async (serviceId) => {
  try {
    const response = await axios.get(`${process.env.SERVICE_CATALOG_URL}/${serviceId}`);

    if (!response.data?.success || !response.data?.data) {
      const error = new Error("Invalid response from Service Catalog Service");
      error.statusCode = 502;
      throw error;
    }

    return response.data.data;
  } catch (error) {
    if (error.response?.status === 404) {
      const notFoundError = new Error("Selected salon service was not found");
      notFoundError.statusCode = 404;
      throw notFoundError;
    }

    const serviceError = new Error(
      error.response?.data?.message || "Failed to connect with Service Catalog Service",
    );
    serviceError.statusCode = error.response?.status || 502;
    throw serviceError;
  }
};