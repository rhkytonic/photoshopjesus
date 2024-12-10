const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const saveMedia = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_URL}/api/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload file');
  }

  const data = await response.json();
  return `${API_URL}${data.url}`;
};

export const deleteMedia = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/api/media/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete file');
  }
};