export interface MediaItem {
  id: string;
  url: string;
  type: 'image' | 'video';
  name: string;
  uploadedAt: Date;
}