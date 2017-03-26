import React, { PropTypes } from 'react';
import FavoriteGuideButton from './FavoriteGuideButton'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

export default class GuideListItem extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            guide: undefined,
            userGuide: undefined,
            uid: undefined
        }

        this.state.guide = this.props.guide;
        this.state.userGuide = this.props.userGuide;
        this.state.uid = this.props.uid;
    }

    render() {
        return (
            <div>
                {this.state.guide &&
                    <Card>
                        <CardHeader
                            title={this.state.guide.name}
                            subtitle={this.state.guide.description}
                        />
                        <CardActions>
                            {!this.state.userGuide &&
                                <FavoriteGuideButton uid={this.state.uid} gid={this.state.guide.id}></FavoriteGuideButton>
                            }
                            <RaisedButton href={this.state.guide.url} target="_blank" label="Read More"></RaisedButton>
                        </CardActions>
                        <CardText expandable={true}>
                            <li>
                                <div>
                                    <p>id: {this.state.guide.id}</p>
                                    
                                    <p>{this.state.guide.description}</p>
                                    <p>Last Updated: {(this.state.guide.updated).split(" ")[0]}</p>
                                    <p>Hits: {this.state.guide.count_hit}</p>

                                </div>
                            </li>
                        </CardText>
                    </Card>
                }
            </div>
        );
    }
}
