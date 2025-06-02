import { createContext } from 'react';
import type { LinkComponent } from '@shared/application/ports/LinkComponent';

export const LinkContext = createContext<LinkComponent | null>(null);