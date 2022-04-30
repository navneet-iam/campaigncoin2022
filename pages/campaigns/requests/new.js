import React, { Component } from 'react';
import { Button, Form, Message, Input } from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import { Link, Router } from '../../../routes';
import Layout from '../../../components/Layout';

class RequestNew extends Component {
    state = {
        value: '',
        description: '',
        recipient: '',
        loading: false,
        errorMessage: ''
    };

    static async getInitialProps(props) {
        const { address } = props.query;

        return { address };
    }

    onSubmit = async event => {
        event.preventDefault();

        const campaign = Campaign(this.props.address);
        const { description, value, recipient } = this.state;

        this.setState({ loading: true, errorMessage: '' });

        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.createRequest(
                description,
                web3.utils.toWei(value, 'ether'),
                recipient
            ).send({ from: accounts[0] });

            Router.pushRoute(`/campaigns/${this.props.address}/requests`);
        } catch (err) {
            this.setState({ errorMessage: err.message });
        }

        this.setState({ loading: false });
    };

    render() {
        return (
            <div style={{
                backgroundImage: 'url("https://www.futureswap.com/images/Graphic-Hero-Blur.jpg")', backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                height: "100vh",
            }}>
                <Layout>
                    <Link route={`/campaigns/${this.props.address}/requests`}>
                        <a>
                            <Button primary>Back to view Request</Button>
                        </a>
                    </Link>
                    <h3 style={{color:"white"}}>Create a request</h3>
                    <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                        <Form.Field>
                            <label style={{color:"white"}}>Description</label>
                            <Input
                                value={this.state.description}
                                onChange={event => this.setState({ description: event.target.value })}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label style={{color:"white"}}>Amount in ether</label>
                            <Input
                                value={this.state.value}
                                onChange={event => this.setState({ value: event.target.value })}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label style={{color:"white"}}>Recipient</label>
                            <Input
                                value={this.state.recipient}
                                onChange={event => this.setState({ recipient: event.target.value })}
                            />
                        </Form.Field>

                        <Message error header="oops" content={this.state.errorMessage} />
                        <Button primary loading={this.state.loading}>Create!</Button>
                    </Form>
                </Layout>
            </div>
        );
    }
}

export default RequestNew;