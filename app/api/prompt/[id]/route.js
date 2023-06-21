//Get specific prompt

import Prompt from "@models/prompt";
import { databaseConnection } from "@utils/database_connection";

//Get single prompt
export const GET = async (req, { params }) => {
    try {
        
        await databaseConnection();
        const getPrompt = await Prompt.findById({ _id: params.id });
        if (!getPrompt) {
            return new Response("No matching prompt found", { status: 404 });
        }
        return new Response(JSON.stringify(getPrompt), { status: 200 });

    } catch (error) {
        console.log("Error : ", error);
        return new Response("Error occure while getting single prompt", { status: 500 });
    }
};

//delete single prompt
export const DELETE = async (req, {params}) => {
    try {
        await databaseConnection();

        const getPrompt = await Prompt.findById({ _id: params.id });
        if (!getPrompt) {
            return new Response("No matching prompt found", { status: 404 });
        }

        await Prompt.deleteOne({ _id: params.id });

        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error occure while deleting single prompt", { status: 500 });
    }
}

//Update the prompt
export const PATCH = async (req, { params }) => {
    
    const { prompt, tags } = await req.json();
    try {
        await databaseConnection();

        const getExistingPrompt = await Prompt.findById({ _id: params.id });
        
        if (!getExistingPrompt) {
            return new Response("No matching prompt found", { status: 404 });
        }

        getExistingPrompt.prompt = prompt;
        getExistingPrompt.tags = tags;

        await getExistingPrompt.save();
        
        return new Response(JSON.stringify(getExistingPrompt), { status: 200 });
        
    } catch (error) {
        
    }
};