import { TextArea } from "@/shared/ui/base/TextArea/TextArea";

export default function Page() {
    return (
        
      
        <TextArea
          label="Большая TextArea"
          placeholder="Напишите что-то..."
          value=""
          onChange={()=>{}}
          error=""
          size="large"
          disabled={false}
        />
    )
}