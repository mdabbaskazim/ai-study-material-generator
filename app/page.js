import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";


export default function Home() {
  return (
    <div>
      <h2>Hello this is the test text for the font of the website</h2>
      <Button variant="default">Subscribe1</Button>
      
      <UserButton />
    </div>  
  );
}
