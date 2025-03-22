import "https://deno.land/std@0.154.0/dotenv/load.ts";
import { cleanEnv, str } from "https://deno.land/x/envalid@0.1.2/mod.ts";

// Custom reporter to prevent `Deno.exit()`
const customReporter = ({ errors }) => {
  if (Object.keys(errors).length > 0) {
    console.error("Environment variable validation errors:", errors);
  }
};

// Validate environment variables
const env = cleanEnv(Deno.env.toObject(), {
  MONGO_URL: str(), // ✅ Ensure it's treated as a string
}, { reporter: customReporter });

export default env;
