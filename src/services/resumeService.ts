import { IEnhancementResponse, IFlexibleResumeData } from "@/interfaces/interfaces";
import { ENHANCE_RESUME_URL, PARSE_RESUME_URL } from "./apiConfig";
import { apiClient } from "./apiClient";


export const parseResume = async (file: File) => {
  // Create FormData and append the file
  const payloadFormData: FormData = new FormData();
  payloadFormData.append('file', file);

  // Call the API to process the resume
  const response: any = await apiClient.post(PARSE_RESUME_URL, payloadFormData, { headers: { 'Content-Type': 'multipart/form-data' } });
  return response;
};

export const getEnhancementSuggestions = async (resumeData: IFlexibleResumeData, jobDescription: string) => {
  const payload = {
    resume: resumeData,
    job_description: jobDescription
  };

  const response: IEnhancementResponse = await apiClient.post(ENHANCE_RESUME_URL, payload);
  return response.improved_resume;
};