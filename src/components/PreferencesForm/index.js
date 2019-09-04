import React, { Component } from "react";
import { Formik } from "formik";
import { config } from "../../config";
import axios from "axios";
import SectionTitle from "../SectionTitle";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class PreferencesForm extends Component {
    state = {
      submitted: false,
      success: false
    };
  
    submitData() {}

    onAnonymizeButtonClick (profileId, sessionId) {
      let params = {
          profileId: profileId,
          sessionId: sessionId,
          operation: "anonymize",
          siteKey: config.dxSiteKey
      };

      console.log(params);
      
      axios.post(process.env.REACT_APP_REGISTRATION_HOST, null, {withCredentials: true, params: params})
      .then(response => {
          console.log(response);
          if (response.status === 202) {
              toast.success("Profile has been anonymized");
          } else {
              toast.error("Profile not anonymized");
          }
      })
      .catch(error => {
          console.log(error);
      });
    }
  
    render() {
      const { profileId, sessionId, consented } = this.props;
      
      return (
            <div className="pad shadow selected ae-3 left done">
                <SectionTitle title={{value: "Preferences"}} />
                <Formik
                initialValues={{
                    siteKey: config.dxSiteKey,
                    consent: consented,
                    profileId: profileId,
                    sessionId: sessionId,
                    operation: "update"
                }}


                onSubmit={(values, { setSubmitting }) => {
                    axios
                    .post(process.env.REACT_APP_REGISTRATION_HOST, null, {
                        params: values
                    })
                    .then(response => {
                        setSubmitting(false);
                        this.setState({ submitted: true });
                        this.setState({ success: response.status === 202 });
                        console.log({ response });
                        if(this.state.success) {
                            toast.success("Preferences updated.");
                        } else {
                            toast.error("Could not update preferences.");
                        }
                    })
                    .catch(err => {
                        setSubmitting(false);
                        this.setState({ submitted: true });
                        this.setState({ success: false });
                        console.error(err);
                        toast.error("Could not update preferences.");
                    });
                }}

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
                                <label
                                    htmlFor="consent"
                                    className="cropTop opacity-5">
                                    I consent to be added to the Viagem mailing list.
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


                            <button 
                                type="submit" 
                                className="button blue wide gradient ae-9 cropBottom">
                                {isSubmitting ? "Submitting..." : "Update Preferences"}
                            </button>

                            <button 
                                type="button" 
                                className="button red wide gradient ae-9 cropBottom" 
                                onClick={() => this.onAnonymizeButtonClick(this.props.profileId, this.props.sessionId)}>
                                Remove my PII
                            </button>
                        </form>
                        )   
                    }
                }
                </Formik>
            </div>
      )
    }
  }
  
  export default PreferencesForm;