import { Button } from "@radix-ui/themes"
import { redirect } from "next/navigation"

export default function Home() {
  // redirect('/auth/sign-in');
  return (
    <div>
      <Button variant="outline" color="blue">
        TEST
      </Button>
      <div>Hello world . </div>
    </div>
  )
}
