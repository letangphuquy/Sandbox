import connectToDB from "@/utils/database";
import Prompt from "@/models/Prompt";

export const GET = async(request) => {
    const data = await request.json();
    try {
        await connectToDB()
        const filter = {}
        if (data.tag) filter.tag = data.tag;
        if (data.keyword) {
            // filter.aut
            filter.prompt = { prompt : {$regex: data.keyword}};
        }
        console.log("Filter = ", filter)
        const prompts = await Prompt.find(filter).populate('creator');
        return new Response(JSON.stringify(prompts), {status: 200})
    } catch (error) {
        return new Response("Error fetching all posts", {status: 500})
    }
}