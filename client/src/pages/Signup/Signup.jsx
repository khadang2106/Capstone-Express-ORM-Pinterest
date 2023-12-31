import React from 'react';
import './Signup.scss';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { NavLink, useNavigate } from 'react-router-dom';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { userService } from '../../services/user';
import { Input, notification } from 'antd';

export default function Signup() {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    ho_ten: Yup.string()
      .required('(*) Name cannot be blank')
      .matches(/^[a-zA-Z ]*$/, '(*) Name must only contain letters and spaces'),
    email: Yup.string()
      .email('(*) Invalid Email')
      .required('(*) Email cannot be blank'),
    mat_khau: Yup.string()
      .min(6, '(*) Password need at least 6 letters')
      .required('(*) Password cannot be blank'),
    tuoi: Yup.date()
      .required('(*) Age cannot be blank')
      .test(
        'is-at-least-5',
        '(*) Age must be at least 5 years old',
        function (value) {
          const currentDate = new Date();
          const birthDate = new Date(value);
          const age = currentDate.getFullYear() - birthDate.getFullYear();

          return age >= 5;
        }
      ),
  });

  const initialValues = {
    ho_ten: '',
    email: '',
    mat_khau: '',
    tuoi: '',
  };

  const handleSignUpSubmit = async (values, { resetForm }) => {
    console.log(values);

    const currentDate = new Date();
    const birthDate = new Date(values.tuoi);
    const age = currentDate.getFullYear() - birthDate.getFullYear();
    try {
      await userService.signUpApi({ ...values, tuoi: age });

      notification.success({
        message: 'Sign up successfully!',
        placement: 'topLeft',
        duration: 2,
      });

      navigate('/login');
    } catch (error) {
      notification.error({
        message: error.response.data.content,
        placement: 'top',
        duration: 2,
      });
    }

    resetForm();
  };

  return (
    <div className="auth">
      <div className="container auth-wrapper">
        <div className="register__content">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSignUpSubmit}
          >
            <div className="left text-center">
              <i className="fa-brands fa-pinterest pinterest-logo mb-2" />
              <h2 className="mb-2">Welcome to Pinterest</h2>
              <p className="mb-4">Find new ideas to try</p>
              <Form className="register-form">
                <div className="pinterest-form-control">
                  <i className="fa-solid fa-envelope" />
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
                <div className="pinterest-form-control mt-3">
                  <i className="fa-solid fa-user" />
                  <Field
                    as={Input}
                    className="form-control"
                    name="ho_ten"
                    type="text"
                    placeholder="Your Name"
                  />
                </div>
                <div className="error-login w-100 mt-1">
                  <ErrorMessage
                    name="ho_ten"
                    component="label"
                    className="error-message text-danger"
                  />
                </div>
                <div className="pinterest-form-control mt-3">
                  <i className="fa-solid fa-cake-candles" />
                  <Field
                    className="form-control"
                    name="tuoi"
                    type="date"
                    placeholder="Your Birthday"
                  />
                </div>
                <div className="error-login w-100 mt-1">
                  <ErrorMessage
                    name="tuoi"
                    component="label"
                    className="error-message text-danger"
                  />
                </div>
                <button className="btn pinterest-btn w-75 mt-3" type="submit">
                  Sign Up
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
            Already a member? {''}
            <NavLink to={'/login'}>Log in</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}
