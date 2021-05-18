import React, { Fragment, useState } from 'react'
import Webcam from "react-webcam";
import "semantic-ui-css/semantic.min.css";
import { Button, Container, Dimmer, Grid, GridRow, Image, Input, Loader, Segment } from 'semantic-ui-react';
import "./../../assets/css/main.scss"
import mainlogo from "./../../assets/img/main_logo.png";
var url = window.location.search;
var params = new URLSearchParams(url);

const sampleMembers = [
    {
        id: 1,
        name: "Marck",
        audio: false,
        talking: false,
    },
    {
        id: 2,
        name: "Marck2",
        audio: false,
        talking: true,
    },
    {
        id: 3,
        name: "Marck3",
        audio: false,
        talking: false,
    },
    {
        id: 4,
        name: "Marck4",
        audio: false,
        talking: false,
    },
]

interface SessionProps {
    totalMembers: number,
    members: any[],
}

const SessionPage = (props: any) => {
    var nickname = params.get("nickname");
    var groupName = params.get("group");
    const session: SessionProps = {
        totalMembers: sampleMembers.length,
        members: sampleMembers
    }

    return (
        <Fragment>
            <Container className="container">
                <Grid>
                    {session.members.map((item: any) => (
                        <div key={item.id} className={item.talking ? "card-talking": "card"}>
                            <Webcam audio={item.audio}
                                width="100%"
                                screenshotFormat="image/jpeg" />
                            <h5 className="name">{nickname == item.name? "YOU" : item.name}</h5>
                        </div>
                    ))}
                </Grid>
            </Container>
            <Container className="controls">
                <Grid columns={1}>
                    <Grid.Row centered>
                            <Segment>
                                <Button className="red big" basic>Mute</Button>
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