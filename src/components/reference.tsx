import React, { Fragment } from "react";
import "semantic-ui-css/semantic.min.css";
import { Container, Dimmer, Grid, GridRow, Image, Loader } from 'semantic-ui-react';
import "../assets/css/main.scss";
import { useQuery, gql } from '@apollo/client';

const GETALLUSERS = gql`
    query GetAllUsers{
        getAllUsers{
            username
        }
    }
`
var _username = "superadmin"
const GETONEUSER = gql`
    query GetOneUser($username: String!) {
        getOneUser(username: $username) {
            username
        }
    }
`


const WelcomePage = () => {
    const getAllUserQuery = useQuery(GETALLUSERS); //{pollInterval: 1000}
    const getOneUserQuery = useQuery(GETONEUSER, {
        variables: { username: _username }    
    });

    if (!getOneUserQuery.loading) {
        if (getOneUserQuery.data.getOneUser) {
            alert(getOneUserQuery.data.getOneUser.username);
        }
        
    }
    
    var renderData = ""
    console.log(getAllUserQuery.data);
    if (getAllUserQuery.data) {
        getAllUserQuery.data.getAllUsers.map((item: any) => {
            if (item !== null)
                renderData += (item.username + "<br>")
        });
    }
    
    console.log("RENDERED:", renderData);
    return (
        <Fragment>
            <Grid columns={1}>
                <Grid.Row><span style={{ marginTop: "200px" }}></span></Grid.Row>
                <Grid.Row>
                    <h4 style={{ margin: "auto", color: "white" }}>Welcome</h4>
                </Grid.Row>
                <Grid.Row>
                    <h5 style={{ margin: "auto", color: "white" }}>Current Users:</h5>
                </Grid.Row>
                <Grid.Row>
                    <div style={{ margin: "auto", color: "white" }} dangerouslySetInnerHTML={{ __html: renderData }} />
                </Grid.Row>
            </Grid>
        </Fragment>
    )
}


export default class Welcome extends React.Component {
    render() {
        return <WelcomePage />
    }
}
