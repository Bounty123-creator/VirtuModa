import Replicate from "replicate";

export const maxDuration = 60
const replicate = new Replicate();

export async function POST(request: Request) {
    try {
        const formdata = await request.formData()

        const garm_img = formdata.get("garm_img")
        const human_img = formdata.get("human_img")
    
        const input = {
            garm_img: garm_img,
            human_img: human_img,
            garment_des: "T-shirt"
        }
        
        try {
            const output = await replicate.run("cuuupid/idm-vton:906425dbca90663ff5427624839572cc56ea7d380343d13e2a4c4b09d3f0c30f", { input });
            // Ensure output is JSON-serializable
            const jsonResponse = JSON.stringify(output);

            return new Response(jsonResponse, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
        } catch {
            return new Response("External API Error", {status: 300})
        }
    

    }

    catch (error) {
        console.error("Error processing request:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
