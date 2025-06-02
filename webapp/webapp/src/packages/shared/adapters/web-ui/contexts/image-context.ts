'use client'
import { createContext } from 'react';
import type { ImageComponent } from '@shared/application/ports/ImageComponent';

export const ImageContext = createContext<ImageComponent | null>(null);