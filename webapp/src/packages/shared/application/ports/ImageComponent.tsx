interface ImageProps {
    src: string;
    alt: string;
    width?: number | `${number}`;
    height?: number | `${number}`;
    loading?: "eager" | "lazy" | undefined;
    className?: string;
    style?: React.CSSProperties;
    priority?: boolean;
    onClick?: () => void;
};

export type ImageComponent = React.FC<ImageProps>;