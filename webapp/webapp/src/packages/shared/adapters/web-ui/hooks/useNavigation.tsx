import { NavigationContext } from "@shared/adapters/web-ui/contexts/navigation-context";
import { useContext } from "react";

export const useNavigation = () => {
    const { navigate, back } = useContext(NavigationContext);
    return { navigate, back };
};