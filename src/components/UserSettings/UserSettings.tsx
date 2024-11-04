import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from '../Button/Button';

interface UserFormValues {
  firstName?: string;
  lastName?: string;
  email?: string;
  avatar?: File | null;
}

const UserSettings: React.FC = () => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const initialValues: UserFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    avatar: null,
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(2, 'Name must be at least 2 characters long'),
    lastName: Yup.string()
      .min(2, 'Last Name must be at least 2 characters long'),
    email: Yup.string()
      .email('Invalid email format'),
    avatar: Yup.mixed().nullable(),
  }).test(
    "at-least-one-field",
    "At least one field must be filled in",
    (values) => {
      return (
        (values.firstName?.trim() || "").length > 0 ||
        (values.lastName?.trim() || "").length > 0 ||
        (values.email?.trim() || "").length > 0
      );
    }
  );

  const handleSubmit = (values: UserFormValues) => {
    console.log('Submitted values:', values);
  };

  const handleAvatarChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: File | null) => void
  ) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setFieldValue('avatar', file);
      setAvatarPreview(URL.createObjectURL(file)); 
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form className=" flex-1 p-[20px] md:m-auto max-w-lg primary-background shadow-lg rounded-lg box-shadow primary-text">
          <h2 className="text-xl font-bold mb-4">You can update your user data</h2>

          <div className="mb-4">
            <label htmlFor="avatar" className="block font-medium mb-2">
            Upload image
            </label>
            {avatarPreview && (
              <img
                src={avatarPreview}
                alt="Avatar Preview"
                className="mb-2 w-24 h-24 rounded-full object-cover"
              />
            )}
            <input
              id="avatar"
              name="avatar"
              type="file"
              accept="image/*"
              onChange={(e) => handleAvatarChange(e, setFieldValue)}
              className="block w-full text-sm  text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="firstName" className="block font-medium mb-2">
              First Name
            </label>
            <Field
              id="firstName"
              name="firstName"
              type="text"
              className="block w-full px-4 py-2 border border-color rounded-md primary-background shadow-sm outline-0 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 focus:ring-offset-0 "
            />
            <ErrorMessage
              name="firstName"
              component="div"
              className="text-red-600 text-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="lastName" className="block font-medium mb-2">
              Last Name
            </label>
            <Field
              id="lastName"
              name="lastName"
              type="text"
              className="block w-full px-4 py-2 border border-color rounded-md primary-background outline-0 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 focus:ring-offset-0"
            />
            <ErrorMessage
              name="lastName"
              component="div"
              className="text-red-600 text-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-2">
              Email
            </label>
            <Field
              id="email"
              name="email"
              type="email"
              className="block w-full px-4 py-2 border border-color rounded-md primary-background outline-0 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 focus:ring-offset-0"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-600 text-sm"
            />
          </div>

            <Button type="submit" buttonName="Save changes"/> 
        </Form>
      )}
    </Formik>
  );
};

export default UserSettings;