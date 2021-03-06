import React, { useState, useEffect } from "react";
import Jumbotron from "../components/Jumbotron";
import CountryJumbotron from "../components/CountryJumbotron";
import API from "../utils/API";
import { Link, useParams } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import Nav from "../components/Nav";
import { Input, TextArea, FormBtn } from "../components/Form";
import "../pages/AllCountries.css"

function AllCountries() {
  const [countries, setCountries] = useState({});
  const [singleCountry, setCountry] = useState({});
  const [formObject, setFormObject] = useState({});
  const [commentsObject, setCommentsObject] = useState({});
  const [questionsObject, setQuestionsObject] = useState({});
  const {name, username, id} = useParams();
  const [alertObject, setAlertObject] = useState({Advice: "", Question: ""});

  useEffect(() => {
    loadCountries();
  }, []);

  function loadCountries() {
    API.getCountries()
      .then(res => 
        {
        setCountries(res.data)
        }
      )
      .catch(err => console.log(err));
      switchCountry(name);
  };

  function switchCountry(name) {
    API.switchCountry(name)
      .then(res => setCountry(res.data[0]))
      .catch(err => console.log(err));
      API.loadQuestions(name)
      .then(res => setQuestionsObject(res.data))
      .catch(err => console.log(err));
      API.loadComments(name)
      .then(res => setCommentsObject(res.data))
      .catch(err => console.log(err));
  };

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  };

  function handleFormSubmitAdvice(event) {
      return API.saveComment({
        person: username,
        place: name,
        advice: formObject.advice
      })
        .then(setAlertObject({ Advice: "Comment uploaded"}))
        .catch(err => console.log(err));
    };

  function handleFormSubmitQuestion(event) {
    return API.saveQuestion({
      person: username,
      place: name,
      questionn: formObject.questionn
    })
    .then(setAlertObject({ Question: "Question uploaded"}))
      .catch(err => console.log(err));
  };

    return (
      <Container fluid>
              <Nav username={username} id={id} />
<Row>
<CountryJumbotron>
              <div className = "Flag">
              <h1>{singleCountry.name}</h1>
              <img src={singleCountry.profilePicture} alt="Country Flag" />
              </div>
            </CountryJumbotron>
  </Row>
  <Row>
  <Col size="md-1 sm-2" />
          <Col size="md-2 sm-4">
<form>
  <Input
                onChange={handleInputChange}
                name="place"
                placeholder="Country"
                onKeyPress={event => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    switchCountry(formObject.place);
                  }
                }}
              />
              </form>
          
            {countries && countries.length  > 0 ? (
              <List>
                {countries.map(country => (
                  <ListItem key={country.name}>
                    <Link to={"/countries/" + country.name + "/" + username + "/" + id}
                    onClick={() => switchCountry(country.name)}>
                      <strong>
                        {country.name}
                      </strong>
                    </Link>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
<Col size="md-8 sm-6">
      {/* Below row to be right of the countries sidebar, so within a col */}
        <Row>
          <Col size="md-5 sm-8">
            <div className= "CultureboxA">
            <Jumbotron>

            <h1 id='Capital'>Capital city is:</h1>
            <h2>{singleCountry.description}</h2>
        
            </Jumbotron>
            </div>
            </Col><Col size="md-5 sm-8">
            <div className= "CultureboxA Culturebox">
            <Jumbotron>
            <h1>Languages:</h1>
            <h2>{singleCountry.languages}</h2>
            
            </Jumbotron>
            </div>
            </Col>
            </Row>
            <Row>
            <Col size="md-5 sm-8">
              <div className= "Culturebox">
            <Jumbotron>
              <h1>National Animal (or fun fact):</h1>
            <h2>{singleCountry.animal}</h2>
            </Jumbotron>
            </div>
            </Col>
            <Col size="md-5 sm-8">
              <div className= "Culturebox">
            <Jumbotron>
              <h1>Currency:</h1>
            <h2>{singleCountry.currency}</h2>
            </Jumbotron>
            </div>
            </Col>
            </Row>
            </Col>
            <Row>
              <Col size="md-1 sm-2" />
              <Col size="md-4 sm-5">
            <form>
            <h2>What "beyond the guidebook" advice can you offer a prospective traveler to this country?</h2>
              <Input
                disabled={true}
                value={username}
                name="author"

              />
              <TextArea
                onChange={handleInputChange}
                name="advice"
                placeholder="Type comment here"
              />
              <FormBtn
                disabled={!formObject.advice}
                onClick={function(event) {handleFormSubmitAdvice(event)}}
              >
                Submit Comment
              </FormBtn>
              <p>{alertObject.advice}</p>
            </form>

            {commentsObject && commentsObject.length  > 0 ? (
              <List>
                {commentsObject.map(comment => (
                  <ListItem key={comment.advice}>
                      <strong>
                        {comment.advice + "     -" + comment.person}
                      </strong>
                  </ListItem>
                ))}
              </List>
            ):(
              <h3>No Results to Display</h3>
            )}
            
            </Col>
            <Col size="md=4 sm-5">
            <form>
            <h2>Have any questions about the culture of this country?</h2>
              <Input
                  disabled={true}
                  value={username}

              />
              <TextArea
                onChange={handleInputChange}
                name="question"
                placeholder="Question here"
              />
              <FormBtn
                disabled={!formObject.question}
                onClick={function(event) {handleFormSubmitQuestion(event)}}
              >
                Submit Question
              </FormBtn>
              <p>{alertObject.question}</p>
            </form>
            {questionsObject && questionsObject.length  > 0 ? (
              <List>
                {questionsObject.map(question => (
                  <ListItem key={question.questionn}>
                      <strong>
                        {question.questionn + "     -" + question.person}
                      </strong>
                  </ListItem>
                ))}
              </List>
            ):(
              <h3>No Results to Display</h3>
            )}
            </Col>
            </Row> 
            </Row>
      </Container>
    );
  }


export default AllCountries;
