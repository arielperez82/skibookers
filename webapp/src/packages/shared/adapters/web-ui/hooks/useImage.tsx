import { useContext } from "react";
import { ImageContext } from "@shared/adapters/web-ui/contexts/image-context";
import { ImageComponent } from "@shared/application/ports/ImageComponent";

export const useImage = (): ImageComponent => {
    const ctx = useContext(ImageContext);
    if (!ctx) throw new Error('Image context not provided');
    return ctx;
};