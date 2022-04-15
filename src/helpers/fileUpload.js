export const fileUpload = async (file) => {
  const cloudUrl = process.env.REACT_APP_CLOUDINARY_URL;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'react-journal-app');

  try {
    const resp = await fetch(cloudUrl, {
      method: 'POST',
      body: formData,
    });

    if (resp.ok) {
      const cloudResp = await resp.json();
      return cloudResp.secure_url;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};