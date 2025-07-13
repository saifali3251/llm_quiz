import { API_BASE_URL,API_KEY } from "../config";

console.log(API_BASE_URL)
export const fetchQuestions = async (prompt,modelName,contentName,contentType,is_test) => {
  try {
    const response = await fetch(`${API_BASE_URL}/generate-questions/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        { prompt,
          api_key : API_KEY,
          model_name:modelName,
          name : contentName,
          type : contentType,
          is_test : is_test
        })
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching questions", error);
    throw error;
  }
};


export const fetchPopularFilters = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/popular-content/`,{
      method:"GET",
      headers : {"Content-Type" : "application/json"}
    })
    const data = await response.json()
    return data    
  } catch (error) {
    throw error;
  }
}