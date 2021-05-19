import React, { Fragment, useEffect, useState } from 'react'
import Webcam from "react-webcam";
import "semantic-ui-css/semantic.min.css";
import { Button, Container, Dimmer, Grid, GridRow, Image, Input, Loader, Segment } from 'semantic-ui-react';
import "./../../assets/css/main.scss"
import mainlogo from "./../../assets/img/main_logo.png";
import { useQuery, gql, useMutation } from '@apollo/client';
import callservice from '../service/callservice';
var url = window.location.search;
var params = new URLSearchParams(url);

const UPDATEUSER = gql`
    mutation UpdateUser($username: String!, $group: String!, $audio: Boolean!, $talking: Boolean!, $active: Boolean!) {
        updateUser(username: $username, group: $group, audio: $audio, talking: $talking, active: $active) {
            username, group, audio, talking, active
        }
    }
`
const GETALLUSERS = gql`
    query GetAllUsers{
        getAllUsers{
            id, username, group, audio, talking, active
        }
    }
`
interface SessionProps {
    totalMembers: number,
    members: any[],
}

const videoConstraints = {
    facingMode: "user"
};

const SessionPage = (props: any) => {
    var nickname = params.get("nickname");
    var groupName = params.get("group");
    var muted = params.get("audio") === "0" ? false : true

    if (nickname === null || groupName === null) {
        props.history.push({
            pathname: "/",
            state: {}
        });
    } else {
        localStorage.setItem("userid", nickname);
        localStorage.setItem("groupname", groupName);
    }

    var members: any[] = [];
    const session: SessionProps = {
        totalMembers: members.length,
        members: members
    }
    const [mute, setMute] = useState(muted);
    const [called, setCalled] = useState(false);
    const [updateUser] = useMutation(UPDATEUSER, {
        variables: { username: nickname, group: groupName, audio: mute, talking: false, active: true }
    });
    //active session
    updateUser();

    const getAllUserQuery = useQuery(GETALLUSERS);
    const getAllUserCount = useQuery(GETALLUSERS);

    if (getAllUserCount.data) {
       
        if (Number(getAllUserCount.data.getAllUsers.length) != session.totalMembers) {
            if (getAllUserQuery.data) {
                getAllUserQuery.data.getAllUsers.map((item: any) => {
                    if (item.active) {
                        session.totalMembers += 1;
                        members.push(item);
                    }
                });
                
                session.totalMembers = members.length;
                members.sort();
            }
            //call peers
            callservice.connectToEveryone(session.members);
        } else {
            session.totalMembers = Number(getAllUserCount.data.getAllUsers.length);
        }

        console.log("SERVER USERS", Number(getAllUserCount.data.getAllUsers.length));
        console.log("CURRENT USERS", session.totalMembers);
    }



    const muteDevice = () => {
        updateUser();
        setMute(!mute);
    }

    setInterval(() => {
        callservice.reconnectToEveryone(session.members);
    },10000);


    return (
        <Fragment>
            <Container className="container">
                <Grid>
                    {session.members.map((item: any) => (
                        (nickname == item.username) ?
                            <div className={item.talking ? "card-talking" : "card"}>
                                <Webcam key={item.id} audio={item.audio}
                                    screenshotFormat="image/jpeg"
                                    width="100%" height="80%"
                                    videoConstraints={videoConstraints} />
                                <h5 className="name">{item.username}</h5>
                            </div>
                            :
                            <div key={item.id} className={item.talking ? "card-talking" : "card"}>
                                <video id={item.username} width="100%" height="80%" autoPlay></video>
                                <h5 className="name">{item.username}</h5>
                            </div>
                    ))}
                </Grid>
            </Container>
            {/*<Container className="controls">
                <Grid columns={1}>
                    <Grid.Row centered>
                        <Segment>
                            <Button className="red big" basic onClick={muteDevice}>{mute ? "Unmute" : "Mute"}</Button>
                            <Button className="red big">End Call</Button>
                        </Segment>
                    </Grid.Row>
                </Grid>
                    </Container>*/}
        </Fragment>
    )
}

export default class Session extends React.Component {
    render() {
        return <SessionPage {...this.props} />;
    }
}