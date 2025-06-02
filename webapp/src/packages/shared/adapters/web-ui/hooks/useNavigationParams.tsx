import { NavigationContext } from "@shared/adapters/web-ui/contexts/navigation-context";
import { useContext } from "react";

export const useNavigationParams = () => {
    const { getNavigationParams } = useContext(NavigationContext);
    return getNavigationParams();
};