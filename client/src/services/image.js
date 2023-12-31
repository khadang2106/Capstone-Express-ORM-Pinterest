import { request } from '../configs/api';

class ImageService {
  fetchImgInfoApi(id) {
    return request({
      url: `/image/get-img-info/${id}`,
      method: 'GET',
    });
  }

  fetchCommentApi(id) {
    return request({
      url: `/image/get-comment/${id}`,
      method: 'GET',
    });
  }

  leaveCommentApi(data) {
    return request({
      url: `/image/leave-comment`,
      method: 'POST',
      data,
    });
  }

  fetchImgSaveStatusApi(id) {
    return request({
      url: `/image/get-img-save-status/${id}`,
      method: 'GET',
    });
  }

  saveImgApi(id, data) {
    return request({
      url: `/image/save-img/${id}`,
      method: 'POST',
      data,
    });
  }
}

export const imageService = new ImageService();
