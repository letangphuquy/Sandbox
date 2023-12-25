import connectToDB from "@/utils/database";
import Prompt from "@/models/Prompt";

export const POST = async (request) => {
    const { userId, prompt, tag } = await request.json();
    console.log(userId, '|', prompt, '|', tag);
    try {
        await connectToDB();
        const newPrompt = new Prompt({ creator: userId, prompt, tag});
        console.log(newPrompt);
        await newPrompt.save();
        
        return new Response("Accepted", { status: 201});
        // return new Response(JSON.stringify(newPrompt), { status: 201});

    } catch (error) {
        console.log("Failed");
        return new Response("Failed to create a prompt", { status: 500});
    }
}