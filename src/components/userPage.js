import React from 'react'
import {connect} from 'react-redux'
import {getUserInfo} from '../actions/search'
import UserItem from './userItem'

class UserPage extends React.PureComponent {

    componentWillMount(){
        this.props.getUserInfo(this.props.match.params.user)
        this.props.getUserInfo(this.props.match.params.user,'followers')
        this.props.getUserInfo(this.props.match.params.user,'following')
    }

    componentDidUpdate(prevProps) {
        if(prevProps.match.params.user !== this.props.match.params.user) {
            this.props.getUserInfo(this.props.match.params.user)
            this.props.getUserInfo(this.props.match.params.user,'followers')
            this.props.getUserInfo(this.props.match.params.user,'following')
        }
    }

    render(){
        return (
            <div>
                <div style={styles.header}>
                    {this.props.userInfo ? 
                        <div style={styles.avatar}>
                            <img src={this.props.userInfo.avatar_url} alt="userIcon" style={{width:200,height:200}}/>
                            <h1>{this.props.userInfo.name}</h1>
                            <h2>JSON Payload:</h2>
                            <div style={{textAlign:'center',backgroundColor:'grey',border:'1px solid lightgrey'}}>{JSON.stringify(this.props.userInfo,null,4)}</div>
                        </div>
                    : undefined}
                </div>
                <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                    {Array.isArray(this.props.followers) ? 
                        <div style={{display:'flex',flexDirection:'column',width:'100%',marginRight:20}}>
                            <p style={{fontWeight:'bold',fontSize:'3vw',color:'black',padding:10,alignSelf:'flex-start'}}>Followers:</p>
                            {this.props.followers.map((follower,idx)=> (
                                <UserItem user={follower} key={idx} checked={this.props.showFollows}/>
                            ))}
                        </div>
                    : undefined}
                    {Array.isArray(this.props.following) ? 
                        <div style={{display:'flex',flexDirection:'column',width:'100%',marginRight:20}}>
                            <p style={{fontWeight:'bold',fontSize:'3vw',color:'black',padding:10,alignSelf:'flex-start'}}>Following:</p>
                            {this.props.following.map((following,idx)=> (
                                <UserItem user={following} key={idx} checked={this.props.showFollows}/>
                            ))}
                        </div>
                     : undefined}
                </div>
            </div>
        )
    }
}

const styles = {
    header: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#222',
        width:'100%',
        padding: 20,
        color: 'white'
    },
    avatar:{
        display:'flex',
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'column',
        width: '20%'
    }
}

const mapStateToProps = state => ({
    userInfo: state.userInfo,
    followers: state.followers,
    following: state.following
})

const mapDispatchToProps = dispatch => ({
    getUserInfo: (user,type) => dispatch(getUserInfo(user,type))
})

export default connect(mapStateToProps,mapDispatchToProps)(UserPage);