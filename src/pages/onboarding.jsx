import React from "react";
import { useUser } from "@clerk/clerk-react";
const Onboarding = () => {
  const { user, isLoaded } = useUser();

  console.log(user);
  return <div>Onboaridng</div>;
};

export default Onboarding;
