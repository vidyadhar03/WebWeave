import { createClient,commandOptions } from "redis";
import { fileDownloader } from "./fileDownloader";
const subscriber = createClient();
subscriber.connect();

async function main(){
    while(1){
        const response = await subscriber.brPop(
            commandOptions({isolated:true}),
            'build-queue',
            0
        );
        console.log(response);
        //@ts-ignore
        await fileDownloader(`output/${response.element}`);
        console.log("downloaded");

    }
}

main();