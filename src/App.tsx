import React, { useState } from 'react';
import { MediaUpload } from './components/MediaUpload';
import { MediaGrid } from './components/MediaGrid';
import { MediaItem } from './types/media';
import { saveMedia } from './utils/mediaStorage';
import { ImagePlus } from 'lucide-react';

function App() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);

  const handleUpload = async (file: File) => {
    try {
      const url = await saveMedia(file);
      const newItem: MediaItem = {
        id: crypto.randomUUID(),
        url,
        type: file.type.startsWith('image/') ? 'image' : 'video',
        name: file.name,
        uploadedAt: new Date(),
      };
      setMediaItems((prev) => [newItem, ...prev]);
    } catch (error) {
      console.error('Failed to upload media:', error);
    }
  };

  const handleDelete = (id: string) => {
    setMediaItems((prev) => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <ImagePlus className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Media Gallery</h1>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <MediaUpload onUpload={handleUpload} />
        </div>
        
        {mediaItems.length > 0 ? (
          <MediaGrid items={mediaItems} onDelete={handleDelete} />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No media items yet. Upload something to get started!
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;