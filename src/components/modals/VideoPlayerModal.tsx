
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface VideoPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  title?: string;
}

export function VideoPlayerModal({
  isOpen,
  onClose,
  videoSrc,
  title,
}: VideoPlayerModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] p-0">
        {title && (
          <DialogHeader className="p-4">
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
        )}
        <div className="aspect-video w-full">
          <iframe
            src={videoSrc}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </DialogContent>
    </Dialog>
  );
}
