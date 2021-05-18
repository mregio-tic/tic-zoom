import React, { Fragment, useState } from 'react'
import { Redirect } from 'react-router-dom';
import "semantic-ui-css/semantic.min.css";
import { Button, Container, Dimmer, Grid, GridRow, Image, Input, Loader, Segment } from 'semantic-ui-react';
import "./../../assets/css/main.scss"
import mainlogo from "./../../assets/img/main_logo.png";

const JoinPage = (props: any) => {
    const [nickname, setNickname] = useState("");
    const groupName = "talkproject";
    const join = () => {
        window.location.replace("/setup?nickname=" + nickname + "&group=" + groupName);
    }

    return (
        <Fragment>
            <Grid columns={1}>
                <Grid.Row>
                    <div className="mainLogo">
                    </div>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width="13">
                        <h3 className="title">Join the Talk!</h3>
                        <Segment className="purple" raised stacked>
                            <Input fluid icon="user" className="personal-space"
                                iconPosition="left" placeholder="Nickname"
                                onChange={event => setNickname(event.target.value)} />
                            <Button className="orange personal-space" fluid onClick={join}>Join</Button>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Fragment>
    )
}

export default class Menu extends React.Component {
    render() {
        return <JoinPage {...this.props} />;
    }
}