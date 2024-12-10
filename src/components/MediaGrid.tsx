import React, { useState } from 'react';
import { Play, Trash2 } from 'lucide-react';
import { MediaItem } from '../types/media';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';

interface MediaGridProps {
  items: MediaItem[];
  onDelete: (id: string) => void;
}

export function MediaGrid({ items, onDelete }: MediaGridProps) {
  const [deleteItem, setDeleteItem] = useState<MediaItem | null>(null);

  const handleDelete = (item: MediaItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteItem(item);
  };

  const confirmDelete = () => {
    if (deleteItem) {
      onDelete(deleteItem.id);
      setDeleteItem(null);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="relative aspect-square rounded-lg overflow-hidden group"
          >
            {item.type === 'image' ? (
              <img
                src={item.url}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="relative w-full h-full bg-gray-900">
                <video
                  src={item.url}
                  className="w-full h-full object-cover"
                />
                <Play className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white w-12 h-12" />
              </div>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity flex items-end">
              <div className="p-4 w-full">
                <div className="flex justify-between items-end">
                  <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="font-medium truncate">{item.name}</p>
                    <p className="text-sm">
                      {new Date(item.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={(e) => handleDelete(item, e)}
                    className="p-2 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                    title="Delete media"
                  >
                    <Trash2 className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <DeleteConfirmDialog
        isOpen={deleteItem !== null}
        itemName={deleteItem?.name ?? ''}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteItem(null)}
      />
    </>
  );
}