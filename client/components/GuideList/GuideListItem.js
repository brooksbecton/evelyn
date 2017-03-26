import React, { PropTypes } from 'react';
import FavoriteGuideButton from './FavoriteGuideButton'

export default class GuideListItem extends React.Component {

    constructor(props) {
        super(props)

        this.state={
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
            <li>
            {this.state.guide &&
                <div>
                    <p>id: {this.state.guide.id}</p>
                    <a href={this.state.guide.url} target="_blank">{this.state.guide.name}</a>
                    <p>{this.state.guide.description}</p>
                    <p>Last Updated: {(this.state.guide.updated).split(" ")[0]}</p>
                    <p>Hits: {this.state.guide.count_hit}</p>
                    {!this.state.userGuide &&
                        <FavoriteGuideButton uid={this.state.uid} gid={this.state.guide.id}></FavoriteGuideButton>
                    }
                </div>
            }
            </li>
        );
    }
}
