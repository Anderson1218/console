import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

import { selectChannelIsLoading } from "../../redux/channel/channel.selectors";
import WithSpinner from "../../hoc/with-spinner/with-spinner.component";
import ChatPage from "./chat.component";

const mapStateToProps = createStructuredSelector({
  isLoading: selectChannelIsLoading
});

const ChatPageContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(ChatPage);

export default ChatPageContainer;
