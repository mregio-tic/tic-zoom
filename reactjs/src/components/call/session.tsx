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

    const members: any[] = [];
    const session: SessionProps = {
        totalMembers: members.length,
        members: members
    }
    const [mute, setMute] = useState(muted);
    
    const [updateUser] = useMutation(UPDATEUSER, {
        variables: { username: nickname, group: groupName, audio: mute, talking: false, active: true }
    });
    //active session
    updateUser();

    const getAllUserQuery = useQuery(GETALLUSERS, {pollInterval: 3000})
    
    if (getAllUserQuery.data) {
        getAllUserQuery.data.getAllUsers.map((item: any) => {
            if (item.active) {
                members.push(item);
            }
        });
    }

    const muteDevice = () => {
        updateUser();
        setMute(!mute);
    }

    //call peers
    callservice.connectToEveryone(session.members);

    return (
        <Fragment>
            <Container className="container">
                <Grid>
                    {session.members.map((item: any) => (
                        (nickname == item.username) ?
                        <div key={item.id} className={item.talking ? "card-talking" : "card"}>
                            <Webcam audio={item.audio}
                                width="100%"
                                screenshotFormat="image/jpeg" />
                            <h5 className="name">{item.username}</h5>
                        </div>
                        : 
                        <div key={item.id} className={item.talking ? "card-talking" : "card"}>
                            <video id={item.username} autoPlay></video>
                            <h5 className="name">{item.username}</h5>
                        </div>
                    ))}
                </Grid>
            </Container>
            <Container className="controls">
                <Grid columns={1}>
                    <Grid.Row centered>
                        <Segment>
                            <Button className="red big" basic onClick={muteDevice}>{mute ? "Unmute" : "Mute"}</Button>
                            <Button className="red big">End Call</Button>
                        </Segment>
                    </Grid.Row>
                </Grid>
            </Container>
        </Fragment>
    )
}

export default class Session extends React.Component {
    render() {
        return <SessionPage {...this.props} />;
    }
}