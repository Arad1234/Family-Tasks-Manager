import { Button } from "@mui/material";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const SignOut = () => {
  const supabase = useSupabaseClient();

  const handleSignOut = () => {
    // This will delete the "provider_token" and the session object, therefore the useEffect in the "Home" component will navigate to "/" route.
    supabase.auth.signOut();
  };

  return (
    <Button
      variant="outlined"
      onClick={handleSignOut}
    >
      Sign Out
    </Button>
  );
};

export default SignOut;
