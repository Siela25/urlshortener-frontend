import { useState, useCallback } from 'react';
import { toast } from 'sonner';

interface UseCopyToClipboardOptions {
  successMessage?: string;
  errorMessage?: string;
  timeout?: number;
}

interface UseCopyToClipboardReturn {
  copied: boolean;
  copy: (text: string) => Promise<boolean>;
  reset: () => void;
}

/**
 * Custom hook for copying text to clipboard with toast notifications
 */
export function useCopyToClipboard(
  options: UseCopyToClipboardOptions = {}
): UseCopyToClipboardReturn {
  const {
    successMessage = 'Copied to clipboard!',
    errorMessage = 'Failed to copy to clipboard',
    timeout = 2000,
  } = options;

  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    async (text: string): Promise<boolean> => {
      if (!text) {
        toast.error('No text to copy');
        return false;
      }

      try {
        // Try using the modern Clipboard API first
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
        } else {
          // Fallback for older browsers or non-secure contexts
          const textArea = document.createElement('textarea');
          textArea.value = text;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          textArea.style.top = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          
          const successful = document.execCommand('copy');
          document.body.removeChild(textArea);
          
          if (!successful) {
            throw new Error('execCommand failed');
          }
        }

        setCopied(true);
        toast.success(successMessage);

        // Reset copied state after timeout
        setTimeout(() => {
          setCopied(false);
        }, timeout);

        return true;
      } catch (error) {
        console.error('Failed to copy text: ', error);
        toast.error(errorMessage);
        setCopied(false);
        return false;
      }
    },
    [successMessage, errorMessage, timeout]
  );

  const reset = useCallback(() => {
    setCopied(false);
  }, []);

  return { copied, copy, reset };
}

/**
 * Utility function for one-off copy operations
 */
export async function copyToClipboard(
  text: string,
  options?: UseCopyToClipboardOptions
): Promise<boolean> {
  const {
    successMessage = 'Copied to clipboard!',
    errorMessage = 'Failed to copy to clipboard',
  } = options || {};

  if (!text) {
    toast.error('No text to copy');
    return false;
  }

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      if (!successful) {
        throw new Error('execCommand failed');
      }
    }

    toast.success(successMessage);
    return true;
  } catch (error) {
    console.error('Failed to copy text: ', error);
    toast.error(errorMessage);
    return false;
  }
}