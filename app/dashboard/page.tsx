import CountdownTimer from "@/components/CountdownTimer";
import { format } from "date-fns";
import { connection } from "next/server";
import data from "@/app/data/data.json";

export default async function Page() {
await connection();

   return (
     <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-white dark:bg-gray-900 transition-colors">
       <div className="space-y-6 text-center">
         <h1 className="text-lg font-extrabold tracking-tight sm:text-sm text-gray-900 dark:text-white">
           We are going home soon
         </h1>
         <div className="flex justify-between">
          <div>{format(new Date(2026, 8, 19),"dd/MM/yyyy")}</div>
          <div></div>
          <div>{format(Date.now(), "dd/MM/yyyy")}</div>
         </div>
         
         {data.map((item) => (
          <div key={String(item.SlNo)} className="mt-8">
            {item.Name} ({format(new Date(item.Date), "dd-MMM-yyyy HH:mm")})
            <CountdownTimer targetDate={item.Date} />
          </div>
         ))}
       </div>
     </main>
   );
 }