import { ReactNode, HTMLAttributes } from "react";

type Props = {
    children: ReactNode,
}

const Container = ({ children } : Props) => {
    return (
    <div className="w-[1220px] flex justify-center">
        {children}
    </div>
    )
} 

export default Container;