import { useState, useEffect, useContext } from 'react';


import AuthContext from '../../context/AuthContext'

import { Avatar, Button, TextField, Typography } from "@mui/material";

import { Announcement } from "../components";



const ClassroomDetail = (props) => {
  const { currentUser } = useContext(AuthContext)

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [classroom, setClassroom] = useState(null);

  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInput] = useState("");
  const [image, setImage] = useState(null);

  const handleUpload = (e) => {}

  const handleChange = (e) => {}

  const fetchClassroom = () => {
    setIsLoading(true);
    fetch(process.env.REACT_APP_API_URL + '/api/class/' + props.classroomId, { 
      method: 'GET',
      headers: {
        'Authorization': 'Bearer '+ currentUser.token,
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then((result) => {
      setClassroom(result)
      setIsLoading(false);
    })
    .catch((error) => {
      setError(error);
      setIsLoading(false);
    })
  }

  useEffect(() => {
    fetchClassroom();
  }, [])
  
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (isLoading) {
    return(
      <Typography variant="h4" align="center">
        Loading....
      </Typography>
    );
  } else {
    return (
      <div className="main">
        <div className="main__wrapper">
          <div className="main__content">
            <div className="main__wrapper1">
              <div className="main__bgImage">
                <div className="main__emptyStyles" />
              </div>
              <div className="main__text">
                <h1 className="main__heading main__overflow">
                  {classroom.name}
                </h1>
                <div className="main__section main__overflow">
                  {classroom.section || 'empty section'}
                </div>
                <div className="main__wrapper2">
                  <em className="main__code">Class Code :</em>
                  <div className="main__id">{classroom._id}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="main__announce">
            <div className="main__status">
              <p>Upcoming</p>
              <p className="main__subText">No work due</p>
            </div>
            <div className="main__announcements">
              <div className="main__announcementsWrapper">
                <div className="main__ancContent">
                  {showInput ? (
                    <div className="main__form">
                      <TextField
                        id="filled-multiline-flexible"
                        multiline
                        label="Announce Something to class"
                        variant="filled"
                        value={inputValue}
                        onChange={(e) => setInput(e.target.value)}
                      />
                      <div className="main__buttons">
                        <input
                          onChange={handleChange}
                          variant="outlined"
                          color="primary"
                          type="file"
                        />

                        <div>
                          <Button onClick={() => setShowInput(false)}>
                            Cancel
                          </Button>

                          <Button
                            onClick={handleUpload}
                            color="primary"
                            variant="contained"
                          >
                            Post
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="main__wrapper100"
                      onClick={() => setShowInput(true)}
                    >
                      <Avatar />
                      <div>Announce Something to class</div>
                    </div>
                  )}
                </div>
              </div>
              <Announcement classData={classroom} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ClassroomDetail;