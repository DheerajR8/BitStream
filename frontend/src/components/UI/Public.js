import React,{ Component,useRef, useState, } from "react";
import {Card, CardGroup} from 'react-bootstrap';
import { Redirect, NavLink} from "react-router-dom";
import axios from 'axios';
import AuthHeader from "../../services/auth-header";
const baseURL = "http://localhost:8080/api/rest/all";


class Public extends Component {

    constructor(props) {
        super(props);
        this.state = {videos: []};
    }

    async componentDidMount() {

        try 
        {

       let res = await axios({
            url: baseURL,
            method: 'get',
            timeout: 8000
        })
        if(res.status === 200){

            console.log("Inside UploadList");
        }

        const data= res.data;

        this.setState({ videos: [...data] });

        }
        catch (err) {
        console.error(err);
        }

    }

    render(){

        return( <div>

            
            <CardGroup>


        {this.state.videos.map(
        (video)=>
                <Card style={{ width: '15rem' }} key={video.id}>
                    <NavLink to={`/player/${video.id}/${video.title}`}>
                    <Card.Img variant="top" src={"data:image/png;base64," + video.thumbnail} />
                    <Card.Body>
                        <Card.Title>{video.title}
                        </Card.Title>
                        <Card.Text style={{width: '15rem'}, {overflow: 'hidden'}}>{video.category}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">{video.filename}</small>
                    </Card.Footer>
                    </NavLink>
                 </Card>
            )}
            
            </CardGroup>

            </div>
            )
        
    }
}
export default Public;