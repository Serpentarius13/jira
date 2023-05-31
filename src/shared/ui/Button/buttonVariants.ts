import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "transition-all focus:ring-2 ring-black w-fit border-[1px] border-solid",
  {
    variants: {
      variant: {
        filled:
          "bg-lightblue color-white hover:bg-white hover:text-black border-lightblue ",
      },
      size: {
        small: "text-smaller rounded-smallest py-[0.8rem] px-[2rem]",
      },
    },

    defaultVariants: {
      variant: "filled",
      size: "small",
    },
  }
);
