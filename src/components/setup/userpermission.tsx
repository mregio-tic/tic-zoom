import React, { Fragment, useState } from 'react'
import Webcam from "react-webcam";
import "semantic-ui-css/semantic.min.css";
import { Button, Container, Dimmer, Grid, GridRow, Image, Input, Loader, Segment } from 'semantic-ui-react';
import "./../../assets/css/main.scss"
import mainlogo from "./../../assets/img/main_logo.png";
import { useQuery, gql, useMutation } from '@apollo/client';
var url = window.location.search;
var params = new URLSearchParams(url);

interface SetupProps {
    nickname?: String;
}

const UPDATEUSER = gql`
    mutation UpdateUser($username: String!, $group: String!, $audio: Boolean!, $talking: Boolean!, $active: Boolean!) {
        updateUser(username: $username, group: $group, audio: $audio, talking: $talking, active: $active) {
            username, group, audio, talking, active
        }
    }
`


const SetupPage = (props: any) => {
    var nickname = params.get("nickname");
    var groupName = params.get("group");
    const [mute, setMute] = useState(false);
    if (nickname === null || groupName === null) {
        props.history.push({
            pathname: "/",
            state: {}
        });
    }

    const videoConstraints = {
        width: 1020,
        height: 1020,
        facingMode: "user"
    };
    const [updateUser] = useMutation(UPDATEUSER, {
        variables: { username: nickname, group: groupName, audio: mute, talking: false, active: false }
    });

    const callPage = () => {
        var muted = mute ? 1 : 0;
        updateUser().then(() => {
            window.location.replace("/session?nickname=" + nickname + "&group=" + groupName + "&audio=" + muted);
        });
    }

    const muteDevice = () => {
        updateUser();
        setMute(!mute);
    }

    return (
        <Fragment>
            <Container className="container">
                <Segment className="purple" raised>
                    <Webcam audio={mute}
                        width="100%"
                        videoConstraints={videoConstraints}
                        screenshotFormat="image/jpeg" />
                </Segment>
                <Grid columns={1}>
                    <Grid.Row centered>
                        <Grid.Column width="10">
                            <Segment className="purple" raised>
                                <div className="personal-space">
                                    <Button className="orange" fluid basic onClick={muteDevice}>{mute ? "Unmute" : "Mute"}</Button>
                                </div>
                                <div className="personal-space">
                                    <Button className="orange" fluid onClick={callPage}>Continue</Button>
                                </div>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </Fragment>
    )
}

export default class Setup extends React.Component<SetupProps>{
    render() {
        return <SetupPage {...this.props} />;
    }
}