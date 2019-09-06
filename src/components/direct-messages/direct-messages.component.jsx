import React from "react";
// import { firestore, realTimeDb, auth } from "../../firebase/firebase.utils";
import { firestore } from "../../firebase/firebase.utils";
import { Menu, Icon } from "semantic-ui-react";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { connect } from "react-redux";

class DirectMessages extends React.Component {
  state = {
    user: this.props.currentUser,
    users: [],
    usersRef: firestore.collection("users")
    // connectedRef: firebase.database().ref(".info/connected"),
    // presenceRef: firebase.database().ref("presence")
  };

  componentDidMount() {
    if (this.state.user) {
      this.addListeners(this.state.user.id);
    }
    // console.log(auth.currentUser.uid);
    // console.log(realTimeDb);
    // realTimeDb.ref("/users/" + auth.currentUser.uid).set(true);
  }

  //   componentWillUnmount() {
  //     console.log("unmount direct-messages");
  //   }

  addListeners = currentUserId => {
    let loadedUsers = [];
    this.unsubscribeFromUsers = this.state.usersRef.onSnapshot(snapShot => {
      snapShot.forEach(doc => {
        if (currentUserId !== doc.id) {
          let user = doc.data();
          user["id"] = doc.id;
          user["status"] = "offline";
          loadedUsers.push(user);
          this.setState({ users: loadedUsers });
        }
      });
    });

    // this.state.connectedRef.on("value", snap => {
    //     if (snap.val() === true) {
    //       const ref = this.state.presenceRef.child(currentUserUid);
    //       ref.set(true);
    //       ref.onDisconnect().remove(err => {
    //         if (err !== null) {
    //           console.error(err);
    //         }
    //       });
    //     }
    //   });

    //   this.state.presenceRef.on("child_added", snap => {
    //     if (currentUserUid !== snap.key) {
    //       this.addStatusToUser(snap.key);
    //     }
    //   });

    //   this.state.presenceRef.on("child_removed", snap => {
    //     if (currentUserUid !== snap.key) {
    //       this.addStatusToUser(snap.key, false);
    //     }
    //   });
  };

  //   addStatusToUser = (userId, connected = true) => {
  //     const updatedUsers = this.state.users.reduce((acc, user) => {
  //       if (user.uid === userId) {
  //         user["status"] = `${connected ? "online" : "offline"}`;
  //       }
  //       return acc.concat(user);
  //     }, []);
  //     this.setState({ users: updatedUsers });
  //   };

  //   isUserOnline = user => user.status === "online";

  render() {
    const { users } = this.state;

    return (
      <Menu.Menu className="menu">
        <Menu.Item>
          <span>
            <Icon name="mail" /> DIRECT MESSAGES
          </span>{" "}
          ({users.length})
        </Menu.Item>
        {/* {users.map(user => (
          <Menu.Item
            key={user.uid}
            onClick={() => console.log(user)}
            style={{ opacity: 0.7, fontStyle: "italic" }}
          >
            <Icon
              name="circle"
              color={this.isUserOnline(user) ? "green" : "red"}
            />
            @ {user.name}
          </Menu.Item>
        ))} */}
      </Menu.Menu>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(DirectMessages);
