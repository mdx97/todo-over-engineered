import { HTMLAttributes } from "react";

function Page({ children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <main {...rest}>{children}</main>;
}

export default Page;
