import connectToDB from "@/utils/database";
import Prompt from "@/models/Prompt";

export const GET = async(request, {params}) => {
    try {
        await connectToDB()
        console.log("Awaiting finding prompt")
        const prompt = await Prompt.findById(params.id)//.populate('creator');
        console.log("Got prompt", prompt)
        return prompt ? new Response(JSON.stringify(prompt), {status: 200})
            : new Response("Prompt not found", {status: 404})
    } catch (error) {
        return new Response("Error fetching the specified post", {status: 500})
    }
}

export const PATCH = async(request, {params}) => {
    const { prompt, tag } = await request.json();
    try {
        await connectToDB();
        const oldPrompt = await Prompt.findById(params.id);
        if (!oldPrompt)
            return new Response("No prompt to edit!", {status: 404})
        const newPrompt = {
            creator: oldPrompt.creator, 
            prompt, 
            tag
        }; //F*** I FORGOT OBJECT SPREAD SO THE FIELD GOT MESSED UP (NO CREATOR ANYMORE) :) AND ALSO 
        // OBJECT SPREAD PRESENTS SOME MORE METADATA
        console.log("PATCH: Editing from ", oldPrompt, " to ", newPrompt) 
        await Prompt.replaceOne({_id: params.id}, newPrompt);
        return new Response(JSON.stringify(newPrompt), {status: 200})
    } catch (error) {
        return new Response("Error editing prompt", {status: 500})
    }
}

export const DELETE = async (request, {params}) => {
    try {
        await connectToDB();
        await Prompt.findByIdAndDelete(params.id);
        return new Response("Deleted prompt successfully", {status: 200});
    } catch (error) {
        return new Response("Failed to delete!", {status: 500});
    }
}