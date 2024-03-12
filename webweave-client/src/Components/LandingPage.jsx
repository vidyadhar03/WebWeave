import { useState } from "react";
import { CardContainer } from "./UI/Card";
import axios from "axios";

const BACKEND_UPLOAD_URL = "http://localhost:3000";

export const LandingPage = () => {
  const [repoUrl, setRepoUrl] = useState("");
  const [uploadId, setUploadId] = useState("");
  const [uploading, setUploading] = useState(false);
  const [deployed, setDeployed] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="text-3xl font-semibold mb-8">Web Weave</div>
      <CardContainer
        title={"Deploy your FrontEnd GitHub Repository"}
        description={"Enter the URL of your GitHub repository to deploy it"}
      >
        <input
          onChange={(e) => {
            setRepoUrl(e.target.value);
          }}
          placeholder="https://github.com/username/repo"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
        <button
          onClick={async () => {
            setUploading(true);
            const res = await axios.post(`${BACKEND_UPLOAD_URL}/deploy`, {
              repoUrl: repoUrl,
            });
            setUploadId(res.data.id);
            setUploading(false);
            const interval = setInterval(async () => {
              const response = await axios.get(
                `${BACKEND_UPLOAD_URL}/status?id=${res.data.id}`
              );

              if (response.data.status === "Deployed") {
                clearInterval(interval);
                setDeployed(true);
              }
            }, 3000);
          }}
          disabled={uploadId !== "" || uploading}
          className="w-full p-2 border border-gray-800 rounded-md my-4"
          type="submit"
        >
          {uploadId
            ? `Deploying (${uploadId})`
            : uploading
            ? "Uploading..."
            : "Upload"}
        </button>
      </CardContainer>
      {deployed && (
        <div className="mt-8">
          <CardContainer
            title={"Your website is successfully deployed!"}
            description={"Deployed URL"}
          >
            <div className="">
              {/* <Label htmlFor="deployed-url">Deployed URL</Label>
              <Input
                id="deployed-url"
                readOnly
                type="url"
                value={`http://${uploadId}.dev.100xdevs.com:3001/index.html`}
              /> */}
              {`http://webweave.${uploadId}:3002/index.html`}
            </div>
            <br />
            <button className="w-full p-2 border border-gray-800 rounded-md" variant="outline">
              <a
                href={`http://webweave.${uploadId}:3002/index.html`}
                target="_blank"
              >
                Visit Website
              </a>
            </button>
          </CardContainer>
        </div>
      )}
    </div>
  );
};
