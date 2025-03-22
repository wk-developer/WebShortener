import "https://deno.land/std@0.154.0/dotenv/load.ts";
import { cleanEnv, url } from "https://deno.land/x/envalid@0.1.2/mod.ts";

export default cleanEnv(Deno.env.toObject(), {
  MONGO_URL: url(),
});

