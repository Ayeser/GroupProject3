import React, { useState } from "react";
import CountryJumbotron from "../components/CountryJumbotron";
import API from "../utils/API";
import { Row, Col, Container } from "../components/Grid";
import { Input, FormBtn } from "../components/Form";


function Welcome() {
  const [formObject, setFormObject] = useState({});

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  };

  function handleFormCreateSubmit(event) {
    event.preventDefault();
      return API.createUser({
        username: formObject.createUsername,
        email: formObject.createEmail,
        password: formObject.createPassword
      })
        .then(console.log("Create an account request sent!"))
        .catch(err => console.log(err));
    };

  function handleFormLoginSubmit(event) {
    event.preventDefault();
    return API.login({
        username: formObject.loginName,
        password: formObject.loginPassword
      })
      .then(res => {
        if (res.data.status === 500) {
          alert("Username/Password cannot be found")
        } else if (res.data.status === 201) {
          window.location.replace("/members/" + res.data.data.username)
        }})
        .catch(err => console.log(err));
      }

    return (
      <Container fluid>
<Row>
<CountryJumbotron>
              <h1>Welcome to Beyond the Guidebook!</h1>
                <p>Our world is getting smaller and smaller. It's easier than ever to travel and meet persons of other cultures. You don't have time to read through outdated guidebooks, you need relevant and current information from those with firsthand experience! "Beyond the Guidebook" is exactly what you're looking for; after creating a profile you will be able to cultural guidance and firsthand testimonials for any country in the world. </p>
            </CountryJumbotron>
  </Row>
            <Row>
                <Col size="md-6 sm-6">
            <form>
            <h1>Create an Account</h1>
            <Input
                onChange={handleInputChange}
                name="createUsername"
                placeholder="Username"

              />
              <Input
                onChange={handleInputChange}
                name="createEmail"
                placeholder="Email"

              />
              <Input
                onChange={handleInputChange}
                name="createPassword"
                placeholder="Password"
              />
              <FormBtn
                disabled={!(formObject.createUsername && formObject.createEmail && formObject.createPassword)}
                onClick={handleFormCreateSubmit}
              >
                Create Account
              </FormBtn>
            </form>
            </Col>
            <Col size="md-6 sm-6">
            <form>
            <h1>or Login to Account</h1>
              <Input
                onChange={handleInputChange}
                name="loginName"
                placeholder="Username"

              />
              <Input
                onChange={handleInputChange}
                name="loginPassword"
                placeholder="Password"
              />
              <FormBtn
                disabled={!(formObject.loginName && formObject.loginPassword)}
                onClick={handleFormLoginSubmit}
              >
                Login
              </FormBtn>
            </form>
            </Col>
            </Row>
      </Container>
    );
    };

export default Welcome;