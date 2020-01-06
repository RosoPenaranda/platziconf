import React from "react";

import "./styles/BadgeDetails.css";
import PageLoading from "../components/PageLoading";
import PageError from "../components/PageLoading";
import api from "../api";
import BadgeDetails from "./BadgeDetails";

class BadgeDetailsContainer extends React.Component {
  state = {
    loading: true,
    error: null,
    data: undefined,
    modalIsOpen: false,
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    this.setState({ loading: true, error: null });

    try {
      const data = await api.badges.read(this.props.match.params.badgeId);
      this.setState({ loading: false, data: data });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  handelOpenModal = e => {
    this.setState({ modalIsOpen: true });
  };

  handelCloseModal = e => {
    this.setState({ modalIsOpen: false });
  };

  handleDeleteBadge = async e => {
    this.setState({ loading: true, error: null });

    try {
      await api.badges.remove(this.props.match.params.badgeId);
      this.props.history.push("/badges");
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  render() {
    if (this.state.loading) {
      return <PageLoading />;
    }
    if (this.state.error) {
      return <PageError />;
    }

    return (
      <BadgeDetails
        onCloseModal={this.handelCloseModal}
        onOpenModal={this.handelOpenModal}
        onDeleteBadge={this.handleDeleteBadge}
        badge={this.state.data}
        modalIsOpen={this.state.modalIsOpen}
      />
    );
  }
}

export default BadgeDetailsContainer;
