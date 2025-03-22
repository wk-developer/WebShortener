/*
(c) @xditya
View the license: https://github.com/xditya/WebShortener/blob/master/LICENSE
*/

import { config } from "https://deno.land/std@0.154.0/dotenv/mod.ts";
import { cleanEnv, url } from "https://deno.land/x/envalid@0.1.2/mod.ts";

await config({ export: true });

export default cleanEnv(Deno.env.toObject(), {
  mongodb://wkdevs:<TEEtXVCw0OPMFSwY>@clusterbrieflyn-shard-00-00.v6l6z.mongodb.net:27017,clusterbrieflyn-shard-00-01.v6l6z.mongodb.net:27017,clusterbrieflyn-shard-00-02.v6l6z.mongodb.net:27017/?replicaSet=atlas-mersvm-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=ClusterBrieflyn(),
});

