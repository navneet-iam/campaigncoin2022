import react from "react";
import { Component } from "react/cjs/react.production.min";
import { Card, Button, Image } from "semantic-ui-react";
import factory from '../ethereum/factory'
import Layout from "../components/Layout";
import {Link} from '../routes';
import Campaign from '../ethereum/campaign.js';

class CampaignIndex extends Component {
    constructor(props){
        super(props);
        this.state = {
          items: null,
          summary: null
        }
      }

    /*using static variable, we can directly call it without creating its instance */
    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();

        return { campaigns };
    }

    async componentDidMount(){
        const c = Campaign(this.props.campaigns[0]);
        const summary = await Promise.all(this.props.campaigns.map((campaign, i) => Campaign(this.props.campaigns[i]).methods.getSummary().call()));
        this.setState({summary});
      }

    renderCampaigns() {
        let summ;
        const items = this.props.campaigns.map((address, i) => {
            if (this.state.summary) summ = this.state.summary[i];
            else summ = {"5": "null", "7":"null"};
            return {
                key:i,
                header: summ[5],
                meta: address,
                image: <img src={summ[7]} style={ {width:150 }} />,
                
                description: (
                    <Link route={`/campaigns/${address}`}>
                        <a>view campaigns</a>

                    </Link>
                ),
                fluid: true     // fluid extends the width of card equal to container width
            };
        });

        return <Card.Group items={items} />
    }

    /*async componentDidMount() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        
        console.log(campaigns);
    }
    */

    // actual render
    render() {
        return (
            <div style ={{backgroundImage:'url("https://www.futureswap.com/images/Graphic-Hero-Blur.jpg")',  backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height:"100vh",
            }}>
                <Layout>
                <div>
                    <h3 style={{color:"white"}}>Open Campaigns</h3>
                    <Link route="/campaigns/new">
                    <Button
                        floated="right"
                        content="Create Campaign"
                        icon="add circle"
                        primary={true}         // blue styling
                    />
                    </Link>
                    {this.renderCampaigns()}
                </div>
                </Layout>
            </div>
        );
    }
}

export default CampaignIndex;
/*
{backgroundImage:'url("https://d11wkw82a69pyn.cloudfront.net/siteassets/images/widget-pa.jpg")',  backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height:"100vh"}}>*/
            