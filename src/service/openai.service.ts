import OpenAI from "openai";
import { APP_CONFIG, DB_CONFIG } from "../config";

export class OpenAIService {
    private openAi:OpenAI;

    private static instance: OpenAIService; //This is a singleton class

    static getInstance(): OpenAIService {  //This method creates the instance if it doesn’t exist, or returns the existing one. Ensures that only one object is ever created.
        if (!OpenAIService.instance) {
            OpenAIService.instance = new OpenAIService();
        }
        return OpenAIService.instance;
    }
    
    private constructor(){    //This private constructor prevents the class from being instantiated from outside
        this.openAi = new OpenAI({
            apiKey:APP_CONFIG.OPEN_AI_KEY,
        })
    }

    async chat(prompt:string, model:string = APP_CONFIG.OPEN_AI_MODEL , oldContent?:[]){
        const chatResponse = await this.openAi.chat.completions.create({
            model: model,
            messages: [
                {role: 'system', content: "You are Kaveesha Sewmini's personal assistant. Help her with anything needed."},
                ...(oldContent || []),
                {role: 'user',content: prompt}  
            ],
            max_tokens: 1000,
            temperature: 0.8,
        })
        return chatResponse.choices[0]?.message?.content || 'No Response';
    }
    
}