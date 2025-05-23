/**
 * MERGED COMPONENT
 * Consolidates functionality from:
 * - foundation/AppModal
 * - foundation/SideBarModal
 * - foundation/ChildAppModalBody
 * - Various modal-related components
 */

'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../utils';
import { X } from 'lucide-react';
import { Button } from './Button';

// Modal overlay variants
const overlayVariants = cva(
  "fixed inset-0 bg-black/50 z-50 transition-opacity",
  {
    variants: {
      open: {
        true: "opacity-100",
        false: "opacity-0 pointer-events-none",
      },
    },
    defaultVariants: {
      open: false,
    },
  }
);

// Modal container variants
const modalVariants = cva(
  "bg-white shadow-lg transition-all overflow-auto",
  {
    variants: {
      position: {
        center: "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg max-h-[90vh] max-w-[90vw] w-full",
        right: "fixed top-0 right-0 h-full w-full max-w-sm rounded-l-lg",
        left: "fixed top-0 left-0 h-full w-full max-w-sm rounded-r-lg",
        bottom: "fixed bottom-0 left-0 w-full max-h-[80vh] rounded-t-lg",
        fullscreen: "fixed inset-0 w-full h-full",
      },
      size: {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        '2xl': "max-w-2xl",
        '3xl': "max-w-3xl",
        '4xl': "max-w-4xl",
        '5xl': "max-w-5xl",
        full: "max-w-full",
      },
      open: {
        true: "scale-100",
        false: "scale-95 opacity-0 pointer-events-none",
      },
    },
    compoundVariants: [
      {
        position: "center",
        size: "md",
        className: "max-w-md",
      },
    ],
    defaultVariants: {
      position: "center",
      size: "md",
      open: false,
    },
  }
);

export interface ModalRootProps {
  /** Whether the modal is currently open */
  open: boolean;
  /** Callback when the modal is requested to be closed */
  onClose: () => void;
  /** The ID of the modal for accessibility */
  id?: string;
  /** The content of the modal */
  children: React.ReactNode;
}

interface ModalContextType {
  open: boolean;
  onClose: () => void;
  id?: string;
}

const ModalContext = React.createContext<ModalContextType | undefined>(undefined);

/**
 * Modal root component that manages state and provides context
 */
export const Modal: React.FC<ModalRootProps> & {
  Content: typeof ModalContent;
  Header: typeof ModalHeader;
  Body: typeof ModalBody;
  Footer: typeof ModalFooter;
  Title: typeof ModalTitle;
  Description: typeof ModalDescription;
  CloseButton: typeof ModalCloseButton;
} = ({ open, onClose, id, children }) => {
  // Close on escape key
  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [open, onClose]);
  
  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <ModalContext.Provider value={{ open, onClose, id }}>
      <div 
        className={cn(overlayVariants({ open }))}
        onClick={onClose}
        aria-hidden="true"
      />
      {children}
    </ModalContext.Provider>
  );
};

export interface ModalContentProps extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof modalVariants> {
  /** Whether to show a close button */
  showCloseButton?: boolean;
  /** Whether to close the modal when clicking the overlay */
  closeOnOverlayClick?: boolean;
}

const useModalContext = () => {
  const context = React.useContext(ModalContext);
  if (!context) {
    throw new Error('Modal compound components must be used within a Modal');
  }
  return context;
};

/**
 * The main content container for the modal
 */
const ModalContent = React.forwardRef<HTMLDivElement, ModalContentProps>(
  ({ className, position, size, open: openProp, showCloseButton = true, closeOnOverlayClick = true, onClick, children, ...props }, ref) => {
    const { open, onClose, id } = useModalContext();
    
    const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      onClick?.(e);
    };

    return (
      <div
        ref={ref}
        className={cn(modalVariants({ position, size, open }), className)}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-description`}
        onClick={handleContentClick}
        {...props}
      >
        {children}
        {showCloseButton && (
          <ModalCloseButton className="absolute top-4 right-4" />
        )}
      </div>
    );
  }
);

ModalContent.displayName = "ModalContent";

/**
 * Header section of the modal
 */
const ModalHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("px-6 py-4 border-b", className)}
        {...props}
      />
    );
  }
);

ModalHeader.displayName = "ModalHeader";

/**
 * Body section of the modal
 */
const ModalBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("px-6 py-4 overflow-auto", className)}
        {...props}
      />
    );
  }
);

ModalBody.displayName = "ModalBody";

/**
 * Footer section of the modal
 */
const ModalFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("px-6 py-4 border-t flex justify-end gap-2", className)}
        {...props}
      />
    );
  }
);

ModalFooter.displayName = "ModalFooter";

/**
 * Title component for the modal
 */
const ModalTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => {
    const { id } = useModalContext();
    return (
      <h2
        ref={ref}
        id={`${id}-title`}
        className={cn("text-lg font-semibold", className)}
        {...props}
      />
    );
  }
);

ModalTitle.displayName = "ModalTitle";

/**
 * Description component for the modal
 */
const ModalDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    const { id } = useModalContext();
    return (
      <p
        ref={ref}
        id={`${id}-description`}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
      />
    );
  }
);

ModalDescription.displayName = "ModalDescription";

/**
 * Close button component for the modal
 */
const ModalCloseButton = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, ...props }, ref) => {
    const { onClose } = useModalContext();
    return (
      <Button
        ref={ref}
        variant="ghost"
        size="sm"
        onClick={onClose}
        aria-label="Close"
        className={cn("rounded-full p-1 h-auto w-auto", className)}
        {...props}
      >
        <X className="h-4 w-4" />
      </Button>
    );
  }
);

ModalCloseButton.displayName = "ModalCloseButton";

// Assign compound components
Modal.Content = ModalContent;
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
Modal.Title = ModalTitle;
Modal.Description = ModalDescription;
Modal.CloseButton = ModalCloseButton;