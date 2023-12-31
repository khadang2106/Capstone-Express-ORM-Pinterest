import React, { useContext, useEffect, useState } from 'react';
import './ImgDetail.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { imageService } from '../../services/image';
import { Button, Input, Space, notification } from 'antd';
import { LoadingContext } from '../../contexts/Loading/Loading';
import { useSelector } from 'react-redux';
import { ErrorMessage, Field, Form, Formik } from 'formik';

import * as Yup from 'yup';

export default function ImgDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [imgDetail, setImgDetail] = useState({});
  const [commentList, setCommentList] = useState([]);
  const [saveStatus, setSaveStatus] = useState(false);
  const [saveProcessing, setSaveProcessing] = useState(false);
  const [_, setLoadingState] = useContext(LoadingContext);
  const userState = useSelector((state) => state.userReducer);

  const initialValues = {
    nguoi_dung_id: userState.userInfo.nguoi_dung_id,
    hinh_id: id * 1,
    noi_dung: '',
  };

  const fetchImgInfo = async () => {
    setLoadingState({ isLoading: true });
    const result = await imageService.fetchImgInfoApi(id);

    if (
      result &&
      result.data &&
      typeof result.data.content === 'object' &&
      Object.keys(result.data.content).length > 0
    ) {
      setImgDetail(result.data.content);
    } else {
      notification.error({
        message: 'Image deleted!',
        placement: 'top',
        duration: 2,
      });

      navigate('/');
    }

    setLoadingState({ isLoading: false });
  };

  const fetchComment = async () => {
    const result = await imageService.fetchCommentApi(id);

    setCommentList(result.data.content);
  };

  const fetchImgSaveStatus = async () => {
    const result = await imageService.fetchImgSaveStatusApi(id);

    setSaveStatus(result.data.content);
  };

  useEffect(() => {
    fetchImgInfo();
    fetchComment();
    fetchImgSaveStatus();
  }, [id]);

  const { duong_dan, mo_ta, nguoi_dung, ten_hinh } = imgDetail;

  const saveBtnClass = () => {
    if (saveStatus) {
      return 'btn pinterest-btn save-btn';
    } else {
      return 'btn pinterest-btn unsave-btn';
    }
  };

  const handleSaveImage = async () => {
    if (saveProcessing) {
      return;
    }

    try {
      setSaveProcessing(true);

      const result = await imageService.saveImgApi(id, {
        nguoi_dung_id: userState.userInfo.nguoi_dung_id,
        hinh_id: id * 1,
      });
      console.log(result);
      if (result.data.message === 'Unsave Image Successfully') {
        setSaveStatus(false);
      } else if (result.data.message === 'Save Image Successfully') {
        setSaveStatus(true);
      }
      notification.success({
        message: result.data.message,
        placement: 'topLeft',
        duration: 2,
      });
    } catch (error) {
      console.error('Error saving/unsaving image:', error);
    } finally {
      setSaveProcessing(false);
    }
  };

  const renderComment = () => {
    return commentList.map((comment) => {
      const { binh_luan_id, nguoi_dung, noi_dung } = comment;

      return (
        <div key={binh_luan_id} className="comment-item mt-3">
          <div className="commentor-avatar">
            <img
              src={
                nguoi_dung?.anh_dai_dien
                  ? nguoi_dung.anh_dai_dien
                  : 'https://static.thenounproject.com/png/363639-200.png'
              }
              alt=""
            />
          </div>
          <span>
            <a className="commentor-name" href="">
              {nguoi_dung?.ho_ten}
            </a>
            <span className="content">{noi_dung}</span>
          </span>
        </div>
      );
    });
  };

  const handleCommentSubmit = async (values, { resetForm }) => {
    await imageService
      .leaveCommentApi(values)
      .then((result) =>
        notification.success({
          message: result.data.message,
          placement: 'topLeft',
          duration: 2,
        })
      )
      .catch((error) => console.log(error));

    fetchComment();

    resetForm();
  };

  return (
    <div className="img-detail">
      <div className="container">
        <div className="detail-wrapper">
          <div className="detail-content d-flex">
            <div className="left">
              <img src={duong_dan} alt="" />
            </div>
            <div className="right">
              <div className="btn-zone d-flex justify-content-between">
                <div className="btn-zone-left">
                  <button className="btn">
                    <i className="fa-solid fa-arrow-up-from-bracket" />
                  </button>
                  <button className="btn">
                    <i className="fa-solid fa-ellipsis" />
                  </button>
                </div>
                <div className="btn-zone-right">
                  <button className={saveBtnClass()} onClick={handleSaveImage}>
                    {saveStatus ? 'Saved' : 'Save'}
                  </button>
                </div>
              </div>
              <div className="detail-zone">
                <div className="img-info mt-3">
                  <h2>{ten_hinh}</h2>
                  <p>{mo_ta}</p>
                </div>
                <div className="author-info mt-3">
                  <div className="avatar">
                    <img
                      src={
                        nguoi_dung?.anh_dai_dien
                          ? nguoi_dung.anh_dai_dien
                          : 'https://static.thenounproject.com/png/363639-200.png'
                      }
                      alt=""
                    />
                  </div>
                  <div className="author-name">
                    <p>{nguoi_dung?.ho_ten}</p>
                    <p>999,9k người theo dõi </p>
                  </div>
                </div>
                <div className="comment-zone mt-4">
                  <h4>{commentList.length} Nhận xét</h4>
                  <div className="comment-content mt-3">{renderComment()}</div>
                </div>
                <div className="leave-comment mt-4">
                  <div className="user-avatar">
                    <img
                      src={
                        userState?.userInfo.anh_dai_dien
                          ? userState.userInfo.anh_dai_dien
                          : 'https://static.thenounproject.com/png/363639-200.png'
                      }
                      alt=""
                    />
                  </div>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={Yup.object().shape({
                      noi_dung: Yup.string().required(
                        '(*) Comment cannot be blank'
                      ),
                    })}
                    onSubmit={handleCommentSubmit}
                  >
                    <Form className="bottom w-100">
                      <Space.Compact style={{ width: '100%' }}>
                        <Field name="noi_dung" id="comment">
                          {({ field }) => (
                            <Input
                              {...field}
                              placeholder="Leave comment here"
                              size="large"
                            />
                          )}
                        </Field>
                        <Button
                          className="btn btn-secondary"
                          type="default"
                          htmlType="submit"
                          size="large"
                        >
                          Submit
                        </Button>
                      </Space.Compact>
                      <ErrorMessage
                        name="noi_dung"
                        component="div"
                        className="text-danger comment-error"
                      />
                    </Form>
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
