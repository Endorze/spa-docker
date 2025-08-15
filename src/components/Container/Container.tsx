import { ReactNode, HTMLAttributes } from "react";

export type ContainerProps = {
    children: ReactNode,
}

const Container = ({ children } : ContainerProps) => {
    return (
    <div className="w-[1220px] flex justify-center">
        {children}
    </div>
    )
} 

export default Container;