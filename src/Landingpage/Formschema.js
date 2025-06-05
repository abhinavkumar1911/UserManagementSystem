import * as Yup from 'yup';

export const Formschema = Yup.object().shape({
  UName: Yup.string().required('Name is required'),
  Email: Yup.string().email('Invalid email').required('Email is required'),
  Username: Yup.string().min(6).max(20).required("Choose your user name")
});
