import { useContext } from "react";
import { LinkContext } from "@shared/adapters/web-ui/contexts/link-context";
import { LinkComponent } from "@shared/application/ports/LinkComponent";

export const useLink = (): LinkComponent => {
    const ctx = useContext(LinkContext);
    if (!ctx) throw new Error('Link context not provided');
    return ctx;
};