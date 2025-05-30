import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "./button";

//======================================Shiny Background
export const EyeCatchingButton_v2 = ({ ...props }: ButtonProps) => {
    return (
      <Button
        {...props}
        className={cn(
          'animate-bg-shine border-[1px] rounded-lg shadow bg-[length:200%_100%] tracking-wide',
          'dark:bg-[linear-gradient(110deg,#09090B,45%,#27272A,55%,#09090B)] dark:text-zinc-200 dark:border-zinc-800',
          'bg-[linear-gradient(110deg,#FFF,45%,#E4E4E7,55%,#FFF)] text-zinc-800 border-zinc-300',
          props.className
        )}
      />
    );
  };