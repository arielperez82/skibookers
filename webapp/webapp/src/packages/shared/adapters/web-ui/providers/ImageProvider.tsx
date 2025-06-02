import { ImageComponent } from "@shared/application/ports/ImageComponent";
import { ImageContext } from "@shared/adapters/web-ui/contexts/image-context";

export const ImageProvider = ({
    component,
    children,
  }: {
    component: ImageComponent;
    children: React.ReactNode;
  }) => <ImageContext.Provider value={component}>{children}</ImageContext.Provider>;