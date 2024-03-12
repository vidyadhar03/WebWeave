import { useState } from "react";
import { CardContainer } from "./UI/Card";

export const LandingPage = () => {
    const [deployed,setDeployed] = useState(false);
    const [repoURL,setRepoURL] = useState('');
    const [deployid,setDeployID] = useState('');

  return (
    <div className="flex justify-center items-center h-screen">
      <CardContainer title={"Create your Deplyment"} description={"Provide your GitHub Repository URL"}>
        <input
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </CardContainer>
    </div>
  );
};
