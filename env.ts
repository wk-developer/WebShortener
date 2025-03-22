import { load } from "https://deno.land/std@0.154.0/dotenv/mod.ts";
import { cleanEnv, url } from "https://deno.land/x/envalid@0.1.2/mod.ts";

const env = await load({ export: true });

export default cleanEnv(env, {
  MONGO_URL: url(),
});
