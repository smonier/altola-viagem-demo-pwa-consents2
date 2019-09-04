import React, { Component } from "react";
import { Formik } from "formik";
import { config } from "../../config";
import axios from "axios";
import * as Yup from "yup";
import "./RegistrationForm.css";
import PreferencesForm from "../PreferencesForm";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import duix from "duix";

class RegistrationForm extends Component {
  state = {
    submitted: false,
    success: false,
    consented: false
  };

  submitData() {}

  render() {
    const { success, submitted, isSubmitting } = this.state;
    const { profileId, sessionId } = this.props;
	const ColoredLine = ({ color }) => (
	   <hr
	        style={{
	            color: color,
	            backgroundColor: color,
	            height: 2
	        }}
	    />
	);
    
    return (
      <div className="fix-4-12 margin-top-3">
        <div className="pad shadow selected ae-3 left done">
      
        {duix.get("isRegistered") || (!isSubmitting && submitted && success) ? (
            <PreferencesForm { ... this.props } consented={this.state.consented} />
          ) : (
            <Formik
              initialValues={{
                username: "",
                password: "",
                desired_email: "",
                desired_firstname: "",
                desired_lastname: "",
                consent: false,
                siteKey: config.dxSiteKey,
                profileId: profileId,
                sessionId: sessionId,
                operation: "add"
              }}
              onSubmit={(values, { setSubmitting }) => {
                axios
                  .post(process.env.REACT_APP_REGISTRATION_HOST, null, {
                    params: values
                  })
                  .then(response => {
                    this.setState({consented: values.consent});
                    setSubmitting(false);
                    this.setState({ submitted: true });
                    this.setState({ success: response.status === 202 });
                    console.log({ response });
                    if (this.state.success) {
                      toast.success("Registration successful");
                      duix.set('isRegistered', true);
                    } else {
                      toast.error("Error submitting the form.");
                    }
                  })
                  .catch(err => {
                    setSubmitting(false);
                    this.setState({ submitted: true });
                    this.setState({ success: false });
                    console.error(err);
                    toast.error("Error submitting the form.");
                  });
              }}
              validationSchema={Yup.object().shape({
                username: Yup.string().required("User name is required"),
                password: Yup.string().required("Password is required"),
                desired_email: Yup.string().required("Email is required ").email(
                  "This email address is not valid"
                ),
                desired_firstname: Yup.string().required("First name is required"),
                desired_lastname: Yup.string().required("Last name is required")
              })}
            >
              {props => {
                const {
                  values,
                  touched,
                  errors,
                  isSubmitting,
                  handleChange,
                  handleBlur,
                  handleSubmit
                } = props;
                return (
                  <form onSubmit={handleSubmit} className="slides-form wide">
                    <div className="label ae-3 cropTop">
                      <label htmlFor="username" className="cropTop opacity-5">
                        User name
                      </label>
                    </div>
                    <input
                      type="text"
                      name="username"
                      placeholder="Provide your user name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                    />

                    {errors.username && touched.username && errors.username && (
                      <div className="label ae-3 cropTop">
                        <label
                          htmlFor="password"
                          className="cropTop opacity-5 input-feedback"
                        >
                          {errors.username}
                        </label>
                      </div>
                    )}

                    <div className="label ae-3 cropTop">
                      <label htmlFor="password" className="cropTop opacity-5">
                        Password
                      </label>
                    </div>
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                    {errors.password && touched.password && errors.password && (
                      <div className="label ae-3 cropTop">
                        <label
                          htmlFor="password"
                          className="cropTop opacity-5 input-feedback"
                        >
                          {errors.password}
                        </label>
                      </div>
                    )}
                    <div className="label ae-3 cropTop">
                      <label
                        htmlFor="desired_email"
                        className="cropTop opacity-5"
                      >
                        Email
                      </label>
                    </div>
                    <input
                      id="desired_email"
                      placeholder="Enter your email"
                      type="text"
                      value={values.desired_email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`
        ${
          errors.desired_email && touched.desired_email
            ? "text-input error"
            : "text-input"
        }
      `}
                    />

                    {errors.desired_email &&
                      touched.desired_email &&
                      errors.desired_email && (
                        <div className="label ae-3 cropTop">
                          <label
                            htmlFor="password"
                            className="cropTop opacity-5 input-feedback"
                          >
                            {errors.desired_email}
                          </label>
                        </div>
                      )}

                    <div className="label ae-3 cropTop">
                      <label
                        htmlFor="desired_firstname"
                        className="cropTop opacity-5"
                      >
                        First name
                      </label>
                    </div>
                    <input
                      type="text"
                      name="desired_firstname"
                      placeholder="Provide your first name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.desired_firstname}
                    />
                    {errors.desired_firstname &&
                      touched.desired_firstname &&
                      errors.desired_firstname && (
                      <div className="label ae-3 cropTop">
                        <label
                          htmlFor="desired_firstname"
                          className="cropTop opacity-5 input-feedback"
                        >
                          {errors.desired_firstname}
                        </label>
                      </div>
                    )}

                    <div className="label ae-3 cropTop">
                      <label
                        htmlFor="desired_lastname"
                        className="cropTop opacity-5"
                      >
                        Last name
                      </label>
                    </div>
                    <input
                      type="text"
                      name="desired_lastname"
                      placeholder="Provide your last name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.desired_lastname}
                    />
                    {errors.desired_lastname &&
                      touched.desired_lastname &&
                      errors.desired_lastname && (
                      <div className="label ae-3 cropTop">
                        <label
                          htmlFor="password"
                          className="cropTop opacity-5 input-feedback"
                        >
                          {errors.desired_lastname}
                        </label>
                      </div>
                    )}
					<ColoredLine color="grey" />
                    <div className="label ae-3 cropTop">
                      <label
                        htmlFor="consent"
                        className="cropTop opacity-5"
                      >
                        I consent to be added to the mailing list.
                      </label>
                    </div>
					
                    <input
                      type="checkbox"
                      name="consent"
                      value={values.consent}
                      checked={values.consent ? "checked" : ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.consent &&
                      touched.consent &&
                      errors.consent}
					  <ColoredLine color="grey" />
                    <button
                      type="submit"
                      disabled={errors.username || errors.password || isSubmitting}
                      className="button blue wide gradient ae-9 cropBottom"
                    >
                      {isSubmitting ? "Submitting..." : "Register"}
                    </button>
                  </form>
                );
              }}
            </Formik>
          )}
        </div>
      </div>
    );
  }
}

export default RegistrationForm;