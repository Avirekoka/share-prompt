import Prompt from "@models/prompt";
import { databaseConnection } from "@utils/database_connection";

export const GET = async (req, {params}) => {
    try {
        await databaseConnection();
        const getPrompts = await Prompt.find({ creator: params.id }).populate('creator');
        console.log("This is my get prompts : ", getPrompts);
        return new Response(JSON.stringify(getPrompts), { status: 200 });
    } catch (error) {
        console.log("Error: ", error);
        return new Response("Failed to create new response", { status: 500 });
    }
};