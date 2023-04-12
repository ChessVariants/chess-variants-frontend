import { Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";

/**
* Slide animation function, used by dialog window
* @param props 
* @returns 
*/
export const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="down" ref={ref} {...props} />;
});