import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { NavLink, useNavigate } from 'react-router-dom';
import './Login.scss';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input, notification } from 'antd';
import { useDispatch } from 'react-redux';
import { setUserInfoAction } from '../../store/actions/userAction';
import { userService } from '../../services/user';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('(*) Invalid Email')
      .required('(*) Email cannot be blank!'),
    mat_khau: Yup.string().required('(*) Password cannot be blank!'),
  });

  const handleLoginSubmit = async (values, { resetForm }) => {
    try {
      const result = await userService.loginApi(values);

      dispatch(setUserInfoAction(result.data.content));
      localStorage.setItem('USER_INFO', JSON.stringify(result.data.content));

      notification.success({
        message: 'Login successfully!',
        placement: 'topLeft',
        duration: 2,
      });

      navigate('/');
    } catch (error) {
      console.log(error);
      notification.error({
        message: error.response.data.message,
        placement: 'top',
        duration: 2,
      });
    }

    resetForm();
  };

  return (
    <div className="auth">
      <div className="container auth-wrapper">
        <div className="login__content">
          <Formik
            initialValues={{
              email: '',
              mat_khau: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleLoginSubmit}
          >
            <div className="text-center">
              <i className="fa-brands fa-pinterest pinterest-logo mb-2" />
              <h2>Welcome to Pinterest</h2>
              <Form className="login-form mt-4">
                <div className="pinterest-form-control">
                  <i className="fa-solid fa-user" />
                  <Field
                    as={Input}
                    className="form-control"
                    name="email"
                    type="text"
                    placeholder="Your Email"
                  />
                </div>
                <div className="error-login w-100 mt-1">
                  <ErrorMessage
                    name="email"
                    component="label"
                    className="error-message text-danger"
                  />
                </div>
                <div className="pinterest-form-control mt-3">
                  <i className="fa-solid fa-lock" />
                  <Field
                    as={Input.Password}
                    className="form-control"
                    name="mat_khau"
                    placeholder="Your Password"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                </div>
                <div className="error-login w-100 mt-1">
                  <ErrorMessage
                    name="mat_khau"
                    component="label"
                    className="error-message text-danger"
                  />
                </div>
                <button className="btn pinterest-btn w-75 mt-3" type="submit">
                  Login
                </button>
              </Form>
            </div>
          </Formik>
          <div className="terms-of-service text-center mt-4">
            <span>
              By continuing, you agree to Pinterest's{' '}
              <NavLink
                className="terms-of-service-link"
                to={'https://policy.pinterest.com/en/terms-of-service'}
                target="_blank"
              >
                Terms of Service
              </NavLink>{' '}
              and acknowledge you've read our{' '}
              <NavLink
                className="terms-of-service-link"
                to={'https://policy.pinterest.com/en/privacy-policy'}
                target="_blank"
              >
                Privacy Policy
              </NavLink>
              .{' '}
              <NavLink
                className="terms-of-service-link"
                to={'https://policy.pinterest.com/en/notice-at-collection'}
                target="_blank"
              >
                Notice at collection
              </NavLink>
            </span>
          </div>
          <div
            style={{
              borderBottom: '1px solid #cecece',
              margin: '20px auto',
              width: '200px',
            }}
          ></div>
          <p className="link-to-signup">
            Not on Pinterest yet? {''}
            <NavLink to={'/signup'}>Sign up</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}
