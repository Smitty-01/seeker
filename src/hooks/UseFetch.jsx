import { useSession } from "@clerk/clerk-react";
import { useState } from "react";

const useFetch = (cb, options = {}) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(false); // Initialize as false for consistency
  const [error, setError] = useState(null);
  const { session } = useSession();

  const fn = async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const supabaseAccessToken = await session.getToken({
        template: "supabase",
      });
      const response = await cb(supabaseAccessToken, options, ...args); // Await the `cb` function
      setData(response); // Update with resolved data
      setError(null); // Clear any existing errors
    } catch (error) {
      setError(error); // Capture the error
      console.error("Error in useFetch:", error); // Optional: Log error for debugging
    } finally {
      setLoading(false); // Always set loading to false at the end
    }
  };

  return { fn, data, loading, error };
};

export default useFetch;
