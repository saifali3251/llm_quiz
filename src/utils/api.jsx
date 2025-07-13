import {API_KEY } from "../config";

const API_BASE_URL = process.env.REACT_APP_API_URL || "https://genai-endpoints.up.railway.app";

export const validateApiKey = async (api_key,model_name) => {
  console.log(api_key,model_name)
  const response = await fetch(`${API_BASE_URL}/validate-api-key`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ model_name:model_name, api_key: api_key }),
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return await response.json();
};


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