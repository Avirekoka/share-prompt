import Prompt from "@models/prompt";
import { databaseConnection } from "@utils/database_connection";

export const POST = async (req) => {
    try {
        const { userId, prompt, tags } = await req.json();
        await databaseConnection(); 

        const newPrompt = await Prompt({
            creator: userId,
            prompt,
            tags
        });

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), { status: 200 });
    } catch (error) {
        console.log("Error: ", error);
        return new Response("Failed to create new response", { status: 500 });
    }
}

export const GET = async () => {
    try {
        await databaseConnection();
        const getPrompts = await Prompt.find({}).populate('creator');
        console.log("Creator : ", getPrompts);

        return new Response(JSON.stringify(getPrompts), { status: 200 });
    } catch (error) {
        console.log("Error: ", error);
        return new Response("Failed to create new response", { status: 500 });
    }
};