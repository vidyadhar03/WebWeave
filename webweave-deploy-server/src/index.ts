import { createClient, commandOptions } from "redis";
import { fileDownloader,uploadFinalDist } from "./awsOperations";
import { buildProject } from "./utils";
const subscriber = createClient();
subscriber.connect();

async function main() {
  while (1) {
    const response = await subscriber.brPop(
      commandOptions({ isolated: true }),
      "build-queue",
      0
    );
    console.log(response);
    //@ts-ignore
    const id = response.element;
    await fileDownloader(`output/${id}`);
    console.log("downloaded");
    await buildProject(id);
    uploadFinalDist(id);
  }
}

main();
