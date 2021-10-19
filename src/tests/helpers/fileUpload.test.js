import '@testing-library/jest-dom';
import cloudinary from 'cloudinary';
import { fileUpload } from '../../helpers/fileUpload';



cloudinary.config({ 
  cloud_name: 'jonariv09', 
  api_key: '486795628761361', 
  api_secret: 'NJi086pu2tSgokfH656Z5RDzq30',
  secure: true
});

describe('FileUpload tests', () => {

  test('should upload a file and return the url', async (done) => {


    const resp = await fetch('https://thegadgetflow.com/wp-content/uploads/2021/09/Keychron-Q1-mechanical-keyboard-featured.jpg');
    const blob = await resp.blob();

    const file = new File([blob], 'keychron.jpg');
    const url = await fileUpload(file);
    const segments = url.split('/');
    const imageId = segments[segments.length - 1].replace('.jpg', '');

    expect(typeof url).toBe('string');

    cloudinary.v2.api.delete_resources([imageId], (error, result) => {
      done();
    });

  });

  test('should return an error', async () => {

    const file = new File([], 'keychron.jpg');
    const url = await fileUpload(file);

    expect(url).toBe(null);
  });

})
