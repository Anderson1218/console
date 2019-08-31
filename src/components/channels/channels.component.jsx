import React from "react";
import { firestore } from "../../firebase/firebase.utils";
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectDisplayName,
  selectPhotoURL
} from "../../redux/user/user.selectors";
import { setCurrentChannel } from "../../redux/channel/channel.action";

class Channels extends React.Component {
  state = {
    activeChannel: "",
    channels: [],
    channelName: "",
    channelDetails: "",
    channelsRef: firestore.collection("channels"),
    modal: false,
    firstLoad: true
  };

  componentDidMount() {
    this.unsubscribeFromChannels = firestore
      .collection("channels")
      .onSnapshot(querySnapshot => {
        let loadedChannels = [];
        querySnapshot.forEach(doc => loadedChannels.push(doc.data()));
        this.setState({ channels: [...loadedChannels] }, () =>
          this.setFirstChannel()
        );
      });
  }

  componentWillUnmount() {
    this.unsubscribeFromChannels();
  }

  setFirstChannel = () => {
    const firstChannel = this.state.channels[0];
    if (this.state.firstLoad && this.state.channels.length > 0) {
      this.props.setCurrentChannel(firstChannel);
      this.setActiveChannel(firstChannel);
    }
    this.setState({ firstLoad: false });
  };

  setActiveChannel = channel => {
    this.setState({ activeChannel: channel.id });
  };

  addChannel = () => {
    const { channelsRef, channelName, channelDetails } = this.state;
    const { displayName, photoURL } = this.props;
    let newChannelsRef = channelsRef.doc();
    const id = newChannelsRef.id;
    const newChannel = {
      id,
      name: channelName,
      details: channelDetails,
      createdBy: {
        name: displayName,
        avatar: photoURL
      }
    };
    newChannelsRef
      .set(newChannel)
      .then(() => {
        this.setState({ channelName: "", channelDetails: "" });
        this.closeModal();
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      this.addChannel();
    }
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  isFormValid = ({ channelName, channelDetails }) =>
    channelName && channelDetails;

  openModal = () => this.setState({ modal: true });

  closeModal = () => this.setState({ modal: false });

  renderChannels = channels =>
    channels.length > 0 &&
    channels.map(channel => (
      <Menu.Item
        key={channel.id}
        onClick={() => {
          this.props.setCurrentChannel(channel);
          this.setActiveChannel(channel);
        }}
        name={channel.name}
        style={{ opacity: 0.7 }}
        active={channel.id === this.state.activeChannel}
      >
        # {channel.name}
      </Menu.Item>
    ));

  render() {
    const { channels, modal } = this.state;

    return (
      <>
        <Menu.Menu style={{ paddingBottom: "2em" }}>
          <Menu.Item>
            <span>
              <Icon name="exchange" /> CHANNELS
            </span>{" "}
            ({channels.length}){" "}
            <Icon link name="add" onClick={this.openModal} />
          </Menu.Item>
          {this.renderChannels(channels)}
        </Menu.Menu>

        {/* Add Channel Modal */}
        <Modal basic open={modal} onClose={this.closeModal}>
          <Modal.Header>Add a Channel</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <Input
                  fluid
                  label="Name of Channel"
                  name="channelName"
                  onChange={this.handleChange}
                />
              </Form.Field>

              <Form.Field>
                <Input
                  fluid
                  label="About the Channel"
                  name="channelDetails"
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Form>
          </Modal.Content>

          <Modal.Actions>
            <Button color="green" inverted onClick={this.handleSubmit}>
              <Icon name="checkmark" /> Add
            </Button>
            <Button color="red" inverted onClick={this.closeModal}>
              <Icon name="remove" /> Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  displayName: selectDisplayName,
  photoURL: selectPhotoURL
});

const mapDispatchToProps = dispatch => ({
  setCurrentChannel: channel => dispatch(setCurrentChannel(channel))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channels);
