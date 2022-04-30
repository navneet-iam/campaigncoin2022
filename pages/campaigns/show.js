import React, { Component } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/contributeForm';
import { Link } from '../../routes'

class CampaignShow extends Component {
    static async getInitialProps(props) {
        // console.log(props.query.address);
        const campaign = Campaign(props.query.address);

        const summary = await campaign.methods.getSummary().call();
        // console.log(summary);
        return {
            address: props.query.address,
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4],
            name: summary[5],
            description: summary[6],
            image: summary[7]
        };
    }

    renderCards() {
        const {
            balance,
            manager,
            minimumContribution,
            requestsCount,
            approversCount,
            name,description,image
        } = this.props;

        const items = [
            {
                header: <img src={image} style={{ width: 100, align: "center"}} />,
                meta: name,
                description: description
            },
            {
                header: manager,
                meta: 'Address of Manager',
                description: 'the manager created this campaign and can request to withdraw money',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: minimumContribution,
                meta: 'Minimum Contribution (wei)',
                description: 'you must contribute atleast this much wei to become approver'
            },
            {
                header: requestsCount,
                meta: 'number of request',
                description: 'a request tries to withdraw the money from the contract. Request must be approved by approvers'
            },
            {
                header: approversCount,
                meta: 'Number of approvers',
                description: 'number of people who have already donated to this campaign'
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Campaign balance (ether)',
                description: 'the balance is how much money this campaign has left to spend.'
            }
        ];

        return <Card.Group items={items} />;
    }

    render() {
        return (
            <div style ={{backgroundImage:'url("https://www.futureswap.com/images/Graphic-Hero-Blur.jpg")',  backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      height:"100vh",
      }}>
            <Layout>
                <h3 style={{color:"white"}}>Campaign show</h3>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            {this.renderCards()}
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <ContributeForm address={this.props.address} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                        <Link route={`/campaigns/${this.props.address}/requests`}>
                            <a>
                                <Button primary>
                                    View Requests
                                </Button>
                            </a>
                        </Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Layout>
            </div>
        );
    }
}

export default CampaignShow;