import { IATSScore, IEnhancementSuggestion, IFlexibleResumeData } from "@/interfaces/interfaces";
import { ENHANCE_RESUME_URL, PARSE_RESUME_URL } from "./apiConfig";
import { apiClient } from "./apiClient";
import { AxiosResponse } from "axios";


export const parseResume = async (file: File) => {
  // Create FormData and append the file
  const payloadFormData: FormData = new FormData();
  payloadFormData.append('file', file);

  // Call the API to process the resume
  const response: AxiosResponse = await apiClient.post(PARSE_RESUME_URL, payloadFormData, { headers: { 'Content-Type': 'multipart/form-data' } });
  return response;
};

export const getEnhancementSuggestions = async (resumeData: IFlexibleResumeData, jobDescription: string): Promise<{ suggestions: IEnhancementSuggestion[], atsScore?: IATSScore }> => {
  try {
    const payload = {
      resume: resumeData,
      job_description: jobDescription
    };

    const response: AxiosResponse = await apiClient.post(ENHANCE_RESUME_URL, payload);

    if (!response.data.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.data.json();

    if (data.improved_resume && data.improved_resume.improved_sections) {
      return {
        suggestions: data.improved_resume.improved_sections,
        atsScore: data.improved_resume.ats_score
      };
    }


    // If no recognized format found
    console.warn('No enhancement suggestions found in API response');
    return { suggestions: [] };
  } catch (error) {
    console.error('Error getting enhancement suggestions:', error);
    throw error;
  }
};