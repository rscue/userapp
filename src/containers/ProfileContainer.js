import React, { Component } from 'react';
import ProfileForm from '../forms/ProfileForm';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

class ProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicleType: null
    };
  }

  handleSubmit = (values) => {
    return sleep(1000).then(() => {
      // alert(values);
      window.tron.debug(values);
    });
  }

  render() {
    return (
      <ProfileForm onSubmit={this.handleSubmit} />
    );
  }
}

export default ProfileContainer;
