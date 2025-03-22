import "https://deno.land/std@0.154.0/dotenv/load.ts";
import { cleanEnv, str } from "https://deno.land/x/envalid@0.1.2/mod.ts";

// Custom reporter to prevent `Deno.exit()`
const customReporter = ({ errors }) => {
  if (Object.keys(errors).length > 0) {
    console.error("Environment variable validation errors:", errors);
  }
};

export default cleanEnv(Deno.env.toObject(), {
  MONGO_URL: str(), // ✅ Use `str()` instead of `url()`
}, { reporter: customReporter });
