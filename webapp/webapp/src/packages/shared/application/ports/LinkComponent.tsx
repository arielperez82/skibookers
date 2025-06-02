import { UrlObject } from "url";

interface LinkProps {
    href: string | UrlObject;
    children: React.ReactNode;
    className?: string;
    'aria-label'?: string;
    // optionally support opening in a new tab, rel, etc.
    target?: string;
    rel?: string;
    /**
     * Optional event handler for when the mouse pointer is moved onto Link
     */
    onMouseEnter?: React.MouseEventHandler<HTMLAnchorElement>;
    /**
     * Optional event handler for when Link is touched.
     */
    onTouchStart?: React.TouchEventHandler<HTMLAnchorElement>;
    /**
     * Optional event handler for when Link is clicked.
     */
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export type LinkComponent = React.FC<LinkProps>;