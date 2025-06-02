import { LinkComponent } from "@shared/application/ports/LinkComponent";
import { LinkContext } from "@shared/adapters/web-ui/contexts/link-context";

export const LinkProvider = ({
    component,
    children,
  }: {
    component: LinkComponent;
    children: React.ReactNode;
  }) => <LinkContext.Provider value={component}>{children}</LinkContext.Provider>;