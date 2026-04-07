import { createContext, useContext } from "react";
import type { ModalSize } from "@/srs/types/ui.types";

export const ModalSizeContext = createContext<ModalSize>("sm");

export const useModalSize = () => useContext(ModalSizeContext);
