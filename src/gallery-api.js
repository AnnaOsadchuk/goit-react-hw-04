import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com";

const accessKey = "bLH5SX3JYUaG7xjPRNqWMDKk-iPueShInGg5kdzKXLU";

export const fetchPhotos = async (searchQuery, page) => {
  const response = await axios.get("/search/photos", {
    params: {
      query: searchQuery,
      page: page,
      client_id: accessKey,
      per_page: 12,
      orientation: "landscape",
    },
  });
  return response.data.results;
};
