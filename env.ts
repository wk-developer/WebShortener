import "https://deno.land/std@0.154.0/dotenv/load.ts";
import { cleanEnv, url } from "https://deno.land/x/envalid@0.1.2/mod.ts";

// Custom reporter to prevent `Deno.exit()`
const customReporter = ({ errors }) => {
  if (Object.keys(errors).length > 0) {
    console.error("Environment variable validation errors:", errors);
  }
};

export default cleanEnv(Deno.env.toObject(), {
  MONGO_URL: url(),
}, { reporter: customReporter }); // Prevents `Deno.exit()`
