import { GoogleGenAI } from "@google/genai";
import { BloodRecord, UserProfile, NORMAL_RANGES } from "../types";

export const analyzeBloodTrends = async (records: BloodRecord[], profile: UserProfile | null): Promise<string> => {
  try {
    if (!process.env.API_KEY) {
      return "API Key is missing. Please configure the environment.";
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Sort records ascending for timeline analysis
    const recentRecords = [...records]
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(-5); // Analyze last 5 records

    if (recentRecords.length === 0) {
      return "No records available to analyze.";
    }

    const prompt = `
      You are a helpful medical assistant for a chemotherapy patient.
      
      Patient Profile:
      - Name: ${profile?.name || 'Patient'}
      - Diagnosis: ${profile?.diseaseType || 'Unknown'}
      - Chemo Scheme: ${profile?.chemoScheme || 'Unknown'}

      Normal Ranges:
      - WBC: ${NORMAL_RANGES.wbc.min}-${NORMAL_RANGES.wbc.max} ${NORMAL_RANGES.wbc.unit}
      - NEU: ${NORMAL_RANGES.neu.min}-${NORMAL_RANGES.neu.max} ${NORMAL_RANGES.neu.unit}
      - PLT: ${NORMAL_RANGES.plt.min}-${NORMAL_RANGES.plt.max} ${NORMAL_RANGES.plt.unit}
      - HGB: ${NORMAL_RANGES.hgb.min}-${NORMAL_RANGES.hgb.max} ${NORMAL_RANGES.hgb.unit}

      Recent Blood Records (Oldest to Newest):
      ${JSON.stringify(recentRecords, null, 2)}

      Please provide a supportive, easy-to-understand summary of the blood count trends. 
      1. Highlight any significant drops or improvements.
      2. Mention if values are within normal ranges or if they indicate typical chemotherapy side effects (like neutropenia).
      3. Keep the tone encouraging but realistic.
      4. Do not give medical advice or prescribe medication. Always advise consulting their doctor for specific concerns.
      5. Keep the response under 200 words.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Could not generate analysis.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I couldn't analyze the data at this moment. Please try again later.";
  }
};