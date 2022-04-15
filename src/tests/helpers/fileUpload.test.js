import 'setimmediate';
import cloudinary from 'cloudinary';
import { fileUpload } from '../../helpers/fileUpload';

cloudinary.config({
  cloud_name: 'dtnstgnhe',
  api_key: '563665532641815',
  api_secret: 'aNc_oWzesKHOo--UIluDoM9-I5U',
  secure: true
});

describe('Pruebas en fileUpload', () => {

  test('debe de cargar un archivo y retornar el URL', async () => {

    const resp = await fetch('https://media-cdn.tripadvisor.com/media/photo-s/15/a4/9b/77/legacy-hotel-at-img-academy.jpg');
    const blob = await resp.blob();

    const file = new File([blob], 'foto.png');
    const url = await fileUpload(file);

    expect(typeof url).toBe('string');

    // Borrar imagen
    const segments = url.split('/');
    const public_id = segments[segments.length - 1].replace('.jpg', '');

    await cloudinary.v2.uploader.destroy(public_id);


  });


  test('debe de retornar un error', async () => {
    const file = new File([], 'foto.png');

    const url = await fileUpload(file);
    expect(url).toBe(null);

  });

});