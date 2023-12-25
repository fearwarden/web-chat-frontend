import React from "react";
import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import {PaletteTree} from "./palette";
import HomePage from "@/pages/Home/HomePage.tsx";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/HomePage">
                <HomePage/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;