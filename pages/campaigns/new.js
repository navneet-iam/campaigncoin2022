import React from "react";
import { Component } from "react";
import Layout from "../../components/Layout";
import { Form, Button, Input, Message } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from "../../ethereum/web3";
import { Router } from '../../routes';

class CampaignNew extends Component {
  state = {
    minimumConribution: '',
    description: '',
    campaignName: '',
    errorMessage: '',
    imageUrl: '',
    loading: false
  }

  onSubmit = async (event) => {
    event.preventDefault();     //it will prevent browser to submit the form in backend

    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(this.state.minimumConribution,this.state.campaignName,this.state.description,this.state.imageUrl,)
        .send({
          from: accounts[0]
        });

      Router.pushRoute('/');
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  }

  render() {
    return (
      <div style ={{backgroundImage:'url("https://www.futureswap.com/images/Graphic-Hero-Blur.jpg")',  backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      height:"100vh",
      }}>
      <Layout>
        <h1 style={{color:"white"}}>Create a Campaign</h1>
        {/* !! is used to get output in boolean */}
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label style={{color:"white"}}>Minimum Contribution</label>
            <Input
              label="wei"
              labelPosition="right"
              value={this.state.minimumConribution}
              onChange={event => this.setState({ minimumConribution: event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label style={{color:"white"}}>Campaign Name</label>
            <Input
              value={this.state.campaignName}
              onChange={
                event => this.setState({ campaignName: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label style={{color:"white"}}>Campaign Description</label>
            <Input
              value={this.state.description}
              onChange={
                event => this.setState({ description: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label style={{color:"white"}}>Image Url</label>
            <Input
              value={this.state.imageUrl}
              onChange={
                event => this.setState({ imageUrl: event.target.value })
              }
            />
          </Form.Field>

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>Create</Button>
        </Form>
      </Layout>
      </div>
    );
  }
}

export default CampaignNew;