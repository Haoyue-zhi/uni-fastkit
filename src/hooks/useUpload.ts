import un from '@/service';

const VITE_UPLOAD_BASEURL = import.meta.env.VITE_UPLOAD_BASEURL;
export function useUpload() {
  const data = ref();

  const upload = () => {
    uni.chooseImage({
      count: 1,
      success: res => {
        const tempFilePath = res.tempFilePaths[0];
        uploadFile(tempFilePath, data);
      },
      fail: err => {
        console.error('uni.chooseImage err->', err);
      }
    });
  };

  return {
    data,
    upload
  };
}

async function uploadFile(tempFilePath: string, data: Ref<any>) {
  const res = await un.upload({
    url: VITE_UPLOAD_BASEURL,
    filePath: tempFilePath,
    name: 'file'
  });
  data.value = JSON.parse(res as string);
}
